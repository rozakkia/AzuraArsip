let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');


exports.get_settings = function(req, res, next) {
    return models.Client.findAll().then(clients => {
      res.render('setting/index', { title: 'Settings', user: req.user , clients:clients , formData: {}, errors: {} });
    })
}
