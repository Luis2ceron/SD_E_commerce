/** 
*@author luis2ceronl
*@version 1.0.0
*
*Controlador de productos
*Este archivo define los controladores de productos
*/
const {response,request} = require ('express')
const AddProduct = async(req=request, res=response)=>{


    const { name, description, price, category, stock } = req.body;

    const result = await prisma.products.create({
        data: {
            name,
            description,
            price,
            category,
            stock
        }
    }).catch(err=>{
        res.status(500).json({
            error: 'Failed to create product',
            details: err.message
        });
    }).finally((async ()=>{
        await prisma.$disconnect();
    }));

    res.json({
        result
    });

};

const UpdateProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;

    try {
        if (!id) {
            return res.status(400).json({
                error: 'Product ID is required'
            });
        }

        // Actualizar el producto
        const result = await prisma.products.update({
            where: { id: parseInt(id) }, // Buscar el producto por ID
            data: {
                name,
                description,
                price: parseFloat(price),
                category,
                stock: parseInt(stock)
            }
        });

        return res.status(200).json({
            message: 'Product updated successfully',
            product: result
        });
    } catch (err) {
        return res.status(500).json({
            error: 'Failed to update product',
            details: err.message
        });
    } finally {
        await prisma.$disconnect();
    }
};

const DeleteProduct = async(req=request, res=response)=>{
    const { id } = req.params;

    const result = await prisma.products.delete({
        where:{
            id: Number(id)
        }
    }).catch(err=>{
        return err.message;
    }).finally((async ()=>{
        await prisma.$disconnect();
    }));

    res.json({
        result
    });
};

const GetProduct = async(req=request, res=response)=>{
    const products = await prisma.products.findMany()
    .catch(err=>{
        return err.message;
    }).finally((async ()=>{
        await prisma.$disconnect();
    }));

    res.json({
        products
    });
};

module.exports = {
    AddProduct,
    UpdateProduct,
    DeleteProduct,
    GetProduct
};