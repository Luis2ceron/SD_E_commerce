/**
 * @author luis2ceronl
 * @version 1.0.0
 * 
 * Rutas de products
 * Este archvo define rutas de los productos
 */

const{ Router } = require('express');
const router = Router();
//Import from methods
const {AddProduct,UpdateProduct,DeleteProduct,GetProduct} = require('../controllers/products.controller');

//Rutas
/**
 * AddProduct
 * UpdateProduct
 * DeleteProduct
 * GetProduct
 */

router.post('/add',AddProduct);
router.put('/:id',UpdateProduct);
router.delete('/:id',DeleteProduct);
router.get('/', GetProduct);



module.exports = router;