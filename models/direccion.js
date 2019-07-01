'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DireccionSchema = Schema({
    clienteId: {type: Schema.Types.ObjectId, ref: 'Cliente'},
    name: {type: String, required: true},
    latitude: {type: String, required: true},
    longitude: {type: String, required: true},
});

module.exports = mongoose.model('Direccion', DireccionSchema);