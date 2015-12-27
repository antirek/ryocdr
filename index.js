var express = require('express');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var Joi = require('joi');
var ConfigSchema = require('./lib/configSchema');

var app = function (config) {
  var app = null;

  var validate = function (callback) {
    Joi.validate(config, ConfigSchema, callback);
  };

  var prepare = function () {
    app = express();
    app.use(morgan('dev')); // logger
    app.use(compress());
    app.use(bodyParser());
    app.use(cookieParser());

    app.use('/api', require('./lib/api')(config));
    app.use('/bower_components', express.static(__dirname + "/bower_components"));

    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });

    app.use(express.static(__dirname + '/public'));
  };

  validate(function (err) {
    if (!err) {
      prepare();
    } else {
      console.log(err);
    }
  });

  var start = function () {
    app.listen(config.port);
  }

  return {
    start: start
  };
};

module.exports = app;