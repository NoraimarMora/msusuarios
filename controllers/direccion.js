'use strict'

var Direccion = require('../models/direccion');

var controller = {

    saveDireccion: function(request, response) {
        var parameters = request.body
        var direccion = new Direccion();

        direccion.client_id = parameters.client_id;
        direccion.name = parameters.name;
        direccion.latitude = parameters.latitude;
        direccion.longitude = parameters.longitude;
        direccion.description = parameters.description;

        direccion.save((error, direccionStored) => {
            if (error) {
                return response.status(500).send({error});
            } 
            if (!direccionStored) {
                return response.status(404).send({message: 'No se ha podido guardar el documento'});
            }

            
            return response.status(200).send({direccion: direccionStored});
        });
    },

    getDireccion: function(request, response) {
        var direccionId = request.params.id;

        if (direccionId == null) {
            return response.status(404).send({
                status: false, 
            });
        }

        Direccion.findById(direccionId)
            .populate('cliente_id')
            .exec(function (error, direccion) {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!direccion) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true,
                direccion: direccion
            });
        });
    },

    getDireccionesByCliente: function(request, response) {
        var cleinteId = request.params.id;

        if (cleinteId == null) {
            return response.status(404).send({
                status: false, 
            });
        }

        CuentaBancaria.findOne({client_id: cleinteId})
            .populate('client_id')
            .exec(function (error, direcciones) {
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

            return response.status(200).send({
                status: true,
                direcciones: direcciones
            });
        });
    },

    getDirecciones: function (request, response) {
        Direccion.find({}).populate('client_id').exec((error, direcciones) => {
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

            return response.status(200).send({
                status:true, 
                direcciones: direcciones
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
                    status: false, 
                    error
                });
            }

            if (!direccionUpdated) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                direccion: direccionUpdated
            });
        });
    },

    deleteDireccion: function (request, response) {
        var direccionId = request.params.id;

        Direccion.findByIdAndRemove(direccionId, (error, direccionRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!direccionRemoved) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                direccion: direccionRemoved
            });
        });
    } 
};

module.exports = controller;