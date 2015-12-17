var moment = require('moment');
var path = require('path');
var glob = require('glob');
var _ = require('lodash');

var CDR = require('../models/CDR');

var router = require('express').Router();

router.param(function (name, fn) {
  if (fn instanceof RegExp) {
    return function (req, res, next, val) {
      var captures = fn.exec(String(val));
      if (captures) {
        req.params[name] = captures;
        next();
      } else {
        next('route');
      }
    };
  }
});

router.param('id', /^\d+$/);

router.get('/recordings/:id', function (req, res) {
  CDR.forge({id: req.params.id}).fetch().then(function (cdr) {
    var date = moment(cdr.get('calldate'));
    var filepath = path.join('/var/records', cdr.get('record'));
    console.log('filepath', filepath);
    glob(filepath, function (er, files) {
      if (_.isArray(files) && files.length) {
        var filename = [date.format('YYYY-MM-DD-HHmm'), cdr.get('src'), cdr.get('dst')].join('_');
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.sendfile(files[0]);
      } else {
        res.status(404);
        res.json({error: 'file not found'});
      }
    });
  });
});

module.exports = router;
