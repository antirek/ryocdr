var Joi = require('joi');

var ConfigSchema = Joi.object().keys({
    web: Joi.object().keys({
      port: Joi.number().integer().min(1).max(65535).required(),
      host: Joi.string().default('0.0.0.0')
    }),
    ami: Joi.object().keys({
      host: Joi.string().required(),
      port: Joi.number().integer().min(1).max(65535).required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      version: Joi.string().required()
    }).required(),
    baseUrl: Joi.string().required()
});

module.exports = ConfigSchema;