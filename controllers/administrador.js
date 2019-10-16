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
                return response.status(500).send({error});
            } 
            if (!administradorStored) {
                return response.status(404).send({message: 'No se ha podido guardar el documento'});
            }
            return response.status(200).send({administrador: administradorStored});
        });
    },

    login: function (request, response) {
        var parameters = request.body
        var email = parameters.email;
        var password = sha1(parameters.password);

        Administrador.findOne({email}).exec((error, administrador) => {

            if (error) {
                return response.status(500).send({
                    status: false,
                    error
                });
            }

            if (!administrador) {
                return response.status(404).send({
                    status: false, 
                    message: 'Not found'
                });
            }

            if (password == administrador.password) {
                
                return response.status(200).send({
                    status: true,
                    administrador: administrador
                });
                
            } else {
                return response.status(404).send({
                    status: false,
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
                    status: false, 
                    error
                });
            }
            if (!administrador) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true,
                administrador: administrador
            });
        });
    },

    getAdministrador: function(request, response) {
        var administradorId = request.params.id;

        if (administradorId == null) {
            return response.status(404).send({
                status: false, 
            });
        }

        Administrador.findById(administradorId, (error, administrador) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!administrador) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true,
                administrador: administrador
            });
        });
    },

    getAdministradores: function (request, response) {
        Administrador.find({}).exec((error, administradores) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!administradores) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status:true, 
                administradores: administradores
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
                    status: false, 
                    error
                });
            }

            if (!administradorUpdated) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                administrador: administradorUpdated
            });
        });
    },

    deleteAdministrador: function (request, response) {
        var administradorId = request.params.id;

        Administrador.findByIdAndRemove(administradorId, (error, administradorRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!administradorRemoved) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                administrador: administradorRemoved
            });
        });
    } 
};

module.exports = controller;