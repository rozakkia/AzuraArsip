let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const { result } = require("lodash");
const url = require('url');
const Sequelize = require('sequelize');

let encoded = function(idCode){
  return Buffer.from(idCode).toString('base64')
}

let decoded = function(idCode){
  return Buffer.from(idCode, 'base64').toString('ascii')
}

CountBill = function(jenis){
  return models.Bill.count({
    where:{
      $and: Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('Bill.createdAt')), month)
    },
    include: {
      model: models.Type,
      where: {
        alias: jenis
      }
    }
  })
}



exports.get_template = function( req, res, next) {
  res.render('templates/invoice', { 
    title: 'Dashboard', 
    user: req.user });
}

exports.get_billings = function(req, res, next) {
  return models.Bill.findAll({
    include: [models.Client, {
      model:models.Type,
      include: [models.Service]
    }],
    order : [
      ['createdAt', 'DESC']
    ]
  }).then(resultGetBills => {
    return models.Client.findAll().then(resultClients => {
      return models.Type.findAll({
        where:{
          jenis: "3"
        },
        include:[models.Service]
      }).then(resultTypes => {
        CountBill('Invoice').then(function(resIn){
          CountBill('Receipt').then(function(resOut){
            res.render('billing/index', { 
              title: 'Billings Payment' , 
              user: req.user, 
              this_month: month_long,
              this_year: year,
              resultGetBills:resultGetBills, 
              resultClients:resultClients, 
              resultTypes: resultTypes,
              count_Invoice: resIn,
              count_Receipt: resOut
            });
          });
        });
      }) 
    })     
  })
}



let [month, date, year]    = ( new Date() ).toLocaleDateString().split("/")
let month_long = new Date().toLocaleString('default', { month: 'long' });

const formatIndexOf =  function(formatString, fS_lastBill, fS_FormatLastBill){
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
  if(fS_lastBill != null){
    formatLast = fS_lastBill.split("/")
    formatLastBill = fS_FormatLastBill.split("/")
    oF.last_ID = formatLast[formatLastBill.indexOf("ID")]
    oF.last_MM = formatLast[formatLastBill.indexOf("MM")]
    oF.last_MV = formatLast[formatLastBill.indexOf("MV")]
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
      id: type.ServiceId
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
    newNum = (newArrayNum.toString()).replace(/,/g , '/')
    createBill(newNum, req, res)
  })
}



const createBill = function(newNum, req, res) {
  return models.Bill.create({
    no_bill: newNum,
    ClientId: req.body.idclient,
    TypeId: req.body.typebill,
    UserId: req.body.userid
  }).then(result => {
    res.redirect(url.format({
      pathname: "billings/" + encoded(result.id)
    }))
  })
}

exports.create_billingFirst = function(req, res, next) {
  return models.Bill.findOne({
    include: {
      model: models.Type,
      where:{
        jenis: '3'
      }
    },
    order : [
      ['createdAt', 'DESC']
    ],
    limit : 1
  }).then(c_LastBill => {
    return models.Type.findOne({
      where: {
        id: req.body.typebill
      }, 
      include : [models.Format_Num]
    }).then(c_formatType => {
      if(c_LastBill == null){
        // Bill sesuai Type belom ada
        numDetail = '1'
        NumberID(req,res, formatIndexOf(c_formatType.Format_Num.format_num, null, null),c_formatType, numDetail)
      }else{
        return models.Format_Num.findOne({
          where: {
            id: c_LastBill.Type.FormatNumId
          }
        }).then(c_formatLastBill => {
          numDetail = '2'
          NumberID(req,res, formatIndexOf(c_formatType.Format_Num.format_num, c_LastBill.no_bill, c_formatLastBill.format_num),c_formatType, numDetail)
        })
      }
      
    })
    
  })
}

exports.get_billingCreated = function(req, res, next){
  return models.Bill.findOne({
    where: [{
      id : decoded(req.params.bill_id)
    }],
    include: [{
      model: models.Bill_Detail,
      include: {
        model: models.Bill_Detail_Sub,
        order:[
          ['createdAt','DESC']
        ]
      },
      order:[
        ['createdAt','DESC']
      ]
    },models.Client, models.Bank_Account, models.Type]
  }).then(resultGetBill => {
    console.log(JSON.stringify(resultGetBill, null, 2));
    return models.Bank_Account.findAll().then(resultBank => {
      res.render('billing/detail', { 
        title: 'Billing Created' , 
        user: req.user, 
        result:resultGetBill,
        resultBank: resultBank
      });
    })
  })
}

exports.create_detailSub = function(req, res, next){
  return models.Bill_Detail_Sub.create({
    deskripsi: req.body.keterangan,
    harga: req.body.harga,
    BillDetailId: req.body.idDetail
  }).then(result =>{
    encode = encoded("msg_c_detailsub=true")
    res.redirect(url.format({
      pathname: req.body.idNum,
      query: {
        alerts : encode
      }
    }))
  })
}

exports.delete_detailSub = function(req, res, next){
  return models.Bill_Detail_Sub.destroy({
    where:{
      id: req.body.idsubDetail
    }
  }).then(result=>{
    encode = encoded("msg_d_detailsub=true")
    res.redirect(url.format({
      pathname: req.body.idNum,
      query: {
        alerts : encode
      }
    }))
  })
}

exports.create_detail = function(req, res, next){
  return models.Bill_Detail.create({
    keterangan: req.body.keterangan,
    jumlah: req.body.jumlah,
    harga: req.body.harga,
    BillId: req.body.idBill
  }).then(result =>{
    var alerts = {};
    return res.send(alerts)
  })
}

exports.delete_detail = function(req, res, next){
  return models.Bill_Detail.destroy({
    where: {
      id: req.body.idDetail
    }
  }).then(result =>{
    return models.Bill_Detail_Sub.destroy({
      where: {
        BillDetailId: req.body.idDetail
      }
    }).then(result =>{
      encode = encoded("msg_d_detail=true")
      res.redirect(url.format({
        pathname: req.body.idNum,
        query: {
          alerts : encode
        }
      }))
    })
  }).catch(err=>{
    console.log(err)
  })
}

exports.update_detail = function(req, res, next){
  return models.Bill_Detail.update({
    keterangan: req.body.keterangan,
    jumlah: req.body.jumlah,
    harga: req.body.harga
  },{
    where: {
      id: req.body.idDetail
    }
  }).then(result =>{
    encode = encoded("msg_u_detail=true")
    res.redirect(url.format({
      pathname: req.body.idNum,
      query: {
        alerts : encode
      }
    }))
  }).catch(err=>{
    console.log(err)
  })
}

exports.update_billingCreated = function(req, res, next){
  return models.Bill.update({
    keterangan: req.body.keterangan,
    BankAccountId: req.body.BankAccountId,
    stat: req.body.stat
  },{
    where:{
      id: decoded(req.body.idNum)
    }
  }).then(result => {
    var alerts = {};
    return res.send(alerts)
  })
}

exports.delete_billingCreated = function(req, res, next){
  return models.Bill.destroy({
    where:{
      id: decoded(req.body.idNum)
    }
  }).then(Result => {
    encode = encoded("msg_d_detail=true")
    res.redirect(url.format({
      pathname: "/billings",
      query: {
        alerts : encode
      }
    }))
  })
}

