'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RepartidorSchema = Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    profile_image: {type: String, allowNull: true},
    phone: {type: String, default: ''},
    accounts: [{type: Schema.Types.ObjectId, ref: 'CuentaBancaria'}],
    active: {type: Boolean, default: true},
    date_created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Repartidor', RepartidorSchema);