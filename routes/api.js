var express = require('express');
var format = require('string-template');

module.exports = function (app) {

  return new express.Router()
  .get('/user/{userid}/loops', userLoops)
  .get('/loop/{loopid}/contents', loopContents)
  .get('/loops/nearly', getNearByLoops);

  function userLoops(req, res, next) {

  }

  function loopContents(req, res, next) {

  }

  function getNearByLoops(req, res, next) {

  }

};
