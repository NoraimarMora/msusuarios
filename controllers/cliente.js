'use strict'

var Cliente = require('../models/cliente');
var sha1 = require('sha1');

var controller = {

    saveCliente: function(request, response) {
        var parameters = request.body
        var cliente = new Cliente();

        cliente.firstName = parameters.firstName;
        cliente.lastName = parameters.lastName;
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

        Cliente.findOne({email}).exec((error, cliente) => {

            if (error) {
                return response.status(500).send({
                    status: false,
                    error
                });
            }

            if (!cliente) {
                return response.status(200).send({
                    status: false, 
                });
            }

            if (password == cliente.password) {
                
                return response.status(200).send({
                    status: true,
                });
                
            } else {
                return response.status(200).send({
                    status: false,
                });
            }   
        });
    },

    loginFacebook: function (request, response) {
        var parameters = request.body;

        Cliente.findOne({email: parameters.email})
        .exec((error, user) => {

            if (error) {
                return response.status(500).send({
                    status:false, 
                    error
                });
            }

            if (!cliente) {
                var cliente = new Cliente();
                cliente.firstName = parameters.firstName;
                cliente.lastName = parameters.lastName;
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
                    });
                });

            } else {

                return response.status(200).send({
                    status: true, 
                });
            }
        });
    },

    getClienteByEmail: function (request, response) {
        var email = request.params.email;
        Cliente.findOne({ email: email }).exec((error, cliente) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!cliente) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true,
                cliente: cliente
            });
        });
    },

    getCliente: function(request, response) {
        var clienteId = request.body.id;

        if (clienteId == null) {
            return response.status(404).send({
                status: false, 
            });
        }

        Cliente.findById(clienteId, (error, cliente) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!cliente) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true,
                cliente: cliente
            });
        });
    },

    getClientes: function (request, response) {
        Cliente.find({}).sort('-name').exec((error, clientes) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!clientes) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status:true, 
                clientes: clientes
            });
        });
    },

    updateCliente: function (request, response) {
        var clienteId = request.body.id;
        var update = {};
        var parameters = request.body

        update.firstName = parameters.firstName;
        update.lastName = parameters.lastName;
        update.email = parameters.email;

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
                });
            }

            return response.status(200).send({
                status: true, 
                cliente: clienteUpdated
            });
        });
    },

    deleteCliente: function (request, response) {
        var clienteId = request.body.id;

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