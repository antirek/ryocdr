var express = require('express');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var auth = require('http-auth');

var Joi = require('joi');
var ConfigSchema = require('./lib/configSchema');

var app = function (config) {
  var app = null;

  var validate = function (callback) {
    Joi.validate(config, ConfigSchema, callback);
  };

  var prepare = function (config) {

    var basic = auth.basic({
        realm: config.realm
      }, function (username, password, callback) { // Custom authentication method. 
        callback(username === config.username && password === config.password);
      }
    );

    app = express();
    app.use(morgan('dev')); // logger
    app.use(compress());
    app.use(bodyParser());
    app.use(cookieParser());
    if (config.auth) app.use(auth.connect(basic));

    app.use('/api', require('./lib/api')(config));
    app.use('/bower_components', express.static(__dirname + "/bower_components"));

    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });

    app.use(express.static(__dirname + '/public'));
  };

  validate(function (err, config) {
    if (!err) {
      prepare(config);
    } else {
      console.log(err);
    }
  });

  var start = function () {
    if (app) app.listen(config.port);
  };

  return {
    start: start
  };
};

module.exports = app;