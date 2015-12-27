var configfile = process.env.VIOLA_CDR_CONFIG || './config';
var config = require(configfile);

var App = require('./index');

var app = new App(config); 
app.start();