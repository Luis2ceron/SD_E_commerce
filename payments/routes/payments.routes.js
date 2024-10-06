/**
 * @author luis2ceronl
 * @version 1.0.0
 * 
 * Rutas de payments
 * Este archvo define rutas de los pagos
 */

const{ Router } = require('express');
const router = Router();
//Import from methods
const {ReturnPayment,ProcessPayments} = require('../controllers/payments.controller');

//Rutas
/**
 * ProcessPayments
 * ReturnPayment
 */

router.get('/',ReturnPayment);
router.post('/',ProcessPayments);

module.exports = router;