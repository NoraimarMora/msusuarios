'use strict'

var Cliente = require('../models/cliente');
var sha1 = require('sha1');
var { notify } = require('../broker');

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
        cliente.addresses = parameters.addresses;

        cliente.save((error, clienteStored) => {
            if (error) {
                return response.status(500).send({
                    status: 500,
                    error
                });
            } 
            if (!clienteStored) {
                return response.status(404).send({
                    status: 404,
                    message: 'No se ha podido guardar el documento'
                });
            }

            var client = {
                id: clienteStored._id,
                facebook: clienteStored.facebook,
                phone: clienteStored.phone,
                addresses: clienteStored.addresses,
                active: clienteStored.active,
                date_created: clienteStored.date_created,
                first_name: clienteStored.first_name,
                last_name: clienteStored.last_name,
                email: clienteStored.email,
                password: clienteStored.password
            }

            notify('client-created', { client: clienteStored });

            return response.status(200).send({
                status: 200,
                client: client
            });
        });
    },

    loginEmail: function (request, response) {
        var parameters = request.body
        var email = parameters.email;
        var password = sha1(parameters.password);

        Cliente.findOne({email}).populate('addresses').exec((error, cliente) => {

            if (error) {
                return response.status(500).send({
                    status: 500,
                    error
                });
            }

            if (!cliente) {
                return response.status(404).send({
                    status: 404,
                    message: 'No se ha encontrado documento'
                });
            }

            if (password == cliente.password) {
                var addresses = []

                cliente.addresses.map((address) => {
                    addresses.push({
                        id: address._id,
                        client: address.client,
                        name: address.name,
                        latitude: address.latitude,
                        longitude: address.longitude,
                        description: address.description
                    })
                })

                var client = {
                    id: cliente._id,
                    facebook: cliente.facebook,
                    phone: cliente.phone,
                    addresses: addresses,
                    active: cliente.active,
                    date_created: cliente.date_created,
                    first_name: cliente.first_name,
                    last_name: cliente.last_name,
                    email: cliente.email,
                    password: cliente.password
                }

                return response.status(200).send({
                    status: 200,
                    client: client
                });
                
            } else {
                return response.status(404).send({
                    status: 404,
                    message: 'Contraseña invalida'
                });
            }   
        });
    },

    loginFacebook: function (request, response) {
        var parameters = request.body;
        var addresses = [];
        var client = {};

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
                cliente.password = sha1(parameters.password);
                cliente.facebook = true;
        
                cliente.save((error, clienteStored) => {

                    if (error) {
                        return response.status(500).send({
                            status: 500, 
                            error
                        });
                    }

                    client = {
                        id: clienteStored._id,
                        facebook: clienteStored.facebook,
                        phone: clienteStored.phone,
                        addresses: clienteStored.addresses,
                        active: clienteStored.active,
                        date_created: clienteStored.date_created,
                        first_name: clienteStored.first_name,
                        last_name: clienteStored.last_name,
                        email: clienteStored.email,
                        password: clienteStored.password
                    }

                    return response.status(200).send({
                        status: 200,
                        client: client
                    });
                });

            } else {
                
                cliente.addresses.map((address) => {
                    addresses.push({
                        id: address._id,
                        client: address.client,
                        name: address.name,
                        latitude: address.latitude,
                        longitude: address.longitude,
                        description: address.description
                    })
                })

                client = {
                    id: cliente._id,
                    facebook: cliente.facebook,
                    phone: cliente.phone,
                    addresses: addresses,
                    active: cliente.active,
                    date_created: cliente.date_created,
                    first_name: cliente.first_name,
                    last_name: cliente.last_name,
                    email: cliente.email,
                    password: cliente.password
                }

                return response.status(200).send({
                    status: true, 
                    client: client
                });
            }
        });
    },

    getClienteByEmail: function (request, response) {
        var email = request.params.email;

        Cliente.findOne({ email: email }).populate('addresses').exec((error, cliente) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!cliente) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var addresses = []

            cliente.addresses.map((address) => {
                addresses.push({
                    id: address._id,
                    client: address.client,
                    name: address.name,
                    latitude: address.latitude,
                    longitude: address.longitude,
                    description: address.description
                })
            })

            var client = {
                id: cliente._id,
                facebook: cliente.facebook,
                phone: cliente.phone,
                addresses: addresses,
                active: cliente.active,
                date_created: cliente.date_created,
                first_name: cliente.first_name,
                last_name: cliente.last_name,
                email: cliente.email,
                password: cliente.password
            }

            return response.status(200).send({
                status: 200,
                client: client
            });
        });
    },

    getCliente: function(request, response) {
        var clienteId = request.params.id;

        if (clienteId == null) {
            return response.status(404).send({
                status: 404, 
                message: 'Not found'
            });
        }

        Cliente.findById(clienteId).populate('addresses').exec(function (error, cliente) {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!cliente) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var addresses = []

            cliente.addresses.map((address) => {
                addresses.push({
                    id: address._id,
                    client: address.client,
                    name: address.name,
                    latitude: address.latitude,
                    longitude: address.longitude,
                    description: address.description
                })
            })

            var client = {
                id: cliente._id,
                facebook: cliente.facebook,
                phone: cliente.phone,
                addresses: addresses,
                active: cliente.active,
                date_created: cliente.date_created,
                first_name: cliente.first_name,
                last_name: cliente.last_name,
                email: cliente.email,
                password: cliente.password
            }

            return response.status(200).send({
                status: 200,
                client: client
            });
        });
    },

    getClientes: function (request, response) {
        var clients = []

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

            clientes.map((cliente) => {
                var addresses = []

                cliente.addresses.map((address) => {
                    addresses.push({
                        id: address._id,
                        client: address.client,
                        name: address.name,
                        latitude: address.latitude,
                        longitude: address.longitude,
                        description: address.description
                    })
                })

                clients.push({
                    id: cliente._id,
                    facebook: cliente.facebook,
                    phone: cliente.phone,
                    addresses: addresses,
                    active: cliente.active,
                    date_created: cliente.date_created,
                    first_name: cliente.first_name,
                    last_name: cliente.last_name,
                    email: cliente.email,
                    password: cliente.password
                })
            })

            return response.status(200).send({
                status:true, 
                clients: clients
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

            notify('client-updated', { client: clienteUpdated });

            return response.status(200).send({
                status: true, 
                client: cliente
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

            notify('client-deleted', { client: clienteRemoved });

            return response.status(200).send({
                status: true, 
                client: cliente
            });
        });
    } 
};

module.exports = controller;