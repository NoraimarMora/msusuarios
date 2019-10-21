'use strict'

var Administrador = require('../models/administrador');
var sha1 = require('sha1');

var controller = {

    saveAdministrador: function(request, response) {
        var parameters = request.body
        var administrador = new Administrador();

        administrador.first_name = parameters.first_name;
        administrador.last_name = parameters.last_name;
        administrador.password = sha1(parameters.password);
        administrador.email = parameters.email;
        administrador.phone = parameters.phone;
        administrador.role = parameters.role;
        administrador.active = parameters.active;

        administrador.save((error, administradorStored) => {
            if (error) {
                return response.status(500).send({
                    status: 500,
                    error
                });
            } 
            if (!administradorStored) {
                return response.status(404).send({
                    status: 404,
                    message: 'No se ha podido guardar el documento'
                });
            }

            var administrator = {
                id: administradorStored._id,
                role: administradorStored.role,
                phone: administradorStored.phone,
                active: administradorStored.active,
                date_created: administradorStored.date_created,
                first_name: administradorStored.first_name,
                last_name: administradorStored.last_name,
                email: administradorStored.email,
                password: administradorStored.password
            }

            return response.status(200).send({
                status: 200,
                administrator: administrator
            });
        });
    },

    login: function (request, response) {
        var parameters = request.body
        var email = parameters.email;
        var password = sha1(parameters.password);

        Administrador.findOne({email}).exec((error, administrador) => {

            if (error) {
                return response.status(500).send({
                    status: 500,
                    error
                });
            }

            if (!administrador) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            if (password == administrador.password) {
                
                var administrator = {
                    id: administrador._id,
                    role: administrador.role,
                    phone: administrador.phone,
                    active: administrador.active,
                    date_created: administrador.date_created,
                    first_name: administrador.first_name,
                    last_name: administrador.last_name,
                    email: administrador.email,
                    password: administrador.password
                }

                return response.status(200).send({
                    status: 200,
                    administrator: administrator
                });
                
            } else {
                return response.status(404).send({
                    status: 404,
                    message: 'Contraseña invalida'
                });
            }
        });
    },

    getAdministradorByEmail: function (request, response) {
        var email = request.params.email;

        Administrador.findOne({ email: email }).exec((error, administrador) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!administrador) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var administrator = {
                id: administrador._id,
                role: administrador.role,
                phone: administrador.phone,
                active: administrador.active,
                date_created: administrador.date_created,
                first_name: administrador.first_name,
                last_name: administrador.last_name,
                email: administrador.email,
                password: administrador.password
            }

            return response.status(200).send({
                status: 200,
                administrator: administrator
            });
        });
    },

    getAdministrador: function(request, response) {
        var administradorId = request.params.id;

        if (administradorId == null) {
            return response.status(404).send({
                status: 404, 
                message: 'Not found'
            });
        }

        Administrador.findById(administradorId, (error, administrador) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!administrador) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var administrator = {
                id: administrador._id,
                role: administrador.role,
                phone: administrador.phone,
                active: administrador.active,
                date_created: administrador.date_created,
                first_name: administrador.first_name,
                last_name: administrador.last_name,
                email: administrador.email,
                password: administrador.password
            }

            return response.status(200).send({
                status: 200,
                administrator: administrator
            });
        });
    },

    getAdministradores: function (request, response) {
        var administrators = []
        
        Administrador.find({}).exec((error, administradores) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!administradores) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            administradores.map((administrador) => {
                administrators.push({
                    id: administrador._id,
                    role: administrador.role,
                    phone: administrador.phone,
                    active: administrador.active,
                    date_created: administrador.date_created,
                    first_name: administrador.first_name,
                    last_name: administrador.last_name,
                    email: administrador.email,
                    password: administrador.password
                })
            })

            return response.status(200).send({
                status:200, 
                administrators: administrators
            });
        });
    },

    updateAdministrador: function (request, response) {
        var administradorId = request.params.id;
        var update = {};
        var parameters = request.body

        update.first_name = parameters.first_name;
        update.last_name = parameters.last_name;
        update.email = parameters.email;
        update.phone = parameters.phone;

        Administrador.findByIdAndUpdate(administradorId, update, {new: true}, (error, administradorUpdated) => {

            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }

            if (!administradorUpdated) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var administrator = {
                id: administradorUpdated._id,
                role: administradorUpdated.role,
                phone: administradorUpdated.phone,
                active: administradorUpdated.active,
                date_created: administradorUpdated.date_created,
                first_name: administradorUpdated.first_name,
                last_name: administradorUpdated.last_name,
                email: administradorUpdated.email,
                password: administradorUpdated.password
            }

            return response.status(200).send({
                status: true, 
                administrator: administrator
            });
        });
    },

    deleteAdministrador: function (request, response) {
        var administradorId = request.params.id;

        Administrador.findByIdAndRemove(administradorId, (error, administradorRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!administradorRemoved) {
                return response.status(404).send({
                    status: false, 
                });
            }

            var administrator = {
                id: administradorRemoved._id,
                role: administradorRemoved.role,
                phone: administradorRemoved.phone,
                active: administradorRemoved.active,
                date_created: administradorRemoved.date_created,
                first_name: administradorRemoved.first_name,
                last_name: administradorRemoved.last_name,
                email: administradorRemoved.email,
                password: administradorRemoved.password
            }

            return response.status(200).send({
                status: true, 
                administrator: administrator
            });
        });
    } 
};

module.exports = controller;