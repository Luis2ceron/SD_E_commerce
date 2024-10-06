/** 
*@author luis2ceronl
*@version 1.0.0
*
*Controlador de pagos
*Este archivo define los controladores de pagos
*/
const { response, request } = require('express');
const { PrismaClient } = require('@prisma/client');
const { Encrypt, Decrypt } = require('../middlewares/validate');
const prisma = new PrismaClient();

const ProcessPayments = async (req = request, res = response) => {
    try {
        let { amount, method, date } = req.body;

        const encryptedMethod = Encrypt(method);

        if (!amount || !encryptedMethod || !date) {
            return res.status(400).json({
                success: false,
                message: 'Missing payment details',
            });
        }

        // Crear una nueva orden
        const newOrder = await prisma.orders.create({
            data: {
                total: amount,
                orderDate: new Date(),
            },
        });

        // Crear el pago y asociarlo a la nueva orden
        const result = await prisma.payments.create({
            data: {
                amount,   
                method: encryptedMethod, 
                date, 
                orderId: newOrder.id,  
            },
        });

        res.status(201).json({
            success: true,
            message: 'Payment processed successfully',
            result: {
                id: result.id,
                amount: result.amount,  
                method: result.method,  
                date: result.date,      
                orderId: result.orderId,
            },
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

const ReturnPayment = async (req = request, res = response) => {
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
