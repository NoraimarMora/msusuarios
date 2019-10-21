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
        repartidor.accounts = parameters.accounts;

        repartidor.save((error, repartidorStored) => {
            if (error) {
                return response.status(500).send({
                    status: 500,
                    error
                });
            } 
            if (!repartidorStored) {
                return response.status(404).send({
                    status: 404,
                    message: 'No se ha podido guardar el documento'
                });
            }

            var delivery_man = {
                id: repartidorStored._id,
                phone: repartidorStored.phone,
                accounts: repartidorStored.accounts,
                active: repartidorStored.active,
                date_created: repartidorStored.date_created,
                first_name: repartidorStored.first_name,
                last_name: repartidorStored.last_name,
                email: repartidorStored.email,
                password: repartidorStored.password
            }

            return response.status(200).send({
                status: 200,
                delivery_man: delivery_man
            });
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
                    status: 500,
                    error
                });
            }

            if (!repartidor) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            if (password == repartidor.password) {
                
                var accounts = []

                repartidor.accounts.map((account) => {
                    accounts.push({
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

                var delivery_man = {
                    id: repartidor._id,
                    phone: repartidor.phone,
                    accounts: accounts,
                    active: repartidor.active,
                    date_created: repartidor.date_created,
                    first_name: repartidor.first_name,
                    last_name: repartidor.last_name,
                    email: repartidor.email,
                    password: repartidor.password
                }

                return response.status(200).send({
                    status: 200,
                    delivery_man: delivery_man
                });
                
            } else {
                return response.status(404).send({
                    status: 404,
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
                    status: 500, 
                    error
                });
            }
            if (!repartidor) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var accounts = []

            repartidor.accounts.map((account) => {
                accounts.push({
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

            var delivery_man = {
                id: repartidor._id,
                phone: repartidor.phone,
                accounts: accounts,
                active: repartidor.active,
                date_created: repartidor.date_created,
                first_name: repartidor.first_name,
                last_name: repartidor.last_name,
                email: repartidor.email,
                password: repartidor.password
            }

            return response.status(200).send({
                status: 200,
                delivery_man: delivery_man
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

            var accounts = []

            repartidor.accounts.map((account) => {
                accounts.push({
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

            var delivery_man = {
                id: repartidor._id,
                phone: repartidor.phone,
                accounts: accounts,
                active: repartidor.active,
                date_created: repartidor.date_created,
                first_name: repartidor.first_name,
                last_name: repartidor.last_name,
                email: repartidor.email,
                password: repartidor.password
            }

            return response.status(200).send({
                status: true,
                delivery_man: delivery_man
            });
        });
    },

    getRepartidores: function (request, response) {
        var delivery_men = []

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

            repartidores.map((repartidor) => {
                var accounts = []

                repartidor.accounts.map((account) => {
                    accounts.push({
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
    
                delivery_men.push({
                    id: repartidor._id,
                    phone: repartidor.phone,
                    accounts: accounts,
                    active: repartidor.active,
                    date_created: repartidor.date_created,
                    first_name: repartidor.first_name,
                    last_name: repartidor.last_name,
                    email: repartidor.email,
                    password: repartidor.password
                })
            })

            return response.status(200).send({
                status:true, 
                delivery_men: delivery_men
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
                    status: 500, 
                    error
                });
            }

            if (!repartidorUpdated) {
                return response.status(404).send({
                    status: 404, 
                    message: 'Not found'
                });
            }

            var delivery_man = {
                id: repartidorUpdated._id,
                phone: repartidorUpdated.phone,
                accounts: repartidorUpdated.accounts,
                active: repartidorUpdated.active,
                date_created: repartidorUpdated.date_created,
                first_name: repartidorUpdated.first_name,
                last_name: repartidorUpdated.last_name,
                email: repartidorUpdated.email,
                password: repartidorUpdated.password
            }

            return response.status(200).send({
                status: 200, 
                delivery_man: delivery_man
            });
        });
    },

    deleteRepartidor: function (request, response) {
        var repartidorId = request.params.id;

        Repartidor.findByIdAndRemove(repartidorId, (error, repartidorRemoved) => {
            if (error) {
                return response.status(500).send({
                    status: 500, 
                    error
                });
            }
            if (!repartidorRemoved) {
                return response.status(404).send({
                    status: 404, 
                });
            }

            var delivery_man = {
                id: repartidorRemoved._id,
                phone: repartidorRemoved.phone,
                accounts: repartidorRemoved.accounts,
                active: repartidorRemoved.active,
                date_created: repartidorRemoved.date_created,
                first_name: repartidorRemoved.first_name,
                last_name: repartidorRemoved.last_name,
                email: repartidorRemoved.email,
                password: repartidorRemoved.password
            }

            return response.status(200).send({
                status: 200, 
                delivery_man: delivery_man
            });
        });
    } 
};

module.exports = controller;