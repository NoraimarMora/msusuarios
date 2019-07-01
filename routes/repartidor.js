'use strict'

var express = require('express');
var router = express.Router();
var RepartidorController = require('../controllers/repartidor');

router.post('/', RepartidorController.saveRepartidor);
router.get('/:id', RepartidorController.getRepartidor);
router.get('/repartidorByEmail/:email', RepartidorController.getRepartidorByEmail);
router.get('/', RepartidorController.getRepartidores);
router.post('/login', RepartidorController.login);
router.put('/update/:id', RepartidorController.updateRepartidor);
router.delete('/delete/:id', RepartidorController.deleteRepartidor);

module.exports = router;