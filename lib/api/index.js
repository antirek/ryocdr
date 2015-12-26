
var express = require('express');

var router = function (config) {

  var router = express.Router();

  router.use(require('./cdrs')(config));
  router.use(require('./recordings')(config));

  return router;
}

module.exports = router;