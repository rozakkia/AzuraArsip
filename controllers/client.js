let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');

exports.get_clients = function(req, res, next) {
    return models.Client.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    }).then(clients => {
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
    }).then(client_detail => {
        res.render('client/detail', { title: 'Client Detail' , user: req.user, client_detail:client_detail });
    });
  }

  exports.edit_client = function(req, res, next) {
    req.params.client_id
    req.body.name
    return models.Client.update({
        company_name:req.body.company,
        pj_name:req.body.name,
        pj_jabatan:req.body.jabatan,
        alamat:req.body.alamat,
        kontak:req.body.kontak
    },{
      where: {
        id: req.params.client_id
      }
    }).then(result => {
      res.redirect('/clients/' + req.params.client_id);
    })
  }
  
  exports.delete_client = function(req, res, next) {
      return models.Client.destroy({
          where: {
              id: req.params.client_id
          }
      }).then(result => {
          res.redirect('/clients');
      })
  }