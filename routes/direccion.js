'use strict'

var express = require('express');
var router = express.Router();
var Direccion = require('../controllers/direccion');

router.post('/', Direccion.saveDireccion);
router.get('/:id', Direccion.getDireccion);
router.get('/cliente/:id', Direccion.getDireccionesByCliente);
router.get('/', Direccion.getDirecciones);
router.put('/update/:id', Direccion.updateDireccion);
router.delete('/delete/:id', Direccion.deleteDireccion);

module.exports = router;