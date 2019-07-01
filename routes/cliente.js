'use strict'

var express = require('express');
var router = express.Router();
var ClienteController = require('../controllers/cliente');

router.post('/', ClienteController.saveCliente);
router.get('/:id', ClienteController.getCliente);
router.get('/clienteByEmail/:email', ClienteController.getClienteByEmail);
router.get('/', ClienteController.getClientes);
router.post('/login-email', ClienteController.loginEmail);
router.put('/update/:id', ClienteController.updateCliente);
router.delete('/delete/:id', ClienteController.deleteCliente);
router.post('/login-facebook', ClienteController.loginFacebook);

module.exports = router;