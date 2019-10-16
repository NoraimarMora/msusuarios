'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    profile_image: {type: String, allowNull: true},
    facebook: {type: Boolean, default: false},      // true: register with facebook, false: register with email
    phone: {type: String, default: ''},
    addresses: [{type: Schema.Types.ObjectId, ref: 'Direccion'}],
    active: {type: Boolean, default: true},
    date_created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Cliente', ClienteSchema);