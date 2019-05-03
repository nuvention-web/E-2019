var bunyan = require('bunyan');
var bformat = require('bunyan-format');
// Setup Core Route Handlers
var web = require('./web');
var utils = require('./utils');
// const api = require('./routes/api.js');

var app = {};

var formatOut = bformat({ outputMode: 'short' });
app.syslog = bunyan.createLogger({
  name: 'web', stream: formatOut, level: 'debug'
});

setupRedis(app);

function setupRedis(app) {
  var config = {
    host: 'redis-10694.c17.us-east-1-4.ec2.cloud.redislabs.com',
    port: 10694,
    password: 'loop'
  }
  var redisConnector = utils.redisConnector;
  redisConnector(config, app.syslog, 'data').getRedis()
  .then(function(client) {
    app.dataRedis = client;
    startServer();
  })
  .catch(function(err) {
    app.syslog.error('Fatal Error in connecting to Redis. Killing Process!');
    process.exit();
  })
  .done();
}

function startServer() {
  var webInstance = web(app);
  var port = process.env.PORT || 5000;

  var listner = webInstance.listen(port, function() {
    var port = listner.address().port;
    app.syslog.info('Listening: port ' + port);
    console.log("Server is listening");
  });
}
