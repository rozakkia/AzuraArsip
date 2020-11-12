let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const { result } = require("lodash");
const url = require('url');
//const test = () => Client.findAll();


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


exports.invoice_number = function(req, res, next) {
  let [month, date, year]    = ( new Date() ).toLocaleDateString().split("/")
  return models.Bill.findOne({
    order : [
      ['createdAt', 'DESC']
    ],
    limit : 1
  }).then(resultBill => {
    const no_billData = resultBill.no_bill;
    if (no_billData != null){
      const get_no_billData = no_billData.slice(0, 7);
      const today = year + '/' + month;
      if (get_no_billData == today){
        getNew = Number(no_billData.slice(8, 11)) + 1;
        if(String(getNew).length == 1){
          getCountNew = "00" + getNew
        }else if (String(getNew).length == 2){
          getCountNew = "0" + getNew
        }else {
          getCountNew = getNew
        }
      } else {
        getCountNew = "001";
      }
    } else {
      getCountNew = "001";
    }
    new_noBill = year + '/' + month + '-' + getCountNew;
    console.log(new_noBill);
  })
}

let [month, date, year]    = ( new Date() ).toLocaleDateString().split("/")

const formatIndexOf =  function(formatString){
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
  return oF
}

const newNumberID = function(req,res, oF, type){
  return models.Service.findOne({
    where: {
      id: type.ServiceId
    }
  }).then(r_Service => {
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
      oF.MV.push(month)
      newArrayNum[oF.MV[0]] = oF.MV[1]
    }
    if(oF.ID[0] != -1){
      oF.ID.push("001")
      newArrayNum[oF.ID[0]] = oF.ID[1]
    }
    newNum = (newArrayNum.toString()).replace(/,/g , '/')
    createBill(newNum, req, res)
  })
}


const nextNumberID = function(){

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
    where: {
      TypeId: req.body.typebill
    },
    include: [models.Type],
    order : [
      ['createdAt', 'DESC']
    ],
    limit : 1
  }).then(c_LastBill => {
    if(c_LastBill == null){
      // Bill sesuai Type belom ada
      return models.Type.findOne({
        where: {
          id: req.body.typebill
        }, 
        include : [models.Format_Num]
      }).then(c_formatType => {
        newNumberID(req,res, formatIndexOf(c_formatType.Format_Num.format_num),c_formatType)
      })
    }else{
      console.log("tidak ada")
      return models.Format_Num.findOne({
        where: {
          id: c_LastBill.Type.FormatNumId
        }
      }).then(c_formatType => {
        nextNum = nextNumberID(formatIndexOf(c_formatType.format_num))
      })
    }
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



/*
exports.create_billingSecond = function(req, res, next){
  let [month, date, year]    = ( new Date() ).toLocaleDateString().split("/")
  return models.Bill.create({
    no_bill: year + '/' + month,
    jenis: req.body.typebill,
    ClientId: req.body.idclient,
    UserId: req.body.userid
  }).then(result => {
    res.redirect('/billings/' + req.body.idclient + '/' + req.body.typebill);
  })
}

exports.get_billingCreate = function(req, res, next) {
  return models.Client.findOne({
    where : {
        id : req.params.client_id
    }
  }).then(client_detail => {
      res.render('billing/create', { title: req.params.type + ' Create' , user: req.user, client_detail:client_detail });
  });
}


exports.get_billings = function(req, res, next) {
  console.log("lala:" + test.company_name)
  res.render('billing/index', { title: 'Billings Payment' , user: req.user, clients:test });
}
*/



/*
exports.get_clientList = function(req, res, next) {
  return models.Client.findAll().then(clients => {
    res.send({ clients:clients });
  })
} */