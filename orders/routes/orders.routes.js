/**
 * @author luis2ceron
 * @version 1.0.0
 * Rutas de orders
 * Este archvo define rutas de los pedidos
 */

const{ Router } = require('express');
const router = Router();
//Import from methods
const {ShowOrders,AddOrders} = require('../controllers/order.controller');

//Rutas

router.post('/',AddOrders);
router.get('/',ShowOrders);


module.exports = router;

