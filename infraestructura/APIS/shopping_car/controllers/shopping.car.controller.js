/** 
 * @author Miguelcajigas19
 * @version 1.0.0
 *
 * Controlador de carrito de compras
 * Este archivo define los controladores del carrito de compras
 */

const { response, request } = require('express');
const prisma = require('../../prisma/prismaClient.js');

const ShowShoppingCar = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const shoppingCar = await prisma.shopping_car.findUnique({
            where: { id: Number(id) },
            include: { products: { include: { product: true } } } // Incluir detalles de los productos
        });

        if (!shoppingCar) {
            return res.status(404).json({ error: "Shopping cart not found" });
        }

        res.json({ shoppingCar });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

/**
 * Agrega un producto al carrito de compras.
 * @param {request} req - La solicitud del cliente.
 * @param {response} res - La respuesta del servidor.
 */
const AddProduct = async (req = request, res = response) => {
    const { shoppingCarId, productId } = req.body;

    try {
        const shoppingCar = await prisma.shopping_car.update({
            where: { id: shoppingCarId },
            data: {
                products: {
                    connect: { id: productId }  // Cambia `productId` por `id`
                }
            }
        });

        res.json({
            message: "Product added to shopping cart",
            shoppingCar
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};


const DeleteProduct = async (req = request, res = response) => {
    const { shoppingCarId, productId } = req.body;

    try {
        const shoppingCar = await prisma.shopping_car.update({
            where: { id: shoppingCarId },
            data: {
                products: {
                    disconnect: { productId: productId } // Asegúrate de usar productId para la desconexión
                }
            }
        });

        res.json({
            message: "Product removed from shopping cart",
            shoppingCar
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = {
    ShowShoppingCar,
    AddProduct,
    DeleteProduct,
};
