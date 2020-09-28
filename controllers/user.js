
let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const {isEmpty} = require('lodash');
const { validateUser } = require('../validators/user');

// Views Controller
exports.get_login = function(req, res, next) {
  res.render('auth/login', { title: 'Halaman Masuk' , user: req.user });
}

exports.get_users = function(req, res, next) {
  res.render('user/index', { title: 'Data User', user: req.user , formData: {}, errors: {} });
}

exports.rerender_get_users = function(errors, req, res, next) {
  res.render('user/index', { title: 'Data User', user: req.user , formData: req.body, errors: errors });
}


const generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

exports.adding_user = function(req, res, next) {
  let errors = {};
  return validateUser(errors, req).then(error => {
    if (!isEmpty(errors)) {
      rerender_get_users(errors, req, res, next);
    } else {
      return models.User.create({
          username: req.body.username,
          name: req.body.name, 
          password: generateHash(req.body.password),
          level: req.body.level
      }).then(user => {
          res.redirect('/users');  
      })
    }
  })
}

exports.login = function(req,res,next){
  passport.authenticate('local', {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
  })(req, res, next);  
}

exports.logout = function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
}