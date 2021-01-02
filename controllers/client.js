let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');

exports.get_clients = function(req, res, next) {
  return models.Client.findAll({
    order: [
      ['createdAt', 'DESC']
    ],
    include: {
      model: models.Client_Contact,
      where:{
        jenis_kontak: '1'
      },
      limit:1
    }
  }).then(clients => {
    console.log(JSON.stringify(clients, null, 2));
    res.render('client/index', { 
      title: 'Clients Data', 
      user: req.user , 
      clients:clients , 
      formData: {}, 
      errors: {} });
  }).catch(err=>{
    console.log(err)
  })
}

exports.create_clientContact = function(req, res, next) {
  return models.Client_Contact.create({
    alias: req.body.alias,
    jenis_kontak: req.body.jenis,
    detail_kontak: req.body.kontak,
    ClientId: req.params.client_id
  }).then(result =>{
    res.redirect('/clients/' + req.params.client_id)
  })
}

exports.delete_clientContact = function(req, res, next) {
  return models.Client_Contact.destroy({
    where: {
        id: req.params.id
    }
  }).then(result => {
    res.redirect('/clients/'+req.body.idClient);
  })
}



exports.create_client = function(req, res, next) {
    return models.Client.create({
      company_name: req.body.company,
      pj_name: req.body.name, 
      pj_jabatan: req.body.jabatan,
      alamat: req.body.alamat
  }).then(user => {
    var clientAdd = {};
    return res.send(clientAdd)
  })
}



exports.get_detail = function(req, res, next) {
  return models.Client.findOne({
      where : {
          id : req.params.client_id
      },
      include: [models.Client_Contact, models.Bank_Account]
    }).then(client_detail => {
      res.render('client/detail', { 
        title: 'Client Detail' , 
        user: req.user, 
        client_detail:client_detail });
    });  
}

  exports.edit_client = function(req, res, next) {
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

  exports.create_clientBank = function(req, res, next) {
    return models.Bank_Account.create({
      alias: req.body.alias,
      bank: req.body.name,
      bank_name: req.body.an,
      bank_num: req.body.num,
      ClientId: req.body.clientId
    }).then(result =>{
      var alert = {};
      return res.send(alert)
    })
  }

  exports.edit_clientBank = function(req, res, next) {
    return models.Bank_Account.update({
      alias: req.body.aliasBank,
      bank: req.body.namaBank,
      bank_name: req.body.anBank,
      bank_num: req.body.numBank
    },{
      where: {
        id: req.body.BankId
      }
    }).then(result => {
      res.redirect('/clients/' + req.params.client_id);
    })
  }
  
  exports.delete_clientBank = function(req, res, next) {
    return models.Bank_Account.destroy({
      where: {
          id: req.params.id
      }
    }).then(result => {
      res.redirect('/clients/'+req.body.idClient);
    })
  }
