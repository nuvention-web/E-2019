var express = require('express');
var format = require('string-template');
const api = express();
var tsdb = require('../utils').tsdb;

module.exports = function (app) {
    return new express.Router()
    .get('/loops/users/heatmap', getHeatMap)
    .get('/loops/users/heatmap2', getHeatMap2);

    function getHeatMap2(req, res, next) {
      req.log.info('Inside getHeatMap2 function.');
      var senderid = '000001'
      var timestamp = '1556764900000'
      var receiverid = ['000091', '000092', '000093']
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

      options = dataObject
      // res.json(dataObject)

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
