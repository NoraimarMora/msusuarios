'use strict'

var Repartidor = require('../models/repartidor');
var sha1 = require('sha1');

var controller = {

    saveRepartidor: function(request, response) {
        var parameters = request.body
        var repartidor = new Repartidor();

        repartidor.first_name = parameters.first_name;
        repartidor.last_name = parameters.last_name;
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

        Repartidor.findOne({email})
            .populate('accounts').exec((error, repartidor) => {

            if (error) {
                return response.status(500).send({
                    status: false,
                    error
                });
            }

            if (!repartidor) {
                return response.status(404).send({
                    status: false, 
                    message: 'Not found'
                });
            }

            if (password == repartidor.password) {
                
                return response.status(200).send({
                    status: true,
                    repartidor: repartidor
                });
                
            } else {
                return response.status(404).send({
                    status: false,
                    message: 'Contraseña invalida'                    
                });
            }   
        });
    },

    getRepartidorByEmail: function (request, response) {
        var email = request.params.email;

        Repartidor.findOne({ email: email })
            .populate('accounts').exec((error, repartidor) => {
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
        var repartidorId = request.params.id;

        if (repartidorId == null) {
            return response.status(404).send({
                status: false, 
            });
        }

        Repartidor.findById(repartidorId)
            .populate('accounts').exec(function (error, repartidor) {
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
        Repartidor.find({}).populate('accounts').exec((error, repartidores) => {
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
        var repartidorId = request.params.id;
        var update = {};
        var parameters = request.body

        update.first_name = parameters.first_name;
        update.last_name = parameters.last_name;
        update.email = parameters.email;
        update.accounts = parameters.accounts;
        update.phone = parameters.phone;

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
        var repartidorId = request.params.id;

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