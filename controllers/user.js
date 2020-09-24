
const models = require('../models')

exports.get_login = function(req, res, next) {
    res.render('auth/login', { title: 'Halaman Masuk' });
  }

exports.get_users = function(req, res, next) {
res.render('user/index', { title: 'Data User' });
}

exports.adding_user = function(req,res,next) {
  return models.User.create({
      email: req.body.lead_email
  }).then(lead=> {
      res.redirect('/leads');  
  })
}