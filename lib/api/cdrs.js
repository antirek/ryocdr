var _ = require('lodash');
var moment = require('moment');
var Promise = require('bluebird');
var Bookshelf = require('../db');

var path = require('path');
var fs = require('fs');
var glob = require('glob');
var express = require('express')

var r = function (config) {
  var router = express.Router();
  var CDR = require('../models/CDR')(config);

  router.get('/cdrs', function (req, res) {
    var page = parseInt(req.query.page, 10);
    var perPage = parseInt(req.query.per_page, 10);

    var filter = function () {
      this.where(function () {
        if (req.query.number) {
          var like = ['%', req.query.number, '%'].join('');
          this.where('src', 'like', like)
              .orWhere('dst', 'like', like);
        } else {
          this.whereRaw('1=1');
        }
      }).andWhere(function () {
        if (req.query.status) {
          this.whereIn('disposition', req.query.status);
        } else {
          this.whereRaw('1=1');
        }
      }).andWhere(function () {
        var tz = config.tz;
        var df = 'YYYY-MM-DD HH:mm:ss'; // mysql format

        var start = req.query.start
          ? moment(req.query.start).utcOffset(tz)
          : moment().utcOffset(tz).startOf('day');

        var end = req.query.end
          ? moment(req.query.end).utcOffset(tz)
          : moment().utcOffset(tz).endOf('day');

        this.whereBetween('calldate', [start.format(df), end.format(df)]);
      });

    };

    var countPromise = Bookshelf.knex(config.cdr.table).count('*');
    filter.call(countPromise);
    
    var dataPromise = CDR.collection()
      .query(filter)    
      .query(function (qb) {
        if (page && perPage) {
          qb.offset((page - 1) * perPage);
          qb.limit(perPage);
        }
        qb.orderBy(req.query.sort_by || 'calldate', req.query.order || 'desc');
      })
      .fetch();

    Promise.all([countPromise, dataPromise]).spread(function (count, collection) {
      var result;    
      var cnt = count[0]['count(*)'];
      result = [{total_entries: cnt}, collection.toJSON()];
      res.json(result);
    });
  });

  return router;
}

module.exports = router;
