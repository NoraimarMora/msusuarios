'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdministradorSchema = Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    profile_image: {type: String, allowNull: true},
    phone: {type: String, default: ''},
    role: {type: String, default: 'super_admin'},
    active: {type: Boolean, default: true},
    date_created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Administrador', AdministradorSchema);