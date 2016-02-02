var Joi = require('joi');

var ConfigSchema = Joi.object().keys({
    tz: Joi.string().required(),
    port: Joi.number().required(),
    recordspath: Joi.string().required(),
    db: Joi.object().keys({
      client: Joi.string().required(),
      connection: Joi.object().keys({
        host: Joi.string().required(),
        port: Joi.number().integer().min(1).max(65535).default(3306),
        user: Joi.string().required(),
        database: Joi.string().required(),
        password: Joi.string().allow('').required(),
        charset: Joi.string().required()
      }).required()
    }),
    cdr: Joi.object().keys({
      table: Joi.string().required()
    }).required(),
    auth: Joi.boolean().valid(true, false).default(false),
    username: Joi.string()
      .when('auth', {is: true, then: Joi.required().default('admin')}),
    password: Joi.string()
      .when('auth', {is: true, then: Joi.required().default('password')}),
    realm: Joi.string()
      .when('auth', {is: true, then: Joi.default('Ryo CDR')}),
});

module.exports = ConfigSchema;