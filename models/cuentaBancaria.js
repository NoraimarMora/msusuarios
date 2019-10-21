'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CuentaBancariaSchema = Schema({
    delivery_man: {type: Schema.Types.ObjectId, ref: 'Repartidor', required: true},
    dni: {type: String, required: true},
    dni_type: {type: String, required: true},
    account_number: {type: String, required: true},
    account_type: {type: String, required: true},
    beneficiary: {type: String, required: true},
    bank: {type: String, required: true}
});

module.exports = mongoose.model('CuentaBancaria', CuentaBancariaSchema);