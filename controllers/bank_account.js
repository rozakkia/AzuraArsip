let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');

const rerender_get_bankaccounts = function(alerts, req, res, next) {
    return models.Bank_Account.findAll({}).then(bank_accounts => {
        res.render('bank_account/index', {
            bank_accounts: bank_accounts,
            title: 'Bank Accounts',
            user: req.user,
            alerts: alerts
        })
    })
}

exports.get_bankaccounts = function(req, res, next) {
    return models.Bank_Account.findAll({
        where:{
            ClientId: null
        }
    }).then(bank_accounts => {
        res.render('bank_account/index', {
            bank_accounts: bank_accounts,
            title: 'Bank Accounts',
            user: req.user,
            alerts: 0
        })
    })
}

exports.create_bankaccounts = function(req, res, next) {
    return models.Bank_Account.create({
        alias: req.body.alias,
        bank: req.body.bank,
        bank_name: req.body.nama, 
        bank_num: req.body.nomor
    }).then(user => {
        var Alerts = {};
        return res.send(Alerts) 
    })
}

exports.update_bankaccounts = function(req, res, next) {
    return models.Bank_Account.update({
        alias: req.body.alias,
        bank: req.body.bank,
        bank_name: req.body.nama, 
        bank_num: req.body.nomor
    },{
        where: {
            id: Buffer.from(req.body.idNum, 'base64').toString('ascii')
        }
    }).then(result => {
        alerts="1"
        rerender_get_bankaccounts(alerts,req,res,next);
    })
}

exports.delete_bankaccounts = function(req, res, next) {
    return models.Bank_Account.destroy({
        where:{
            id: Buffer.from(req.body.idNum, 'base64').toString('ascii')
        }
    }).then(result => {
        alerts="2"
        rerender_get_bankaccounts(alerts,req,res,next);
    })
}