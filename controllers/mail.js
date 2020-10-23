let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const { result } = require("lodash");

exports.get_mails = function(req, res, next) {
  return models.Mail.findAll().then(mails => {
    res.render('mail/index', { title: 'Archive Mails' , user: req.user, mails:mails });
  })
}

/* 
PENOMORAN
- INVOICE
AZURA LABS -> 2021/01-AI001
TAHUN/BULAN-AzurainvoiceNOMOR

AZURA STORE -> 01-SI001/2021
BULAN-StoreInvoiceNOMOR/TAHUN

- RECEIPT
AZURA LABS -> 2021/01.AR001
TAHUN/BULAN.AzuraReceiptNOMOR

AZURA STORE -> 01.SR001/2021
BULAN.StoreReceiptNOMOR/TAHUN


*/
exports.create_mail = function(req, res, next){
  
}