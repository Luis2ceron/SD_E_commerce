/**
 * @author Miguelcajigas19
 * @version 1.0.0
 * 
 * Controlador de pagos
 * Este archivo define los controladores de payments
 */

const { response, request } = require('express');
const { PrismaClient } = require('@prisma/client'); 
const { Encrypt, Decrypt } = require('../middlewares/validate');
const { CreateJWT } = require('../middlewares/jwt');

const prisma = new PrismaClient();

const processPayment_gateway = async (req = request, res = response) => {
    try {
        let { amount, method } = req.body;

        const encryptMethod = Encrypt(method);

        const payment_gateway = await prisma.payment_gateway.create({
            data: {
                amount: amount,
                method: encryptMethod,
                status: 'processed',
            }
        });

        const token = CreateJWT ({
            paymentId: payment_gateway.id,
            status: payment_gateway.status,
            amount: payment_gateway.amount
        })

        res.json({
            message: 'Payment processed successfully.',
            payment_gateway,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await prisma.$disconnect();
    }
};

const showPayments = async (req = request, res = response) => {
    try {
        const Payment_gateway = await prisma.payment_gateway.findMany();

        const decryptPayments = payments.map(payment => ({
            id: payment_gateway.id,
            amount: payment_gateway.amount,
            method: Decrypt(payment_gateway.method),
            status: payment_gateway.status
        }));

        res.json({ payment_gateway: decryptPayments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = {
    processPayment,
    showPayments
};
