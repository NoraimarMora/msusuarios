'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    profileImage: {type: String, allowNull: true},
    facebook: {type: Boolean, default: false},      // true: register with facebook, false: register with email
    phone: {type: String, default: ''},
    active: {type: Boolean, default: true},
    dateCreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Cliente', ClienteSchema);