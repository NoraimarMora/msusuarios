'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RepartidorSchema = Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    profileImage: {type: String, allowNull: true},
    phone: {type: String, default: ''},
    active: {type: Boolean, default: true},
    dateCreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Repartidor', RepartidorSchema);