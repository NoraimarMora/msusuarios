'use strict'

var CuentaBancaria = require('../models/cuentaBancaria');

var controller = {

    saveCuentaBancaria: function(request, response) {
        var parameters = request.body
        var cuentaBancaria = new CuentaBancaria();

        cuentaBancaria.delivery_man_id = parameters.delivery_man_id;
        cuentaBancaria.dni = parameters.dni;
        cuentaBancaria.dni_type = parameters.dni_type;
        cuentaBancaria.account_number = parameters.account_number;
        cuentaBancaria.account_type = parameters.account_type;
        cuentaBancaria.beneficiary = parameters.beneficiary;
        cuentaBancaria.bank = parameters.bank;

        cuentaBancaria.save((error, cuentaBancariaStored) => {
            if (error) {
                return response.status(500).send({error});
            } 
            if (!cuentaBancariaStored) {
                return response.status(404).send({message: 'No se ha podido guardar el documento'});
            }

            
            return response.status(200).send({cuentaBancaria: cuentaBancariaStored});
        });
    },

    getCuentaBancaria: function(request, response) {
        var cuentaBancariaId = request.params.id;

        if (cuentaBancariaId == null) {
            return response.status(404).send({
                status: false, 
            });
        }

        CuentaBancaria.findById(cuentaBancariaId)
            .populate('delivery_man_id')
            .exec(function (error, cuentaBancaria) {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!cuentaBancaria) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true,
                cuentaBancaria: cuentaBancaria
            });
        });
    },

    getCuentasBancariasByRepartidor: function(request, response) {
        var repartidorId = request.params.id;

        if (repartidorId == null) {
            return response.status(404).send({
                status: false, 
            });
        }

        CuentaBancaria.findOne({delivery_man_id: repartidorId})
            .populate('delivery_man_id')
            .exec(function (error, cuentasBancarias) {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!cuentasBancarias) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true,
                cuentasBancarias: cuentasBancarias
            });
        });
    },

    getCuentasBancarias: function (request, response) {
        CuentaBancaria.find({}).populate('delivery_man_id').exec((error, cuentasBancarias) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!cuentasBancarias) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status:true, 
                cuentasBancarias: cuentasBancarias
            });
        });
    },

    updateCuentaBancaria: function (request, response) {
        var cuentaBancariaId = request.params.id;
        var update = {};
        var parameters = request.body

        update.dni = parameters.dni;
        update.dni_type = parameters.dni_type;
        update.account_number = parameters.account_number;
        update.account_type = parameters.account_type;
        update.beneficiary = parameters.beneficiary;
        update.bank = parameters.bank;

        CuentaBancaria.findByIdAndUpdate(cuentaBancariaId, update, {new: true}, (error, cuentaBancariaUpdated) => {

            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }

            if (!cuentaBancariaUpdated) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                cuentaBancaria: cuentaBancariaUpdated
            });
        });
    },

    deleteCuentaBancaria: function (request, response) {
        var cuentaBancariaId = request.params.id;

        CuentaBancaria.findByIdAndRemove(cuentaBancariaId, (error, cuentaBancariaRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: false, 
                    error
                });
            }
            if (!cuentaBancariaRemoved) {
                return response.status(404).send({
                    status: false, 
                });
            }

            return response.status(200).send({
                status: true, 
                cuentaBancaria: cuentaBancariaRemoved
            });
        });
    } 
};

module.exports = controller;