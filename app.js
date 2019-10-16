'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar archivos de rutas
var clienteRoutes = require('./routes/cliente');
var repartidorRoutes = require('./routes/repartidor');
var administradorRoutes = require('./routes/administrador');
var direccionRoutes = require('./routes/direccion');
var cuentaBancariaRoutes = require('./routes/cuentaBancaria');

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Rutas
app.get('/', function(req, res) {
  res.send('Microservicio de Usuarios');
});

app.use('/clientes', clienteRoutes);
app.use('/administradores', administradorRoutes);
app.use('/repartidores', repartidorRoutes);
app.use('/direcciones', direccionRoutes);
app.use('/cuentas', cuentaBancariaRoutes);

// Exportar
module.exports = app;
