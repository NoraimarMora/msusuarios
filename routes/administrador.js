'use strict'

var express = require('express');
var router = express.Router();
var AdministradorController = require('../controllers/administrador');

router.post('/', AdministradorController.saveAdministrador);
router.get('/:id', AdministradorController.getAdministrador);
router.get('/administradorByEmail/:email', AdministradorController.getAdministradorByEmail);
router.get('/', AdministradorController.getAdministradores);
router.post('/login', AdministradorController.login);
router.put('/update/:id', AdministradorController.updateAdministrador);
router.delete('/delete/:id', AdministradorController.deleteAdministrador);

module.exports = router;