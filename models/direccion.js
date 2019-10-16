'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DireccionSchema = Schema({
    client_id: {type: Schema.Types.ObjectId, ref: 'Cliente', required: true},
    name: {type: String, required: true},
    latitude: {type: String, required: true},
    longitude: {type: String, required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model('Direccion', DireccionSchema);