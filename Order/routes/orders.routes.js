/**
 * @author Miguelcajigas19
 * @version 1.0.0
 * 
 * Rutas de usuario
 * este archivo define las rutas de orders
 */

const{Router} = require('express');
const router = Router();

const {ShowOrder,AddOrder,CancelOrder,ShowOrderById} = require('../controllers/order.controller')

router.get('/',ShowOrder);
router.post('/',AddOrder);
router.put('/cancel/:id',CancelOrder)
router.get('/:id',ShowOrderById)


module.exports = router;
