/** 
 * @author luis2ceron
 * @version 1.0.0
 *
 * Controlador de pedidos
 * Este archivo define los controladores de pedidos
 */

const { response, request } = require('express');

const prisma = require('../../prisma/prismaClient.js');


const ShowOrders = async (req = request, res = response) => {
    try {
        const orders = await prisma.orders.findMany();
        res.json({
            orders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener órdenes', error: error.message });
    } finally {
        await prisma.$disconnect();
    }
};

const AddOrders = async (req = request, res = response) => {
    try {
        const { total, orderDate, products, payments, shoppingCarId } = req.body;

        if (!total || !orderDate || !products || !payments || !shoppingCarId) {
            return res.status(400).json({
                message: 'Faltan datos requeridos para crear la orden',
            });
        }

        const newOrder = await prisma.orders.create({
            data: {
                total: total,
                orderDate: new Date(orderDate),
                shoppingCarId: shoppingCarId,
                // Crear el pago relacionado
                payments: {
                    create: {
                        method: payments.method, 
                        amount: payments.amount,
                        date: new Date() 
                    },
                },
                products: {
                    connect: products.map((productId) => ({ id: productId })),
                },
            },
        });

        return res.status(201).json({
            message: 'Orden creada exitosamente',
            order: newOrder,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error al crear la orden',
            error: error.message, 
        });
    }
};

module.exports = {
    AddOrders,
    ShowOrders
};  