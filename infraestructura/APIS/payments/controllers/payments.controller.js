/** 
*@author luis2ceronl
*@version 1.0.0
*
*Controlador de pagos
*Este archivo define los controladores de pagos
*/
const { response, request } = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ProcessPayments = async (req = request, res = response) => {
    try {
        const { amount, method, date } = req.body;

        if (!amount || !method || !date) {
            return res.status(400).json({
                success: false,
                message: 'Missing payment details',
            });
        }

        // Crear una nueva orden
        const newOrder = await prisma.orders.create({
            data: {
                total: amount, // Puedes ajustar el total según corresponda
                orderDate: new Date(),
            },
        });

        // Crear el pago y asociarlo a la nueva orden
        const result = await prisma.payments.create({
            data: {
                amount,
                method,
                date,
                orderId: newOrder.id,  // Asignar el nuevo orderId al pago
            },
        });

        res.status(201).json({
            success: true,
            message: 'Payment processed successfully',
            result,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    } finally {
        await prisma.$disconnect();
    }
};

const ReturnPayment = async(req = request, res = response) => {
    const payments = await prisma.payments.findMany()
    .catch(err => {
        return err.message;
    }).finally(async () => {
        await prisma.$disconnect();
    });

    res.json({
        payments
    });
};



module.exports = {
    ProcessPayments,
    ReturnPayment,
};