/**
 * @author Miguelcajigas19
 * @version 1.0.0
 * 
 * Controlador de productos
 * Esta archivo define los controladores de products
 */

const {response, request} = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const GetProductsByIds = async (req = request, res = response) => {
    const { productIds } = req.body;  

    try {
        const product = await prisma.product.findMany({
            where: {
                id: { in: productIds }  
            }
        });

        res.json({
            product
        });
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ message: 'Failed to fetch products' });
    } finally {
        await prisma.$disconnect();
    }
};

const ShowProducts = async (req=request, res=response)=>{
    const product = await prisma.product.findMany()
    .catch(err=>{

        return err.message;
    }).finally((async()=>{
        await prisma.$disconnect();
    }))
    res.json({
        product
    })

}
const AddProduct = async (req=request, res=response)=>{
    const {name,description,price,stock,category} = req.body;

    const result = await prisma.product.create({
        data: {
            name,
            description,
            price,
            stock,
            category
        }
    }).catch(err=>{

        return err.message;
    }).finally((async()=>{
        await prisma.$disconnect();
    }))
    res.json({
        result
    })
}
const EditProducts = async (req=request, res=response)=>{
    const{ id } = req.params;
    const {name,description,price,stock,category} = req.body;

    const result = await prisma.product.update({
        where:{
            id : Number(id)
        },
        data: {
            name,
            description,
            price,
            stock,
            category
        }
    }).catch(err=>{

        return err.message;
    }).finally((async()=>{
        await prisma.$disconnect();
    }))
    res.json({
        result
    })

}
const DeleteProducts = async (req=request, res=response)=>{
    const{ id } = req.params;

    const result = await prisma.products.delete({
        where:{
            id : Number(id)
        }
    }).catch(err=>{

        return err.message;
    }).finally((async()=>{
        await prisma.$disconnect();
    }))
    res.json({
        result
    })
}
const ShowProduct = async (req=request, res=response)=>{
    res.json({
        "saludo":"respuesta"
    })
}
module.exports = {
    ShowProduct,
    AddProduct,
    EditProduct,
    DeleteProduct,
    ShowProduct,
    GetProductByIds
};