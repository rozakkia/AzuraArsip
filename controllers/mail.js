let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const { result } = require("lodash");

exports.get_mails = function(req, res, next) {
    return models.Mail.findAll().then(mails => {
      res.render('mail/index', { title: 'Archive Mails' , user: req.user, mails:mails });
    })
  }

exports.get_mailsIn = function(req, res, next) {
  return models.Mail.findAll({
    where : {
      jenis : 1
    }
  }).then(mails => {
    res.render('mail/Inindex', { title: 'Mails In' , user: req.user, mails:mails });
  })
}

exports.get_mailsOut = function(req, res, next) {
  return models.Mail.findAll({
    where : {
      jenis : 2
  }
  }).then(mails => {
    res.render('mail/Outindex', { title: 'Mails Out' , user: req.user, mails:mails });
  })
}