/**
 * @author Miguelcajigas19
 * @version 1.0.0
 * 
 * Controlador de órdenes
 * Este archivo define los controladores de orders
 */

const { response, request } = require('express');
const { PrismaClient } = require('@prisma/client'); 
const axios = require('axios');

const prisma = new PrismaClient();

const getProductsForOrder = async (productIds) => {
    try {
        const response = await axios.post('http://localhost:3002/products/getproducts', {
            productIds  
        });
        return response.data.product; 
    } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch products for the order');
    }
};

const processOrderPayment = async (orderId, total, payment_gatewayMethod) => {
    try {
        const response = await axios.post('http://localhost:3001/payment_gateway/process', {
            orderId,
            amount: total,
            method: payment_gatewayMethod
        });
        return response.data;
    } catch (error) {
        console.error('Error processing payment:', error.response ? error.response.data : error.message);
        throw new Error('Payment processing failed');
    }
};
const calculateTotal = (product) => {
    return product.reduce((total, product) => total + product.price, 0);
};
const ShowOrders = async (req = request, res = response) => {
    try {
        const orders = await prisma.orders.findMany({
            include: {
                orderItems: true, 
            }
        });
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await prisma.$disconnect();
    }
};


const AddOrders = async (req = request, res = response) => {
    const { productIds, paymentMethod } = req.body;

    try {
        const product = await getProductsForOrder(productIds);
        const total = calculateTotal(product);

        const order = await prisma.orders.create({
            data: {
                total,
                status: 'pending',
                orderItems: {
                    create: product.map(product => ({
                        productId: product.id,
                        productName: product.name,
                        productPrice: product.price
                    }))
                }
            },
            include: {
                orderItems: true
            }
        });
        try {
            const payment = await processOrderPayment(order.id, total, paymentMethod);
            const updatedOrder = await prisma.orders.update({
                where: { id: order.id },
                data: {
                    payment_gatewayId: payment_gateway.payment_gateway.id,
                    status: 'paid'
                },
                include: {
                    orderItems: true
                }
            });

            res.json({
                message: 'Order created and payment processed successfully.',
                order: updatedOrder,
                payment_gateway
            });
        } catch (payment_gatewayError) {
            console.error('Error processing payment:', payment_gatewayError.message);
            res.status(500).json({
                message: 'Order created, but payment failed. Please retry the payment_gateway.',
                order
            });
        }
    } catch (error) {
        console.error('Error adding order:', error.message);
        res.status(500).json({ message: 'Failed to create order' });
    } finally {
        await prisma.$disconnect();
    }
};


const ShowOrderById = async (req = request, res = response) => {
    const { id } = req.params;
    console.log("Order ID received:", id); 

    try {
        const order = await prisma.order.findUnique({
            where: { id: Number(id) }, 
            include: {
                orderItems: true
            }
        });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({
            message: "Order retrieved successfully",
            order
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await prisma.$disconnect();
    }
};


const CancelOrder = async (req = request, res = response) => {
    const { id } = req.params; 

    try {
        const result = await prisma.order.update({
            where: {
                id: Number(id),
            },
            data: {
                status: "cancelled", 
            }
        });

        res.json({
            message: `Order with ID ${id} was successfully cancelled.`,
            result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = {
    ShowOrder,
    AddOrder,
    CancelOrder,
    processOrderPayment_gateway,
    getProductsForOrder,
    calculateTotal,
    ShowOrderById
    
};
