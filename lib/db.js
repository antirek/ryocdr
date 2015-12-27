
module.exports = function (config) {  
  var knex = require('knex')(config.db);
  var db = require('bookshelf')(knex);
  return db;
};