let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const { result } = require("lodash");
const url = require('url');
//const test = () => Client.findAll();


exports.get_billings = function(req, res, next) {
  return models.Client.findAll().then(clients => {
    res.render('billing/index', { title: 'Billings Payment' , user: req.user, clients:clients });
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

exports.getnewInvoiceNumbers = function(req, res, next) {
  return models.Bill.findAll({
    order : [
      ['createdAt', 'DESC']
    ],
    limit : 1
  }).then(hasil => {
    res.send({hasil:hasil})
  })
}


exports.create_billingFirst = function(req, res, next) {
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
    return models.Bill.create({
      no_bill: new_noBill,
      jenis: req.body.typebill,
      ClientId: req.body.idclient,
      UserId: req.body.userid
    }).then(result => {
      //res.redirect('/billings/' + req.body.idclient + '/' + req.body.typebill + '/' + new_noBill);
      res.redirect(url.format({
        pathname: "billings/create",
        query: {
          "passCode" : new_noBill
        }
      }))
    })
  })
}

exports.get_billingCreated = function(req, res, next){
  console.log("Pass Code: " + req.query.passCode)
  res.render('index', { title: 'Billings Created' , user: req.user });
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