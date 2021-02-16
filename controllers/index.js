
const moment = require('moment');
let models = require("../models");
const Sequelize = require('sequelize');

countMail = function(jenis){
  return models.Mail.count({})
}

countClient = function(){
  return models.Client.count({})
}

countBill = function(){
  return models.Bill.count({})
}

countService = function(){
  // belom bisa
  return models.Service.findAll({
    attributes: [ 
      [Sequelize.fn('COUNT', Sequelize.col('types.bills.id')) ,'c']
    ],
    include: [{
      model: models.Type,
      attributes: [],
      include: [{
        model: models.Bill,
        attributes: [] // <----- Make sure , this should be empty
      }],
    }],
    group: ['id']
  }).catch(err=>{
    console.log(err)
  })
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

exports.get_index = function( req, res, next) {
  countBill().then(function(a){
    countClient().then(function(b){
      countMail().then(function(c){
        countService().then(function(countService){
          CountBill('Invoice').then(function(countINV){
            CountBill('Receipt').then(function(countRCP){
              CountMail('2').then(function(resIn){
                CountMail('1').then(function(resOut){
                  hasRoute = req.user.Role.routing.split(',')
                  // console.log(JSON.stringify(countService, null, 2))
                  data_byType = [
                    a,b,c
                  ]
                  data_byService = [
                    resIn+resOut
                  ]
                  for(i=0; i<countService.length; i++){
                    data_byService.push(objCount = JSON.stringify(countService[i]).slice(5).replace("}",""))
                  }
                  // console.log(data_byService)
                  res.render('index', { 
                    title: 'Dashboard', 
                    user: req.user,
                    alerts: 0,
                    rcp: countRCP,
                    inv: countINV,
                    mailIn: resIn,
                    mailOut: resOut,
                    month_year: moment().format("MMMM") + " " + moment().format("YYYY"),
                    timeH : moment().format('h'),
                    timeA: moment().format('a'),
                    data_byType : data_byType,
                    data_byService : data_byService,
                    // data_byService_lbl : data_byService_lbl
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

// cek receipt paling baru ditanggal berapa 

