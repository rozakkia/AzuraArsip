
let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const {isEmpty} = require('lodash');
const { validateUser } = require('../validators/user');
const { Sequelize } = require("../models");

// Views Controller
exports.get_success = function( req, res, next) {
  res.render('auth/login', { 
    title: 'Login Page',
    user: req.user,
    alerts: 1 
  });
}

exports.get_error = function( req, res, next) {
  res.render('auth/login', { 
    title: 'Login Page',
    user: req.user,
    alerts: 2
  });
}

exports.get_login = function(req, res, next) {
  res.render('auth/login', { 
    title: 'Login Page' , 
    user: req.user 
  });
}

exports.get_users = function(req, res, next) {
  return models.User.findAll({
    include: [models.Role]
  }).then(users => {
    return models.Role.findAll().then(roles =>{
      res.render('user/index', { 
        title: 'Users Account', 
        roles:roles, 
        user: req.user , 
        users:users , 
        errors: {} 
      });
    })    
  })
}

const rerender_get_users = function(errors, req, res, next) {
  return models.User.findAll({
    include: [models.Role]
  }).then(users => {
    return models.Role.findAll().then(roles =>{
      res.render('user/index', { 
        title: 'Users Account', 
        roles:roles, 
        user: req.user , 
        users:users , 
        errors: errors
      });
    })    
  })
}

exports.get_detail = function(req, res, next) {
  return models.User.findOne({
    where : {
      id: Buffer.from(req.params.user_id, 'base64').toString('ascii')
    },
    include: [models.Role]
  }).then(user_detail => {
    return models.Role.findAll().then(roles=>{
      res.render('user/detail', { 
        title: 'User Detail' , 
        user: req.user, 
        user_detail:user_detail,
        roles:roles 
      });
    })
  });
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
          RoleId: req.body.role
      }).then(user => {
          res.redirect('/users');  
      })
    }
  })
}

exports.create_userSuperAdmin = function(req, res, next) {
  return models.Role.create({
    nama_role: "Super Administrator",
    routing: "1,2,3,4,5,6"
  }).then(role => {
    return models.User.create({
      username: "admin",
      name: "Administrator", 
      password: generateHash("admin"),
      RoleId: role.id 
    }).then(user => {
        res.redirect('/');  
    })
  })
}

exports.edit_user = function(req, res, next) {
  return models.User.update({
    name: req.body.name,
    RoleId: req.body.role,
    username: req.body.username
  },{
    where: {
      id: Buffer.from(req.body.idNum, 'base64').toString('ascii')
    }
  }).then(result => {
    var Alerts = {};
    return res.send(Alerts) 
  })
}

exports.delete_user = function(req, res, next) {
	return models.User.destroy({
		where: {
			id: Buffer.from(req.body.idNum, 'base64').toString('ascii')
		}
	}).then(result => {
		var Alerts = {};
    return res.send(Alerts) 
	})
}

exports.login = function(req,res,next){
  passport.authenticate('local', {
      successRedirect: "/login/success",
      failureRedirect: "/login/error",
      failureFlash: true
  })(req, res, next);  
}

exports.logout = function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
}


exports.get_profile = function( req, res, next) {
  res.render('user/profile', { 
    title: 'Your Profile',
    user: req.user
  });
}

exports.profile_update = function(req, res, next) {
  return models.User.update({
    name: req.body.name,
    username: req.body.username
  },{
    where: {
      id: Buffer.from(req.body.idNum, 'base64').toString('ascii')
    }
  }).then(result => {
    var Alerts = {};
    return res.send(Alerts) 
  })
}

exports.pass_update = function(req, res, next) {
  return models.User.findOne({
    where: {
      id: Buffer.from(req.body.idNum, 'base64').toString('ascii')
    }
  }).then(result=>{
    if(bcrypt.compareSync(req.body.passCurrent, result.password)){
      models.User.update({
        password: generateHash(req.body.passNew)
      },{
        where: {
          id: Buffer.from(req.body.idNum, 'base64').toString('ascii')
        }
      })
      var Alerts = '1';
      console.log(result)
    }else{
      console.log("harusnya gagal")
      var Alerts = '2';
    }
    return res.send(Alerts) 
  }).catch(err=>{
    console.log(err)
  })
}