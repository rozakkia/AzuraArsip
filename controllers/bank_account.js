let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');

exports.get_bankaccounts = function(req, res, next) {
    return models.Bank_Account.findAll({}).then(bank_accounts => {
        res.render('bank_account/index', {
            bank_accounts: bank_accounts,
            title: 'Bank Accounts',
            user: req.user
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
        res.redirect('/bank_accounts');  
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
            id: req.body.id
        }
    }).then(result => {
        res.redirect('/bank_accounts');
    })
}

exports.delete_bankaccounts = function(req, res, next) {
    return models.Bank_Account.destroy({
        where:{
            id: req.body.id
        }
    }).then(result => {
        res.redirect('/bank_accounts');
    })
}