let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');

exports.get_clients = function(req, res, next) {
    return models.Client.findAll().then(clients => {
      res.render('client/index', { title: 'Clients Data', user: req.user , clients:clients , formData: {}, errors: {} });
    })
}

exports.create_client = function(req, res, next) {
    return models.Client.create({
        company_name: req.body.company,
        pj_name: req.body.name, 
        pj_jabatan: req.body.jabatan,
        alamat: req.body.alamat,
        kontak: req.body.kontak
    }).then(user => {
        res.redirect('/clients');  
    })
}

exports.get_detail = function(req, res, next) {
    return models.Client.findOne({
      where : {
          id : req.params.client_id
      }
    }).then(user_detail => {
        res.render('client/detail', { title: 'Client Detail' , user: req.user, client_detail:client_detail });
    });
  }