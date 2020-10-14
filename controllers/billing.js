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
    include: [models.Client],
    order : [
      ['createdAt', 'DESC']
    ]
  }).then(resultGetBills => {
    return models.Client.findAll({}).then(resultClients => {
      res.render('billing/index', { title: 'Billings Payment' , user: req.user, resultGetBills:resultGetBills, resultClients:resultClients }); 
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
    encoded = Buffer.from(new_noBill).toString('base64');
    return models.Bill.create({
      no_bill: new_noBill,
      jenis: req.body.typebill,
      ClientId: req.body.idclient,
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
  })
}


exports.get_billingCreated = function(req, res, next){
  decode = Buffer.from(req.query.passCode, 'base64').toString('ascii')
  return models.Bill.findOne({
    where: [{
      no_bill : decode
    }],
    include: [models.Client]
  }).then(resultGetBill => {
    return models.Detail_Bill.findAll({
      where: {
        BillId: resultGetBill.id
      }
    }).then(result =>{
      res.render('billing/create', { title: 'Billing Created' , user: req.user, bill_detail:resultGetBill, bills_detail:result });
    })
  })
}

exports.create_detail = function(req, res, next){
  return models.Detail_Bill.create({
    deskripsi: req.body.deskripsi,
    jumlah: req.body.jumlah,
    harga: req.body.harga,
    BillId: req.body.bill_id
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

exports.delete_detail = function(req, res, next){
  return models.Detail_Bill.destroy({
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