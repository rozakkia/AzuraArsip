let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');

exports.get_invoice_1 = function(req, res, next) {
    return models.Client.findAll().then(clients => {
      res.render('templates/invoice_1', { title: 'Clients Data', user: req.user , clients:clients , formData: {}, errors: {} });
    })
}