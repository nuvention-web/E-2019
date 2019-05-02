var express = require('express');
var format = require('string-template');
const api = express();
var tsdb = require('../utils').tsdb;

module.exports = function (app) {
    return new express.Router()
    .get('/loops/users/heatmap', getHeatMap);


    function getHeatMap(req, res, next) {
      options = {
        "metric": "prerak",
        "start_rel": "1_Y",
        "tags": {
          "type": ["human"]
        },
        "group_by": "type"
     }
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
