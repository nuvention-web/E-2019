var express = require('express');
var format = require('string-template');

module.exports = function (app) {

  return new express.Router()
  .get('/user/:userId/loops', userLoops)
  .get('/loop/:loopid/contents', loopContents)
  .get('/loops/nearly', getNearByLoops);

  function userLoops(req, res, next) {
    req.log.info('Inside userLoops functions');
    var userid = req.params.userId;
    app.dataRedis.get('users:' + userid + ':loops', function(err, data) {
      if(err) {
        next(err);
      } else {
        var resObj = { entities: [], count: 0 };
        if(data && data.length) {
          resObj.entities = data;
          resObj.count = data.length;
        }
        res.send(resObj);
      }
    });
  }

  function loopContents(req, res, next) {

  }

  function getNearByLoops(req, res, next) {
    req.log.info('Inside getNearByLoops functions');
    var lat = req.query.lat;
    var long = req.query.long;
    var radius = req.query.rad || 1;
    var unit = req.query.unit || 'mi';
    app.dataRedis.georadius('maps:nearby:places', long, lat, radius, unit, 'WITHCOORD', 'WITHDIST', function(err, data) {
      if(err) {
        next(err);
      } else {
        var entities = [];
        for(var i in data) {
          entities[i] = {};
          entities[i].title =  data[i][0];
          entities[i].distance =  data[i][1];
          entities[i].location =  {
            "long": data[i][2][0],
            "lat": data[i][2][1]
          };
        }
        var resObj = { entities: entities };
        resObj.count = entities.count;
        res.send(resObj);
      }
    });

  }

};
