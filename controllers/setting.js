let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const multer  = require('multer');
const { route } = require("../routes");
var path = require('path');

exports.get_typeTemplate = function(req, res, next){
  return models.Type.findOne({
    where:{
      id: Buffer.from(req.params.id, 'base64').toString('ascii')
    }
  }).then(result=>{
    res.render('templates/' + result.file_template)
  })
}

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
        return models.Role.findAll().then(roles =>{
          res.render('setting/core/index', { 
            title: 'Core Settings', 
            user: req.user, 
            services:services,
            types:types,
            roles:roles,
            format:format,
            alerts: '0'
          });
        })
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

exports.create_role = function(req, res, next) {
  role = req.body.route.toString()
  return models.Role.create({
    nama_role: req.body.name,
    routing: role
  }).then(result => {
    var Alerts = {};
    return res.send(Alerts)  
  })
}


exports.get_roleDetail = function(req, res, next) {
  return models.Role.findOne({
    where:{
      id: Buffer.from(req.params.id, 'base64').toString('ascii')
    }
  }).then(data=>{
    routArray = data.routing.split(",")
    res.render('setting/core/detail_role', { 
      title: 'Format Num Detail', 
      user: req.user, 
      data: data
    });
  })
}

exports.update_role = function(req, res, next) {
  return models.Role.update({
    nama_role : req.body.alias
  },{
    where:{
      id: Buffer.from(req.body.idNum, 'base64').toString('ascii')
    }
  }).then(result=>{
    var Alerts = {};
    return res.send(Alerts) 
  })
}


exports.delete_role = function(req, res, next) {
  return models.Role.destroy({
    where:{
      id: Buffer.from(req.body.idNum, 'base64').toString('ascii')
    }
  }).then(result=> {
    var Alerts = {};
    return res.send(Alerts)
  })
}

exports.create_service = function(req, res, next) {
  return models.Service.create({
    name: req.body.name,
    unique: req.body.unique,
    color_theme: req.body.color_theme
  }).then(result => {
    var serviceAdd = {};
    return res.send(serviceAdd)  
  })
}

exports.get_serviceDetail = function(req, res, next) {
  return models.Service.findOne({
    where:{
      id: Buffer.from(req.params.id, 'base64').toString('ascii')
    }
  }).then(data=>{
    res.render('setting/core/detail_service', { 
      title: 'Service Detail', 
      user: req.user, 
      data: data
    });
  })
}

exports.update_service = function(req, res, next) {
  return models.Service.update({
    name : req.body.name,
    unique : req.body.inisial,
    color_theme: req.body.color
  },{
    where:{
      id: Buffer.from(req.body.idNum, 'base64').toString('ascii')
    }
  }).then(result=>{
    var Alerts = {};
    return res.send(Alerts) 
  })
}


exports.delete_service = function(req, res, next) {
  return models.Service.destroy({
    where:{
      id: Buffer.from(req.body.idNum, 'base64').toString('ascii')
    }
  }).then(result=> {
    var Alerts = {};
    return res.send(Alerts)
  })
}

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

exports.get_typeDetail = function(req, res, next) {
  return models.Type.findOne({
    where:{
      id: Buffer.from(req.params.id, 'base64').toString('ascii')
    },
    include:[models.Format_Num, models.Service]
  }).then(data=>{
    return models.Service.findAll().then(service=>{
      return models.Format_Num.findAll().then(format=>{
        if(data.jenis==1){
          ti = 'Mail'
        }else if(data.jenis==3){
          ti = 'Billing'
        }
        res.render('setting/core/detail_type', { 
          title:  ti + ' Type Detail', 
          user: req.user, 
          data: data,
          format: format,
          service: service
        });
      })
    })
  })
}

exports.update_type = function(req, res, next) {
  selectservice = null
  if(Buffer.from(req.body.jenis, 'base64').toString('ascii') == '3'){
    selectservice = req.body.selectservice
  }
  return models.Type.update({
    alias : req.body.alias,
    inisial : req.body.inisial,
    unique_code : req.body.unique,
    FormatNumId: req.body.selectformat,
    ServiceId: selectservice
  },{
    where:{
      id: Buffer.from(req.body.idNum, 'base64').toString('ascii')
    }
  }).then(result=>{
    var Alerts = {};
    return res.send(Alerts) 
  })
}


exports.delete_type = function(req, res, next) {
  return models.Type.destroy({
    where:{
      id: Buffer.from(req.body.idNum, 'base64').toString('ascii')
    }
  }).then(result=> {
    var Alerts = {};
    return res.send(Alerts)
  })
}


// FORMAT
exports.create_format = function(req, res, next) {
  let format = req.body.format.replace(/,/g , '/')
  return models.Format_Num.create({
    alias: req.body.name,
    format_num: format
  }).then(result => {
    console.log(req.body.format)
    var formatAdd = {};
    return res.send(formatAdd) 
  })
}

exports.get_formatDetail = function(req, res, next) {
  return models.Format_Num.findOne({
    where:{
      id: Buffer.from(req.params.id, 'base64').toString('ascii')
    }
  }).then(data=>{
    let format = data.format_num.replace(/\//g , ',')
    res.render('setting/core/detail_format', { 
      title: 'Format Num Detail', 
      user: req.user, 
      format: format,
      data: data
    });
  })
}

exports.update_format = function(req, res, next) {
  return models.Format_Num.update({
    alias : req.body.alias,
    format_num : req.body.format
  },{
    where:{
      id: Buffer.from(req.body.idNum, 'base64').toString('ascii')
    }
  }).then(result=>{
    var Alerts = {};
    return res.send(Alerts) 
  })
}


exports.delete_format = function(req, res, next) {
  return models.Format_Num.destroy({
    where:{
      id: Buffer.from(req.body.idNum, 'base64').toString('ascii')
    }
  }).then(result=> {
    var Alerts = {};
    return res.send(Alerts)
  })
}
