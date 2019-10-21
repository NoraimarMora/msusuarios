'use strict'

var CuentaBancaria = require('../models/cuentaBancaria');

var controller = {

    saveCuentaBancaria: function(request, response) {
        var parameters = request.body
        var cuentaBancaria = new CuentaBancaria();

        cuentaBancaria.delivery_man = parameters.delivery_man;
        cuentaBancaria.dni = parameters.dni;
        cuentaBancaria.dni_type = parameters.dni_type;
        cuentaBancaria.account_number = parameters.account_number;
        cuentaBancaria.account_type = parameters.account_type;
        cuentaBancaria.beneficiary = parameters.beneficiary;
        cuentaBancaria.bank = parameters.bank;

        cuentaBancaria.save((error, cuentaBancariaStored) => {
            if (error) {
                return response.status(500).send({
                    status: 500,
                    error
                });
            } 
            if (!cuentaBancariaStored) {
                return response.status(404).send({
                    status: 404,
                    message: 'No se ha podido guardar el documento'
                });
            }

            var cuenta = {
                id: cuentaBancariaStored._id,
                owner_id: cuentaBancariaStored.delivery_man,
                dni: cuentaBancariaStored.dni,
                dni_type: cuentaBancariaStored.dni_type,
                account_number: cuentaBancariaStored.account_number,
                account_type: cuentaBancariaStored.account_type,
                beneficiary: cuentaBancariaStored.beneficiary,
                bank: cuentaBancariaStored.bank,
            }
            
            return response.status(200).send({
                status: 200,
                account: cuenta
            });
        });
    },

    getCuentaBancaria: function(request, response) {
        var cuentaBancariaId = request.params.id;

        if (cuentaBancariaId == null) {
            return response.status(404).send({
                status: 404, 
                message: 'Not found'
            });
        }

        CuentaBancaria.findById(cuentaBancariaId).exec(function (error, cuentaBancaria) {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!cuentaBancaria) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var cuenta = {
                id: cuentaBancaria._id,
                owner_id: cuentaBancaria.delivery_man,
                dni: cuentaBancaria.dni,
                dni_type: cuentaBancaria.dni_type,
                account_number: cuentaBancaria.account_number,
                account_type: cuentaBancaria.account_type,
                beneficiary: cuentaBancaria.beneficiary,
                bank: cuentaBancaria.bank,
            }

            return response.status(200).send({
                status: 200,
                account: cuenta
            });
        });
    },

    getCuentasBancariasByRepartidor: function(request, response) {
        var repartidorId = request.params.id;

        if (repartidorId == null) {
            return response.status(404).send({
                status: 404, 
                message: 'Not found'
            });
        }

        CuentaBancaria.findOne({delivery_man: repartidorId}).exec(function (error, cuentasBancarias) {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!cuentasBancarias) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var cuentas = []

            cuentasBancarias.map((account) => {
                cuentas.push({
                    id: account._id,
                    owner_id: account.delivery_man,
                    dni: account.dni,
                    dni_type: account.dni_type,
                    account_number: account.account_number,
                    account_type: account.account_type,
                    beneficiary: account.beneficiary,
                    bank: account.bank,
                })
            })

            return response.status(200).send({
                status: 200,
                accounts: cuentas
            });
        });
    },

    getCuentasBancarias: function (request, response) {
        CuentaBancaria.find({}).exec((error, cuentasBancarias) => {
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

            var cuentas = []

            cuentasBancarias.map((account) => {
                cuentas.push({
                    id: account._id,
                    owner_id: account.delivery_man,
                    dni: account.dni,
                    dni_type: account.dni_type,
                    account_number: account.account_number,
                    account_type: account.account_type,
                    beneficiary: account.beneficiary,
                    bank: account.bank,
                })
            })

            return response.status(200).send({
                status:200, 
                accounts: cuentas
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
                    status: 500, 
                    error
                });
            }

            if (!cuentaBancariaUpdated) {
                return response.status(404).send({
                    status: 404,
                    message: 'Not found' 
                });
            }

            var cuenta = {
                id: cuentaBancariaUpdated._id,
                owner_id: cuentaBancariaUpdated.delivery_man,
                dni: cuentaBancariaUpdated.dni,
                dni_type: cuentaBancariaUpdated.dni_type,
                account_number: cuentaBancariaUpdated.account_number,
                account_type: cuentaBancariaUpdated.account_type,
                beneficiary: cuentaBancariaUpdated.beneficiary,
                bank: cuentaBancariaUpdated.bank,
            }

            return response.status(200).send({
                status: 200, 
                account: cuenta
            });
        });
    },

    deleteCuentaBancaria: function (request, response) {
        var cuentaBancariaId = request.params.id;

        CuentaBancaria.findByIdAndRemove(cuentaBancariaId, (error, cuentaBancariaRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!cuentaBancariaRemoved) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var cuenta = {
                id: cuentaBancariaRemoved._id,
                owner_id: cuentaBancariaRemoved.delivery_man,
                dni: cuentaBancariaRemoved.dni,
                dni_type: cuentaBancariaRemoved.dni_type,
                account_number: cuentaBancariaRemoved.account_number,
                account_type: cuentaBancariaRemoved.account_type,
                beneficiary: cuentaBancariaRemoved.beneficiary,
                bank: cuentaBancariaRemoved.bank,
            }

            return response.status(200).send({
                status: 200, 
                account: cuenta
            });
        });
    } 
};

module.exports = controller;