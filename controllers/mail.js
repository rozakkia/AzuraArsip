let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const { result, orderBy, template } = require("lodash");
const multer  = require('multer');
const url = require('url');
const moment = require('moment');
const Sequelize = require('sequelize');

let encoded = function(idCode){
  return Buffer.from(idCode).toString('base64')
}

let decoded = function(idCode){
  return Buffer.from(idCode, 'base64').toString('ascii')
}

let [month, date, year]    = ( new Date() ).toLocaleDateString().split("/")
let month_long = new Date().toLocaleString('default', { month: 'long' });


CountMail = function(jenis){
  return models.Mail.count({
    where:{
      $and: Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), month),
      jenis: jenis
    }
  })
}

exports.get_mails = function(req, res, next) {
  return models.Mail.findAll({
    order: [
      ['createdAt','DESC']
    ],
    include:[models.Type]
  }
  ).then(mails => {
    
    return models.Service.findAll().then(service=>{
      return models.Type.findAll({
        where: {
          jenis: '1'
        }
      }).then(typemail => {
        CountMail('2').then(function(resIn){
          CountMail('1').then(function(resOut){
            res.render('mail/index', { 
              title: 'Archive Mails' , 
              user: req.user, 
              mails:mails,
              this_month: month_long,
              this_year: year,
              CountMail_Out: resOut,
              CountMail_In: resIn,
              service:service,
              typemail: typemail,
              alerts: '0'
            });
          });
        });
      })
    })
  })
}

const rerender_get_mails = function(alerts, req, res, next) {
  return models.Mail.findAll({
    order: [
      ['createdAt','DESC']
    ],
    include:[models.Type]
  }
  ).then(mails => {
    return models.Service.findAll().then(service=>{
      return models.Type.findAll({
        where: {
          jenis: '1'
        }
      }).then(typemail => {
        res.render('mail/index', { 
          title: 'Archive Mails' , 
          user: req.user, 
          mails:mails,
          service:service,
          typemail: typemail,
          alerts: alerts
        });
      })
    })
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
      const filename = req.file.originalname.split('.').slice(0, -1).join('.');
      return models.Mail.create({
        no_mail: req.body.nosurat, 
        perihal: req.body.perihal,
        keterangan: uniqueSuffix + '-' +  filename,
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

exports.get_detailMailOut = function(req,res,next){
  mail_id = Buffer.from(req.params.mail_id, 'base64').toString('ascii')
  return models.Mail.findOne({
    where: {
      id: mail_id
    },
    include: [{
      model: models.Type,
      include: {
        model: models.Template
      }
    }]
  }).then(result => {
    keyTag = [result.Type.Template.isi.indexOf('&lt;&gt;'),result.Type.Template.isi.indexOf('&lt;/&gt;')]
    keytag = result.Type.Template.isi.indexOf('&lt;&gt;')+"_"+result.Type.Template.isi.indexOf('&lt;/&gt;')
    isiSlice = result.Type.Template.isi.slice((keyTag[0]) + 8,keyTag[1])
    res.render('mail/out/detail', { 
      title: 'Mail-Out Detail' , 
      user: req.user, 
      isi: isiSlice,
      result: result,
      keytag: keytag 
    });
  })
}


const formatIndexOf =  function(formatString, fS_lastMail, fS_FormatLastMail){
  format = formatString.split("/")
  let oF = {
    "format": format,
    "L": format.length,
    "MM": [format.indexOf("MM")],
    "MV": [format.indexOf("MV")],
    "ID": [format.indexOf("ID")],
    "U": [format.indexOf("U")],
    "I": [format.indexOf("I")],
    "YYYY": [format.indexOf("YYYY")],
  }
  if(fS_lastMail != null){
    formatLast = fS_lastMail.split("/")
    formatLastMail = fS_FormatLastMail.split("/")
    oF.last_ID = formatLast[formatLastMail.indexOf("ID")]
    oF.last_MM = formatLast[formatLastMail.indexOf("MM")]
    oF.last_MV = formatLast[formatLastMail.indexOf("MV")]
  }
  
  return oF
}

function romanize(num) {
  var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
  for ( i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

const NumberID = function(req,res, oF, type, numDetail){
  return models.Service.findOne({
    where: {
      id: req.body.service
    }
  }).then(r_Service => {
    monthromawi = romanize(month)
    let newArrayNum = Array(oF.L).fill(0);
    if(oF.I[0] != -1){
      oF.I.push(r_Service.unique)
      newArrayNum[oF.I[0]] = oF.I[1]
    }
    if(oF.U[0] != -1){
      oF.U.push(type.unique_code)   
      newArrayNum[oF.U[0]] = oF.U[1]
    }
    if(oF.YYYY[0] != -1){
      oF.YYYY.push(year)
      newArrayNum[oF.YYYY[0]] = oF.YYYY[1]
    }
    if(oF.MM[0] != -1){
      oF.MM.push(month)
      newArrayNum[oF.MM[0]] = oF.MM[1]
    }
    if(oF.MV[0] != -1){
      oF.MV.push(romanize(month))
      newArrayNum[oF.MV[0]] = oF.MV[1]
    }
    if(numDetail == 1){
      if(oF.ID[0] != -1){
        oF.ID.push("001")
        newArrayNum[oF.ID[0]] = oF.ID[1]
      }else{
        res.send("The Format Number is Error, ID is unavailable!")
      }
    }else if (numDetail == 2){
      if(oF.ID[0] != -1){
        if(oF.MM[0] != -1 || oF.MV[0] != -1){
          if(oF.MM[1] == oF.last_MM || oF.MV[1] == oF.last_MV){
            newestID = Number(oF.last_ID) + 1
            if(String(newestID).length == 1){
              countNewestID = "00" + newestID
            }else if(String(newestID).length == 2){
              countNewestID = "0" + newestID
            }else if(String(newestID).length == 3){
              countNewestID = newestID
            }else{
              res.send("Error Asli")
            }
            oF.ID.push(countNewestID)
            newArrayNum[oF.ID[0]] = oF.ID[1]
          }else{
            oF.ID.push("001")
            newArrayNum[oF.ID[0]] = oF.ID[1]
          }
        }
      }else{
        res.send("The Format Number is Error, ID is unavailable!")
      }
    }else{
      res.send("Galat Error")
    }
    console.log(oF)
    console.log(newArrayNum)
    newNum = (newArrayNum.toString()).replace(/,/g , '/')
    createMailOut(newNum, req, res)
  })
}

const createMailOut = function(newNum, req, res) {
  
  return models.Mail.create({
    no_mail: newNum,
    keterangan: req.body.keterangan,
    jenis: '1',
    stat: '1',
    TypeId: req.body.typemail,
    UserId: req.body.userId
  }).then(result => {
    encoded = Buffer.from(result.id).toString('base64');
    res.redirect('out/' + encoded); 
  })
}

exports.create_suratKeluarFirst = function(req,res,next) {
  return models.Mail.findOne({
    include: {
      model: models.Type,
      where:{
        jenis: '1'
      }
    },
    order : [
      ['createdAt', 'DESC']
    ],
    limit : 1
  }).then(c_LastMail=> {
    return models.Type.findOne({
      where: {
        id: req.body.typemail
      },
      include: [models.Format_Num]
    }).then(c_formatType=> {
      if(c_LastMail == null){
        numDetail = '1'
        NumberID(req, res, formatIndexOf(c_formatType.Format_Num.format_num, null, null), c_formatType, numDetail)
      }else{
        return models.Format_Num.findOne({
          where: {
            id: c_LastMail.Type.FormatNumId
          }
        }).then(c_formatLastMail => {
          numDetail = '2'
          NumberID(req,res, formatIndexOf(c_formatType.Format_Num.format_num, c_LastMail.no_mail, c_formatLastMail.format_num),c_formatType, numDetail)
        })
      }
    })
  })
}

exports.update_MailOut = function(req, res, next) {
  return models.Mail.update({
    perihal: req.body.perihal,
    tujuan: req.body.kepada + "_" + req.body.di,
    date: req.body.tanggal,
    isi: req.body.isi,
    keytag: req.body.keytag,
    stat: '2'
  },{
    where:{
      id: req.body.idmail
    }
  }).then(result => {
    var alerts = {};
    return res.send(alerts)  
  })
}

exports.update_MailIn = function(req, res, next) {
  return models.Mail.update({
    mail_no: req.body.mail_no,
    perihal: req.body.perihal
  },{
    where:{
      id: Buffer.from(req.body.idNum, 'base64').toString('ascii')
    }
  }).then(result => {
    var Update = {};
    return res.send(Update)  
  })
}

exports.delete_MailIn = function(req, res, next) {
  return models.Mail.destroy({
    where:{
      id: Buffer.from(req.body.idNum, 'base64').toString('ascii')
    }
  }).then(result=> {
    var Alerts = {};
    return res.send(Alerts)  
  })
}

exports.get_print_detail = function (req, res, next){
  const html2pug = require('html2pug')
  const pug = require('pug')
  return models.Mail.findOne({
    where: {
      id: decoded(req.params.mail_id)
    },
    include:[{
      model: models.Type,
      include: {
        model: models.Template
      }
    }]
  }).then(result=>{
    headerCSS=`<head><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,400i,600,700"><link rel="stylesheet" href="/assets/css/codebase.css"></head>`
    printable = (req.query.print == 'true') ? "<script type='text/javascript'>window.print()</script>" : ""
    resKey = result.keytag.split("_")
    isi = result.Type.Template.isi.slice(resKey[0],resKey[1])
    isiUbah = result.Type.Template.isi.replace(isi,result.isi)
    pugfile = html2pug(headerCSS + isiUbah + printable , { tabs: true })
    
    tempatSplit = result.tujuan.split("_")
    res.send(pug.render(pugfile, {
      D_noID: result.no_mail,
      D_keterangan: result.keterangan ,
      D_date: result.createdAt,
      T_alias: result.Type.alias,
      // S_name: result.Service.name,
      // S_unique:,
      D_perihal: result.perihal,
      D_tujuan: tempatSplit[0],
      D_tempat: tempatSplit[1],
      D_date: result.date,
      T_inisial: result.Type.inisial
    }))
  })
}

exports.activateUbah = function(req, res, next){
  return models.Mail.update({
    stat: '1'
  },{
    where:{
      id: decoded(req.params.mail_id)
    }
  }).then(result => {
    res.redirect('/mails/out/' +req.params.mail_id); 
  })
}

exports.print_data = function(req, res, next){
  return models.Mail.update({
    stat:"3"
  },{
    where:{
      id: decoded(req.body.idNum)
    }
  }).then(result=>{
    var alerts = {};
    return res.send(alerts)
  })
}