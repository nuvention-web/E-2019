var express = require('express');
var format = require('string-template');
const api = express();
var tsdb = require('../utils').tsdb;
const querystring = require('querystring');

module.exports = function (app) {
    return new express.Router()
    .get('/loops/users/heatmap', getHeatMap)
    .get('/loops/users/data-upload/', dataUpload);

    function dataUpload(req, res, next) {
      req.log.info('Inside dataUpload function.');
      var senderids = req.query.senderid
      var timestamps = req.query.timestamp
      var receiverids = JSON.parse(req.query.receiverid)
      var dataObject = []
      var i = 0;
      for(i = 0; i < receiverids.length; i++){
        var eachItem ={}
        eachItem.name = senderids;
        eachItem.datapoints = [[timestamps, 1]]
        eachItem.tags = {
          "receiver": receiverids[i]
        }
        dataObject.push(eachItem)
      }

      options = dataObject
      // res.send(dataObject)

      tsdb.addTS(options, function(err, res2){
        result = res2;//the result from the KairosDB and the data is of format of KairosDB
        res.send('go to kairosDB to check')
      });
    };


    function getHeatMap(req, res, next) {
      var options = {
        "metric": "prerak",
        "start_rel": "1_Y",
        "tags": {
          "type": ["human"]
        },
        "group_tag": "type"
      };
      tsdb.queryTS(options, function(err, res2){
        result = res2;//the result from the KairosDB and the data is of format of KairosDB
        res.send(result)
      });
    }



    //function transfering JSON data queried from KairosDB
    //to JSON format that front end can read
    // function transformer(data) {
    // heat_data = [];
    // return heat_data
    // }


    // by getting the data with parameters userid, journey, and relative_start_time
    // the client end can get the data of that is readable for the heatmap.
    // api.get('/api/loops/users/heatmap/:userid/:journey/:rel_start_time', function(req, res){
    // tsdb(options, function(err, res){
    // result = res;//the result from the KairosDB and the data is of format of KairosDB
    // res.json(transformer())
    // })
    // })

};
