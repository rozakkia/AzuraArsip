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

Rupiah = function(num){
  if (num!='null'){
    var	reverse = num.toString().split('').reverse().join(''),
    rupiah 	= reverse.match(/\d{1,3}/g);
    rupiah	= rupiah.join('.').split('').reverse().join('');

    return "Rp. " + rupiah + ",-"
  }
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
          jenis: '3'
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
      oF.U.push(type.inisial)   
      newArrayNum[oF.U[0]] = oF.U[1]
    }
    if(oF.YYYY[0] != -1){
      oF.YYYY.push(year)
      newArrayNum[oF.YYYY[0]] = oF.YYYY[1]
    }
    if(oF.MM[0] != -1){
      if (month.length == 1){
        monthVar = '0' + month 
      }else {
        monthVar = month
      }
      oF.MM.push(monthVar)
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
        res.send("The Format Number is Error, ID is unavailable! 1")
      }
    }else if (numDetail == 2){
      // if(oF.MM[1] == oF.last_MM || oF.MV[1] == oF.last_MV){
      //   newestID = Number(oF.last_ID) + 1
      //   if(String(newestID).length == 1){
      //     countNewestID = "00" + newestID
      //   }else if(String(newestID).length == 2){
      //     countNewestID = "0" + newestID
      //   }else if(String(newestID).length == 3){
      //     countNewestID = newestID
      //   }else{
      //     res.send("Error Asli")
      //   }
      //   oF.ID.push(countNewestID)
      //   newArrayNum[oF.ID[0]] = oF.ID[1]
      // }else{
      //   oF.ID.push("001")
      //   newArrayNum[oF.ID[0]] = oF.ID[1]
      // }
      if(oF.ID[0] != -1){
        if(oF.MM[0] != -1){
          if(oF.MM[1] == oF.last_MM){
            isPlusOne = true
          }else{
            isPlusOne = false
          }
        }else if (oF.MV[0] != -1){
          if(oF.MV[1] == oF.last_MV){
            isPlusOne = true
          }else{
            isPlusOne = false
          }
        }else{
          res.send("Error")
        }
        if(isPlusOne === true){
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
        }else if(isPlusOne === false){
          oF.ID.push("001")
          newArrayNum[oF.ID[0]] = oF.ID[1]
        }else{
          res.send('ERROR PlusONE')
        }
      }else{
        res.send("The Format Number is Error, ID is unavailable!")
      }
    }else{
      res.send("Galat Error")
    }
    newNum = (newArrayNum.toString()).replace(/,/g , '/')
    console.log(oF)
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
    },{
      model:  models.Client,
      include:[models.Bank_Account]
    }, models.Bank_Account, {
      model: models.Type,
      include: [models.Template]
    }]
  }).then(resultGetBill => {
    return models.Bank_Account.findAll({
      where:{
        ClientId: null
      }
    }).then(resultBank => {
      if (resultGetBill.stat < 2) {
        var d = new Date(resultGetBill.createdAt)
        dateCreate = d.getDate() + "-" +( d.getMonth() + 1) + "-" + d.getFullYear()
      }else{
        if(resultGetBill.Type.Template.jenis == 1){
          c = resultGetBill.keterangan_store.split("_") 
          dateCreate = c[7]
        }else if (resultGetBill.Type.Template.jenis == 2){
          var d = new Date(resultGetBill.createdAt)
          dateCreate = d.getDate() + "-" +( d.getMonth() + 1) + "-" + d.getFullYear()
        }
      }
      console.log(d)
      console.log(resultGetBill.createdAt)
      console.log(dateCreate)
      console.log(resultGetBill.createdAt)
      res.render('billing/detail', { 
        title: 'Billing Created' , 
        user: req.user, 
        result:resultGetBill,
        dateCreate: dateCreate,
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
  id_bill = decoded(req.body.idBill)
  return models.Bill_Detail.create({
    keterangan: req.body.keterangan,
    jumlah: req.body.jumlah,
    harga: req.body.harga,
    BillId: id_bill
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

exports.create_main = function(req, res, next){
  store_detail = req.body.nama + '_' + req.body.url + '_' + req.body.jenis + '_' + req.body.bank + '_' + req.body.total + '_' + req.body.produk + '_' + req.body.alamat + '_' + req.body.dFrom + '_' + req.body.dTo
  return models.Bill.update({
    keterangan_store: store_detail,
    stat: '2'
  },{
    where:{
      id: decoded(req.body.idBill)
    }
  }).then(result=>{
    var alerts = {};
    return res.send(alerts)
  })
}

exports.get_print_detail = function (req, res, next){
  //MAX 8 DETAILS
  const html2pug = require('html2pug')
  const pug = require('pug')
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
    },{
      model:  models.Client,
      include:[models.Bank_Account, models.Client_Contact]
    }, models.Bank_Account, {
      model: models.Type,
      include: [models.Template,models.Service]
    }]
  }).then(data => {
    if (data.keterangan_store == null){
      store_result = ['null','null','null','null','null']
    }else{
      store_result = data.keterangan_store.split('_')
    }
    return models.Bank_Account.findOne({
      where: {
        id: store_result[3]
      }
    }).then(data_bank => {
      return models.Bank_Account.findAll({
        where: {
          ClientId: null
        }
      }).then(list_bank =>{
        if(data_bank == null){
          data_bank = {
            bank_name: "null",
            bank_num: "null",
            bank: "null"
          }
        }
        headerCSS=`<head><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,400i,600,700"><link rel="stylesheet" href="/assets/css/codebase.css"></head>`
        printable = (req.query.print == 'true') ? "<script type='text/javascript'>window.print()</script>" : ""
        
        
        if(data.Type.Template.isi.indexOf('#{B_bank_list')>-1){
          function dataBankList(list){
            output= ''
            for(i=0; i < list.length; i++){
              output += "<div class='col-6'><h5 class='font-w700 mb-0'>" + list[i].bank + " - " + list[i].bank_num + "</h5><p class='text-muted font-w400 mt-0 mb-0'> An. " + list[i].bank_name + "</p></div>"
            }
            return output
          }
          console.log(JSON.stringify(dataBankList(list_bank), null,2))
          bankListMain = "<div class='row mx-30'>"+ dataBankList(list_bank) +"</div>"
          codeUtama_wBankList = data.Type.Template.isi.replace('#{B_bank_list}',bankListMain)
        }else{
          codeUtama_wBankList = data.Type.Template.isi
        }

        if(codeUtama_wBankList.indexOf('#{USE_details_subs')>-1){
          Kdetails_Jumlah = codeUtama_wBankList.indexOf('d_jumlah')
          Kdetails_Deskripsi = codeUtama_wBankList.indexOf('d_deskripsi')
          Kdetails_Harga = codeUtama_wBankList.indexOf('d_harga')
          Kdetails_Total = codeUtama_wBankList.indexOf('d_total')
          Karray = [Kdetails_Deskripsi,Kdetails_Jumlah,Kdetails_Harga,Kdetails_Total].sort()
          KdataSort = Array(data.Bill_Details.length).fill(0)
          function data_Details(data){ 
            rowFull = ''
            var rowTotal = 0
            if(data.Bill_Detail_Subs = undefined){
              detail = data.Bill_Details.Bill_Detail_Subs
            }else{
              detail = ''
            }
            for(i=0; i<data.Bill_Details.length;i++){
              rowDetails = ''
              rowSubs = ''
              rowDetails = "<tr><td>" + data.Bill_Details[i].jumlah + "</td><td>" + data.Bill_Details[i].keterangan + "</td><td>" + Rupiah(data.Bill_Details[i].harga) + "</td><td>" + Rupiah(data.Bill_Details[i].harga*data.Bill_Details[i].jumlah) + "</td></tr>" 
              
              for(j=0; j<data.Bill_Details[i].Bill_Detail_Subs.length;j++){
                rowSubs += "<tr><td></td><td><span class='text-muted'>" + data.Bill_Details[i].Bill_Detail_Subs[j].deskripsi + "</span></td><td></td><td></td></tr>"
              }
              rowFull += rowDetails+rowSubs
              rowTotal += Number(+data.Bill_Details[i].harga * +data.Bill_Details[i].jumlah)
            }
            return {rowFull, rowTotal}
          }
          detailsRow = data_Details(data)
          baseDetails = "<table class='table table-borderless'>" + detailsRow.rowFull + "</table>"
          console.log(JSON.stringify(data, null,2))
          console.log(baseDetails)
          
        }
        
        if(data.Type.Template.jenis == '1'){
          codeUtama = codeUtama_wBankList
          store_totalFee = store_result[4]
        }else if(data.Type.Template.jenis == '2'){
          codeUtama = codeUtama_wBankList.replace('#{USE_details_subs-d_jumlah,d_deskripsi,d_harga,d_total}',baseDetails)
          store_totalFee = detailsRow.rowTotal
        }
        

        pugfile = html2pug(headerCSS +  codeUtama + printable , { tabs: true })

        
        
        res.send(pug.render(pugfile, {
          D_noID : data.no_bill,
          D_keterangan: data.keterangan,
          D_date: data.tgl_dikirim,
          T_alias: data.Type.alias,
          T_uniqueCode: data.Type.unique_code,
          S_name: data.Type.Service.name,
          S_unique: data.Type.Service.unique,
          B_an: data.Bank_Account.bank_name,
          B_bank: data.Bank_Account.bank,
          B_num_bank: data.Bank_Account.bank_num, 
          C_name: data.Client.company_name, 
          C_contact: data.Client.Client_Contact,
          store_name: store_result[0], 
          store_norek: data_bank.bank_num,
          store_an: data_bank.bank_name,
          store_bank: data_bank.bank,
          store_plan: store_result[2], 
          store_url: store_result[1],
          store_fee: Rupiah(store_result[4]),
          store_totalfee: Rupiah(store_totalFee),
          store_jenis: store_result[5],
          store_alamat: store_result[6],
          D_createdAt: store_result[7],
          D_date: store_result[8],
          USE_details: data.Bill_Detail,
          printable : req.query.print
        }))
      })
    })
  })
}

exports.update_main = function(req, res, next){
  store_detail = req.body.nama + '_' + req.body.url + '_' + req.body.jenis + '_' + req.body.bank + '_' + req.body.total + '_' + req.body.produk + '_' + req.body.alamat + '_' + req.body.dFrom + '_' + req.body.dTo
  return models.Bill.update({
    keterangan_store: store_detail
  },{
    where:{
      id: decoded(req.body.idBill)
    }
  }).then(result=>{
    var alerts = {};
    return res.send(alerts)
  })
}

exports.print_data = function(req, res, next){
  return models.Bill.update({
    stat:"3"
  },{
    where:{
      id: decoded(req.body.idBill)
    }
  }).then(result=>{
    var alerts = {};
    return res.send(alerts)
  })
}