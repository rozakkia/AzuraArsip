
let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');

exports.get_login = function(req, res, next) {
    res.render('auth/login', { title: 'Halaman Masuk' });
  }

exports.get_users = function(req, res, next) {
res.render('user/index', { title: 'Data User' });
}

const generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

exports.adding_user = function(req, res, next) {
  let newUser;
  console.log("Email: ", generateHash(req.body.password));
  newUser = models.User.build({
    username: req.body.username,
    name: req.body.name, 
    password: generateHash(req.body.password),
    level: req.body.level
  });
  return newUser.save().then(result => {
    passport.authenticate('local', {
      successRedirect: "/users",
      failureRedirect: "/",
      failureFlash: true
    })(req, res, next);
  })
}

exports.logout = function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
}