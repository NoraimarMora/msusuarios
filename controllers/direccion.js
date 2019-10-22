'use strict'

var Direccion = require('../models/direccion');
var { notify } = require('../broker');

var controller = {

    saveDireccion: function(request, response) {
        var parameters = request.body
        var direccion = new Direccion();

        direccion.client = parameters.client;
        direccion.name = parameters.name;
        direccion.latitude = parameters.latitude;
        direccion.longitude = parameters.longitude;
        direccion.description = parameters.description;

        direccion.save((error, direccionStored) => {
            if (error) {
                return response.status(500).send({
                    status: 500,
                    error
                });
            } 
            if (!direccionStored) {
                return response.status(404).send({
                    status: 404,
                    message: 'No se ha podido guardar el documento'
                });
            }

            var address = {
                id: direccionStored._id,
                client: direccionStored.client,
                name: direccionStored.name,
                latitude: direccionStored.latitude,
                longitude: direccionStored.longitude,
                description: direccionStored.description
            }

            notify('address-created', { address: direccionStored });

            return response.status(200).send({
                status: 200,
                address: address
            });
        });
    },

    getDireccion: function(request, response) {
        var direccionId = request.params.id;

        if (direccionId == null) {
            return response.status(404).send({
                status: 404, 
                message: 'Not found'
            });
        }

        Direccion.findById(direccionId).exec(function (error, direccion) {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!direccion) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var address = {
                id: direccion._id,
                client: direccion.client,
                name: direccion.name,
                latitude: direccion.latitude,
                longitude: direccion.longitude,
                description: direccion.description
            }

            return response.status(200).send({
                status: 200,
                address: address
            });
        });
    },

    getDireccionesByCliente: function(request, response) {
        var cleinteId = request.params.id;

        if (cleinteId == null) {
            return response.status(404).send({
                status: 404, 
                message: 'Not found'
            });
        }

        Direccion.findOne({client: cleinteId}).exec(function (error, direcciones) {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!direcciones) {
                return response.status(404).send({
                    status: 404, 
                });
            }

            var addresses = []

            direcciones.map((direccion) => {
                addresses.push({
                    id: direccion._id,
                    client: direccion.client,
                    name: direccion.name,
                    latitude: direccion.latitude,
                    longitude: direccion.longitude,
                    description: direccion.description
                })
            })

            return response.status(200).send({
                status: 200,
                addresses: addresses
            });
        });
    },

    getDirecciones: function (request, response) {
        Direccion.find({}).populate('client').exec((error, direcciones) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!direcciones) {
                return response.status(404).send({
                    status: false, 
                });
            }

            var addresses = []

            direcciones.map((direccion) => {
                addresses.push({
                    id: direccion._id,
                    client: direccion.client,
                    name: direccion.name,
                    latitude: direccion.latitude,
                    longitude: direccion.longitude,
                    description: direccion.description
                })
            })

            return response.status(200).send({
                status:true, 
                addresses: addresses
            });
        });
    },

    updateDireccion: function (request, response) {
        var direccionId = request.params.id;
        var update = {};
        var parameters = request.body

        update.name = parameters.name;
        update.latitude = parameters.latitude;
        update.longitude = parameters.longitude;
        update.description = parameters.description;

        Direccion.findByIdAndUpdate(direccionId, update, {new: true}, (error, direccionUpdated) => {

            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }

            if (!direccionUpdated) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            notify('address-updated', { address: direccionUpdated });

            return response.status(200).send({
                status: 200, 
                address: address
            });
        });
    },

    deleteDireccion: function (request, response) {
        var direccionId = request.params.id;

        Direccion.findByIdAndRemove(direccionId, (error, direccionRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }

            if (!direccionRemoved) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            notify('address-deleted', { address: direccionRemoved });

            return response.status(200).send({
                status: 200, 
                address: address
            });
        });
    } 
};

module.exports = controller;