var _ = require('lodash');
var express = require('express');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var config = require('./lib/config');

var app = express();
app.use(morgan('dev')); // logger
app.use(compress());
app.use(bodyParser());
app.use(cookieParser());

app.use('/api', require('./lib/api'));
app.use('/bower_components', express["static"](__dirname + "/bower_components"));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 9030);