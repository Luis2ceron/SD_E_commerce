/**
 * @author
 * @version 1.0.0
 * 
 * Rutas de usuario
 * Esta archivo define las rutas de usuarios
 */

const {Router} = require('express');
const router = Router();


const {AddProducts, ShowProducts,DeleteProducts,EditProducts,ShowProduct,GetProductsByIds} = require('../controllers/product.controller.js')

router.get('/',ShowProducts);
router.post('/',AddProducts);
router.post('/:getproduct', GetProductsByIds); //obtener ppor id
router.delete('/:id',DeleteProducts);
router.put('/:id',EditProducts);
router.get('/:id',ShowProduct);


module.exports = router ;