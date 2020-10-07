let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');

exports.get_billings = function(req, res, next) {
    res.render('billing/index', { title: 'Billings Payment' , user: req.user });
  }