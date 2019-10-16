'use strict'

var express = require('express');
var router = express.Router();
var CuentaBancariaController = require('../controllers/cuentaBancaria');

router.post('/', CuentaBancariaController.saveCuentaBancaria);
router.get('/:id', CuentaBancariaController.getCuentaBancaria);
router.get('/repartidor/:id', CuentaBancariaController.getCuentasBancariasByRepartidor);
router.get('/', CuentaBancariaController.getCuentasBancarias);
router.put('/update/:id', CuentaBancariaController.updateCuentaBancaria);
router.delete('/delete/:id', CuentaBancariaController.deleteCuentaBancaria);

module.exports = router;