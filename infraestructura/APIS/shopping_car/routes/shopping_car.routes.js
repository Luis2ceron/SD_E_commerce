/**
 * @author Luis2Ceron
 * @version 1.0.0
 * 
 * Rutas de usuario
 * este archivo define las rutas de shopping car
 */

const{Router} = require('express');
const router = Router();

const {ShowCartOrder,GetOrderById,AddOrderToCart} = require('../controllers/shopping_car.controller')

router.get('/',ShowCartOrder );
router.get('/:id',GetOrderById );
router.post('/',AddOrderToCart)



module.exports = router;
