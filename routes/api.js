var express = require('express');
var format = require('string-template');

module.exports = function (app) {

  return new express.Router()
  .get('/user/:userId/loops', userLoops)
  .get('/loop/:loopid/contents', loopContents)
  .get('/loops/nearby', getNearByLoops);

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
// Returns the top contents from an associated loop
  function loopContents(req, res, next) {
    req.log.info('Inside loopContents function');
    var loopId = req.params.loopid;
    console.log(loopId);
  }

  function getNearByLoops(req, res, next) {
    req.log.info('Inside getNearByLoops functions');
    var err;
    var lat = req.query.lat;
    var long = req.query.long;
    if(lat && long) {
      var acceptedValues = ['m', 'mi', 'km', 'ft'];
      var radius = req.query.rad || 1;
      var unit = req.query.unit ? req.query.unit.toLowerCase() : 'mi';
      if(acceptedValues.indexOf(unit) > -1) {
        app.dataRedis.georadius('maps:nearby:places', long, lat, radius, unit, 'WITHCOORD', 'WITHDIST', function(err, data) {
          if(err) {
            next(err);
          } else {
            var entities = [];
            for(var i in data) {
              entities[i] = JSON.parse(data[i][0]);
              entities[i].distance =  data[i][1];
              entities[i].location =  {
                "longitude": data[i][2][0],
                "latitude": data[i][2][1]
              };
            }
            var resObj = { entities: entities };
            resObj.count = entities.count;
            res.send(resObj);
          }
        });
      } else {
        err = {
          statusCode: 400, message: 'Bad Request! Unit: ' + unit + ' is not supported.'
        };
        next(err);
        }
    } else {
      err = {
        statusCode: 400, message: 'Bad Request! Query params lat and long and not defined'
      };
      next(err);
    }
  }
};
