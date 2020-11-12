let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const { result } = require("lodash");
const multer  = require('multer');

exports.get_mails = function(req, res, next) {
  return models.Mail.findAll().then(mails => {
    res.render('mail/index', { 
      title: 'Archive Mails' , 
      user: req.user, 
      mails:mails,
      alerts: '0'
    });
  })
}

const rerender_get_mails = function(alerts, req, res, next) {
  return models.Mail.findAll().then(mails => {
    res.render('mail/index', { 
      title: 'Archive Mails' , 
      user: req.user, 
      mails:mails,
      alerts: alerts
    });
  })
}

const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) 

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets/file-surat')
  },
  filename: function (req, file, cb) {
    cb(null, uniqueSuffix  + '-' +  file.originalname)
  }
})

var upload = multer({ storage: storage }).single('file')

exports.create_suratMasuk = function(req,res,next) {
  upload(req,res,function(err) {
    if(err) {
        alerts="2"
        rerender_get_mails(alerts,req,res,next);
        res.send('Error while uploading.' + err);
    }else{
      return models.Mail.create({
        no_mail: req.body.nosurat, 
        perihal: req.body.perihal,
        keterangan: uniqueSuffix + '-' +  req.file.originalname,
        jenis: "2"
      }).then(result=>{
        alerts="1"
        rerender_get_mails(alerts,req,res,next);
      })
    }
  }); 
}

exports.get_detailMailIn = function(req,res,next){
  mail_id = Buffer.from(req.params.mail_id, 'base64').toString('ascii')
  return models.Mail.findOne({
    where: {
      id: mail_id
    }
  }).then(result => {
    res.render('mail/in/detail', { 
      title: 'Mail-In Detail' , 
      user: req.user, 
      result: result 
    });
  })
}