
module.exports = function (config) {
  
  console.log(config);

  var knex = require('knex')(config.db);
  var db = require('bookshelf')(knex);
  return db;
};