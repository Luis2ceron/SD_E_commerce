/**
 * @author Miguelcajigas19
 * @version 1.0.0
 * 
 * Rutas del carrito de compras
 * Este archivo define las rutas para el carrito de compras
 */

const { Router } = require('express');
const router = Router();

// Importar los controladores del carrito de compras
const { AddProduct, DeleteProduct, ShowShoppingCar } = require('../controllers/shopping.car.controller');


router.get('/:id', ShowShoppingCar);
router.post('/', AddProduct);
router.delete('/', DeleteProduct);

module.exports = router;
