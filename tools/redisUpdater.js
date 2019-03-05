var redis = require('redis');

var config = {
  host: 'redis-10694.c17.us-east-1-4.ec2.cloud.redislabs.com',
  port: 10694,
  password: 'loop'
}

var rClient = redis.createClient(config.port, config.host);

rClient.auth(config.password, function (err) {
});

rClient.on('connect', function () {
  var key = 'loop:users_all'
  var hashKey = 'e87eac37-c9f2-4588-ada7-2d4569a1bb13';
  var data = {
          "uuid": "e87eac37-c9f2-4588-ada7-2d4569a1bb13",
          "name": "Zoey",
          "username": "1111111111"
        }
  rClient.hset(key, hashKey, JSON.stringify(data));
});


/*
var key = 'maps:nearby:places';
  var long = '-87.672889';
  var lat = '42.059406';
  var data = {
      "id": "59b92978-b6fb-4cbf-a5cc-ce6eb0b48ebc",
      "title": "Henry Crown Gym",
      "thumbnail": "",
      "metrics": {
        "member_count": "25"
      },
      "location": {
        "lat": "42.059406",
        "long": "-87.672889"
      },
      "description": "Henry Crown Gym club is group of gym freaks! Join us if you are one of us..."
  };
  rClient.geoadd(key, long, lat, JSON.stringify(data), function() {
    console.log('Done');
  });
*/
