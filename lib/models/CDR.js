var CDR = function (config) {

  var Bookshelf = require('../db')(config);

  return Bookshelf.Model.extend({
    tableName: config.cdr.table
  });
};

module.exports = CDR;