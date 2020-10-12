
let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const {isEmpty} = require('lodash');
const { validateUser } = require('../validators/user');

// Views Controller
exports.get_login = function(req, res, next) {
  res.render('auth/login', { title: 'Login Page' , user: req.user });
}

exports.get_users = function(req, res, next) {
  return models.User.findAll().then(users => {
    res.render('user/index', { title: 'Users Account', user: req.user , users:users , formData: {}, errors: {} });
  })
}

exports.get_detail = function(req, res, next) {
  return models.User.findOne({
    where : {
        id : req.params.user_id
    }
  }).then(user_detail => {
      res.render('user/detail', { title: 'Users Detail' , user: req.user, user_detail:user_detail });
  });
}


exports.rerender_get_users = function(errors, req, res, next) {
  res.render('user/index', { title: 'Users Account', user: req.user , formData: req.body, errors: errors });
}


const generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

exports.create_user = function(req, res, next) {
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

exports.create_userAdmin = function(req, res, next) {
  return models.User.create({
    username: "admin",
    name: "Administrator", 
    password: generateHash("admin"),
    level:"1"
}).then(user => {
    res.redirect('/users');  
})
}

exports.edit_user = function(req, res, next) {
  req.params.user_id
  req.body.name
  return models.User.update({
    name:req.body.name
  },{
    where: {
      id: req.params.user_id
    }
  }).then(result => {
    res.redirect('/users/' + req.params.user_id);
  })
}

exports.delete_user = function(req, res, next) {
	return models.User.destroy({
		where: {
			id: req.params.user_id
		}
	}).then(result => {
		res.redirect('/users');
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