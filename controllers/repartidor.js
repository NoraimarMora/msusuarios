'use strict'

var Repartidor = require('../models/repartidor');
var sha1 = require('sha1');

var controller = {

    saveRepartidor: function(request, response) {
        var parameters = request.body
        var repartidor = new Repartidor();

        repartidor.firstName = parameters.firstName;
        repartidor.lastName = parameters.lastName;
        repartidor.password = sha1(parameters.password);
        repartidor.email = parameters.email;
        repartidor.phone = parameters.phone;
        repartidor.active = parameters.active;

        repartidor.save((error, repartidorStored) => {
            if (error) {
                return response.status(500).send({error});
            } 
            if (!repartidorStored) {
                return response.status(404).send({message: 'No se ha podido guardar el documento'});
            }
            return response.status(200).send({repartidor: repartidorStored});
        });
    },

    login: function (request, response) {
        var parameters = request.body
        var email = parameters.email;
        var password = sha1(parameters.password);

        Repartidor.findOne({email}).exec((error, repartidor) => {

            if (error) {
                return response.status(500).send({
                    status: false,
                    error
                });
            }

            if (!repartidor) {
                return response.status(200).send({
                    status: false, 
                });
            }

            if (password == repartidor.password) {
                
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

    getRepartidorByEmail: function (request, response) {
        var email = request.params.email;
        Repartidor.findOne({ email: email }).exec((error, repartidor) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!repartidor) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true,
                repartidor: repartidor
            });
        });
    },

    getRepartidor: function(request, response) {
        var repartidorId = request.body.id;

        if (repartidorId == null) {
            return response.status(404).send({
                status: false, 
            });
        }

        Repartidor.findById(repartidorId, (error, repartidor) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!repartidor) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true,
                repartidor: repartidor
            });
        });
    },

    getRepartidores: function (request, response) {
        Repartidor.find({}).sort('-name').exec((error, repartidores) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!repartidores) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status:true, 
                repartidores: repartidores
            });
        });
    },

    updateRepartidor: function (request, response) {
        var repartidorId = request.body.id;
        var update = {};
        var parameters = request.body

        update.firstName = parameters.firstName;
        update.lastName = parameters.lastName;
        update.email = parameters.email;

        Repartidor.findByIdAndUpdate(repartidorId, update, {new: true}, (error, repartidorUpdated) => {

            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }

            if (!repartidorUpdated) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                repartidor: repartidorUpdated
            });
        });
    },

    deleteRepartidor: function (request, response) {
        var repartidorId = request.body.id;

        Repartidor.findByIdAndRemove(repartidorId, (error, repartidorRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!repartidorRemoved) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                repartidor: repartidorRemoved
            });
        });
    } 
};

module.exports = controller;