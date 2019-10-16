'use strict'

var Cliente = require('../models/cliente');
var sha1 = require('sha1');

var controller = {

    saveCliente: function(request, response) {
        var parameters = request.body
        var cliente = new Cliente();

        cliente.first_name = parameters.first_name;
        cliente.last_name = parameters.last_name;
        cliente.password = sha1(parameters.password);
        cliente.email = parameters.email;
        cliente.phone = parameters.phone;
        cliente.active = parameters.active;

        cliente.save((error, clienteStored) => {
            if (error) {
                return response.status(500).send({error});
            } 
            if (!clienteStored) {
                return response.status(404).send({message: 'No se ha podido guardar el documento'});
            }
            return response.status(200).send({cliente: clienteStored});
        });
    },

    loginEmail: function (request, response) {
        var parameters = request.body
        var email = parameters.email;
        var password = sha1(parameters.password);

        Cliente.findOne({email}).populate('addresses').exec((error, cliente) => {

            if (error) {
                return response.status(500).send({
                    status: false,
                    error
                });
            }

            if (!cliente) {
                return response.status(404).send({
                    status: false,
                    message: 'No se ha encontrado documento'
                });
            }

            if (password == cliente.password) {
                
                return response.status(200).send({
                    status: true,
                    cliente: cliente
                });
                
            } else {
                return response.status(404).send({
                    status: false,
                    message: 'Contraseña invalida'
                });
            }   
        });
    },

    loginFacebook: function (request, response) {
        var parameters = request.body;

        Cliente.findOne({email: parameters.email})
            .populate('addresses').exec((error, cliente) => {

            if (error) {
                return response.status(500).send({
                    status:false, 
                    error
                });
            }

            if (!cliente) {
                var cliente = new Cliente();
                cliente.first_name = parameters.first_name;
                cliente.last_name = parameters.last_name;
                cliente.email = parameters.email;
                cliente.password = sha1(parameters.id);
                cliente.facebook = true;
        
                cliente.save((error, clienteStored) => {

                    if (error) {
                        return response.status(500).send({
                            status: false, 
                            error
                        });
                    }

                    return response.status(200).send({
                        status: true,
                        cliente: clienteStored
                    });
                });

            } else {

                return response.status(200).send({
                    status: true, 
                    cliente: cliente
                });
            }
        });
    },

    getClienteByEmail: function (request, response) {
        var email = request.params.email;

        Cliente.findOne({ email: email }).populate('addresses').exec((error, cliente) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!cliente) {
                return response.status(404).send({
                    status: false, 
                    message: 'Not found'
                });
            }

            return response.status(200).send({
                status: true,
                cliente: cliente
            });
        });
    },

    getCliente: function(request, response) {
        var clienteId = request.params.id;

        if (clienteId == null) {
            return response.status(404).send({
                status: false, 
            });
        }

        Cliente.findById(clienteId).populate('addresses').exec(function (error, cliente) {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!cliente) {
                return response.status(404).send({
                    status: false, 
                    message: 'Not found'
                });
            }

            return response.status(200).send({
                status: true,
                cliente: cliente
            });
        });
    },

    getClientes: function (request, response) {
        Cliente.find({}).populate('addresses').exec((error, clientes) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!clientes) {
                return response.status(404).send({
                    status: false, 
                    message: 'Not found'
                });
            }

            return response.status(200).send({
                status:true, 
                clientes: clientes
            });
        });
    },

    updateCliente: function (request, response) {
        var clienteId = request.params.id;
        var update = {};
        var parameters = request.body

        update.first_name = parameters.first_name;
        update.last_name = parameters.last_name;
        update.email = parameters.email;
        update.phone = parameters.phone;
        update.addresses = parameters.addresses;

        Cliente.findByIdAndUpdate(clienteId, update, {new: true}, (error, clienteUpdated) => {

            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }

            if (!clienteUpdated) {
                return response.status(404).send({
                    status: false, 
                    message: 'Not found'
                });
            }

            return response.status(200).send({
                status: true, 
                cliente: clienteUpdated
            });
        });
    },

    deleteCliente: function (request, response) {
        var clienteId = request.params.id;

        Cliente.findByIdAndRemove(clienteId, (error, clienteRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!clienteRemoved) {
                return response.status(404).send({
                    status: false, 
                    message: 'Not found'
                });
            }

            return response.status(200).send({
                status: true, 
                cliente: clienteRemoved
            });
        });
    } 
};

module.exports = controller;