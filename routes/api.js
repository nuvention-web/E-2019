var express = require('express');
var format = require('string-template');

module.exports = function (app) {

  return new express.Router()
  .get('/user/:userId/loops', userLoops)
  .get('/loop/:loopid/contents', loopContents)
  .get('/loops/nearly', getNearByLoops);

  function userLoops(req, res, next) {
    req.log.info('Inside userLoops functions!!');
    var userid = req.params.userId;
    app.dataRedis.get('users:' + userid + ':loops', function(data, err) {
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

  }

};
