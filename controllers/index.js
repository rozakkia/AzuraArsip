
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
  return models.Service.findAll({
    attributes: ['id', 'name', [Sequelize.fn('COUNT', 'Type.id'), 'PostCount']],
    include: [models.Type]
    /*
    select si service
    select include type service


    attributes: ({
      include: [[Sequelize.fn("COUNT", Sequelize.col("types.ServiceId")), "serviceCounts"]] 
    }),
    include: [{
      model: models.Type, 
      attributes: []
    }]
    */
  }).catch(err=>{
    console.log(err)
  })
}

exports.get_index = function( req, res, next) {
  countBill().then(function(a){
    countClient().then(function(b){
      countMail().then(function(c){
        countService().then(function(d){
          hasRoute = req.user.Role.routing.split(',')
          console.log(JSON.stringify(d, null, 2));
          data_byType = [
            a,b,c
          ]
          res.render('index', { 
            title: 'Dashboard', 
            user: req.user,
            alerts: 0,
            timeH : moment().format('h'),
            timeA: moment().format('a'),
            data_byType : data_byType
          });
        });
      });
    });
  });
}

// cek receipt paling baru ditanggal berapa 

