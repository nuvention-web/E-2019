var express = require('express');
var format = require('string-template');
const api = express();
var tsdb = require('../utils').tsdb;
const querystring = require('querystring');

module.exports = function (app) {
    return new express.Router()
    .get('/loops/users/heatmap/', getHeatMap)
    .post('/loops/users/data-upload/', dataUpload);

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
      // var options = {
      //   "metric": "prerak",
      //   "start_rel": "1_Y",
      //   "tags": {
      //     "type": ["human"] 
      //   },
      //   "group_tag": "type"
      // };
      // var options = {
      //   "metric": "000001",
      //   "start_rel": "1_Y",
      //   "tags": {
      //     "receiver": journeyFriends//contact list in a journey
      //   },
      //   "group_tag": "receiver"
      // };

      var senderids = req.query.senderid
      var timeranges = req.query.timerange
      var journeyFriends = JSON.parse(req.query.journeyFriends)

      // const journeyFriends = ["000091","000092","000093","000094","000095","000096","000097","000098"] //for test
      var options = {
        "metric": senderids,
        "start_rel": timeranges,
        "tags": {
          "receiver": journeyFriends//contact list in a journey
        },
        "group_tag": "receiver"
      };
      tsdb.queryTS(options, function(err, res2){
        var result = res2;//the result from the KairosDB and the data is of format of KairosDB
        //transfer the format of KairosDB query to Heatmap JSON format
        var nFriends = result.queries[0].results
        var touchList = nFriends.map(function(item) {
          return {
            "receiver": item.tags.receiver[0],
            "connections": Object.keys(item.values).length
          }
        })
        //total number of friends in the journey to display, row column numbers
        var n = journeyFriends.length
        var nRow = Math.ceil(Math.sqrt(n / 2))
        var nCol = Math.ceil(n / nRow)
        
        //construct dataset
        var data = []
        var i = 0
        var j = 0
        var iter = 0
        for(i = 0; i < nRow; i++){
          for(j = 0; j < nCol; j++){
            if (iter < n){
              var eachItem ={}
              eachItem.displayvalue = touchList[iter].receiver;
              eachItem.value = touchList[iter].connections;
              eachItem.rowid = i+1;
              eachItem.columnid = j+1;
              data.push(eachItem);
              iter = iter + 1
            }
          }
        }

        //construct rows and columns
        var row = []
        var i = 0
        for(i = 0; i < nRow; i++){
          var eachItem ={}
          eachItem.id = i+1;
          eachItem.label = "";
          row.push(eachItem);
        }
        var column = []
        var j = 0
        for(j = 0; j < nCol; j++){
          var eachItem ={}
          eachItem.id = j+1;
          eachItem.label = "";
          column.push(eachItem);
        }

        //aggregate all to one object for front end
        heatMapData = {
          "rows":{
            "row": row
          },
          "columns":{
            "column": column
          },
          "dataset":[{
            "data": data
          }]
        }
        res.json(heatMapData)
      });
    }
};
