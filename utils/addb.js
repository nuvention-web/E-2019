const superagent = require('superagent');

function addTS(options, callback) {
    if(!options) {
        callback({ 'message': 'Necessary parameters are missing.' });
    } else {
        superagent.post('http://3.89.40.83:8082/api/v1/datapoints')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(options)
        .end(function(err) {
          if (err) { callback(err); }
          else { callback(null); }
        });
    }
}

module.exports = {
    addTS: addTS
};
