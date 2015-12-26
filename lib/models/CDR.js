
var Bookshelf = require('../db');

var CDR = function (tablename) {
  return Bookshelf.Model.extend({
    tableName: tablename
  });
};

module.exports = CDR;