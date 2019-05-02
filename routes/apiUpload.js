//for uploading datapoints from frontend
var express = require('express');
var format = require('string-template');
var addb = require('../utils').addb;

//given senderid, timestamp, receiverid(array of ids)
const senderid = '000001'
const timestamp = '1556764900000'
const receiverid = ['000091', '000092', '000093']
var dataObject = []
var i = 0;
for(i = 0; i < receiverid.length; i++){
  var eachItem ={}
  eachItem.name = senderid;
  eachItem.datapoints = [[timestamp, 1]]
  eachItem.tags = {
    "receiver": receiverid[i]
  }
  dataObject.push(eachItem)
}


module.exports = function (app) {
    return new express.Router()
    .get('/loops/users/heatmap2', getHeatMap);

    function getHeatMap(req, res, next) {
      options = dataObject
      // res.json(dataObject)
    
      addb.addTS(options, function(err, res2){
        result = res2;//the result from the KairosDB and the data is of format of KairosDB
        res.send('go to kairosDB to check')
      });
    }
};
