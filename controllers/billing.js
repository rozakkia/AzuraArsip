let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const { result } = require("lodash");
const url = require('url');


exports.get_billings = function(req, res, next) {
  return models.Bill.findAll({
    include: [models.Client, models.Type],
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
        res.render('billing/index', { 
          title: 'Billings Payment' , 
          user: req.user, 
          resultGetBills:resultGetBills, 
          resultClients:resultClients, 
          resultTypes: resultTypes 
        });
      }) 
    })     
  })
}



let [month, date, year]    = ( new Date() ).toLocaleDateString().split("/")

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
    console.log(oF)
    console.log(newArrayNum)
    newNum = (newArrayNum.toString()).replace(/,/g , '/')
    createBill(newNum, req, res)
  })
}



const createBill = function(newNum, req, res) {
  encoded = Buffer.from(newNum).toString('base64');
  return models.Bill.create({
    no_bill: newNum,
    ClientId: req.body.idclient,
    TypeId: req.body.typebill,
    UserId: req.body.userid
  }).then(result => {
    res.redirect(url.format({
      pathname: "billings/create",
      query: {
        "passCode" : encoded
      },
      order: [
        ['createdAt','DESC']
      ]
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
          NumberID(req,res, formatIndexOf(c_formatType.Format_Num.format_num, c_LastBill.no_bill, c_formatLastBill.format_num),c_LastBill.Type, numDetail)
        })
      }
      
    })
    
  })
}

exports.get_billingCreated = function(req, res, next){
  decode = Buffer.from(req.query.passCode, 'base64').toString('ascii')
  return models.Bill.findOne({
    where: [{
      no_bill : decode
    }],
    include: [models.Client, models.Bank_Account, models.Type]
  }).then(resultGetBill => {
    return models.Bill_Detail.findAll({
      where: {
        BillId: resultGetBill.id
      }
    }).then(result => {
      return models.Bank_Account.findAll().then(resultBank => {
        res.render('billing/create', { 
          title: 'Billing Created' , 
          user: req.user, 
          bill_detail:resultGetBill, 
          bills_detail:result,
          resultBank: resultBank
        });
      })
    })
  })
}

exports.create_detail = function(req, res, next){
  return models.Bill_Detail.create({
    keterangan: req.body.keterangan,
    jumlah: req.body.jumlah,
    BillId: req.body.idBill
  }).then(result =>{
    var alerts = {};
    return res.send(alerts)
  })
}

exports.delete_detail = function(req, res, next){
  return models.Bill_Detail.destroy({
    where: {
      id: req.body.id_detail
    }
  }).then(result =>{
    encoded = Buffer.from(req.body.no_bill).toString('base64');
    res.redirect(url.format({
      pathname: "create",
      query: {
        "passCode" : encoded
      },
      order: [
        ['createdAt','DESC']
      ]
    }))
  })
}

exports.update_billingCreated = function(req, res, next){
  return models.Bill.update({
    keterangan: req.body.keterangan,
    BankAccountId: req.body.BankAccountId,
    stat: 1
  },{
    where:{
      id: req.body.idBill
    }
  }).then(result => {
    var alerts = {};
    return res.send(alerts)
  })
}

