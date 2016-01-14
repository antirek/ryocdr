#!/usr/bin/nodejs

var configfile = process.env.VIOLA_CDR_CONFIG || './config';

var fileExists = require('file-exists');
var conf = configfile + '.js';

if (fileExists(conf)) {
    var config = require(configfile);
    var App = require('./index');

    var app = new App(config); 
    app.start();
} else {
  console.log('no configfile:', conf);
}