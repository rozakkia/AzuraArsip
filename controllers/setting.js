let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const multer  = require('multer');
const swal = require

exports.get_settings = function(req, res, next) {
    return models.Client.findAll().then(clients => {
      res.render('setting/index', { title: 'Settings', user: req.user , clients:clients , formData: {}, errors: {} });
    })
}

exports.get_core = function(req, res, next) {
  return models.Service.findAll().then(services => {
    return models.Type.findAll({
      include: [models.Service, models.Format_Num]
    }).then(types => {
      return models.Format_Num.findAll().then(format => {
        res.render('setting/core/index', { 
          title: 'Core Settings', 
          user: req.user, 
          services:services,
          types:types,
          format:format,
          alerts: '0'
        });
      })
    })
  })
}

const rerender_get_core = function(alerts, req, res, next) {
  return models.Service.findAll().then(services => {
    return models.Type.findAll({
      include: [models.Service, models.Format_Num]
    }).then(types => {
      return models.Format_Num.findAll().then(format => {
        res.render('setting/core/index', { 
          title: 'Core Settings', 
          user: req.user, 
          services:services,
          types:types,
          format:format,
          alerts: alerts
        });
      })
    })
  })
}

exports.create_service = function(req, res, next) {
  return models.Service.create({
    name: req.body.name,
    unique: req.body.unique
  }).then(result => {
    var serviceAdd = {};
    return res.send(serviceAdd)  
  })
}

/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})*/

const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'views/templates')
  },
  filename: function (req, file, cb) {
    cb(null, uniqueSuffix)
  }
})
 

var upload = multer({ storage: storage }).single('template')

exports.create_type = function(req,res,next) {
  upload(req,res,function(err) {
    if(err) {
        alerts="2"
        rerender_get_core(alerts,req,res,next);
        res.send('Error while uploading.');
    }else{
      console.log("ini cuy=" + req.body.name)
      return models.Type.create({
        alias: req.body.name, 
        inisial: req.body.inisial,
        jenis: req.body.jenis,
        unique_code: req.body.unique,
        file_template: uniqueSuffix,
        FormatNumId: req.body.format,
        ServiceId: req.body.service   
      }).then(result=>{
        alerts="1"
        rerender_get_core(alerts,req,res,next);
      })
    }
  }); 
}


/*uploadFile(req,res,function(err) {
    if(err) {
        res.send('Error while uploading.');
    }else{
      console.log("ini cuy=" + req.body.name)
      if(req.body.jenis == "1" || req.body.jenis == "2"){
        aliases = req.body.name + "_" + req.body.inisial
      }else{
        aliases = req.body.name
      }
      return models.Type.create({
        alias: aliases, 
        jenis: req.body.jenis,
        unique_code: req.body.unique,
        file_template: req.body.name + ".pug",
        FormatNumId: req.body.format,
        ServiceId: req.body.service   
      }).then(result=>{
        res.redirect('/settings/core');
      })
    }
  }); 
  */ 
/*
exports.create_type =  function(req, res, next) {
  return upload = multer({storage:storage})
  /*
  if(req.body.jenis == "1" || req.body.jenis == "2"){
    aliases = req.body.name + "_" + req.body.inisial
  }else{
    aliases = req.body.name
  }
  return models.Type.create({
    alias: aliases, 
    jenis: req.body.jenis,
    unique_code: req.body.unique,
    file_template: req.body.template + ".pug",
    FormatNumId: req.body.format,
    ServiceId: req.body.service   
  }).then(result=>{
    res.redirect('/settings/core');
  })
}
*/

exports.create_format = function(req, res, next) {
  let format = req.body.format.replace(/,/g , '/')
  return models.Format_Num.create({
    alias: req.body.name,
    format_num: format
  }).then(result => {
    var formatAdd = {};
    return res.send(formatAdd) 
  })
}
