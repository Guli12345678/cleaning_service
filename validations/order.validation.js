const Joi = require("joi");

exports.ordersValidation = (body) => {
  const schema = Joi.object({
    date: Joi.date().iso().required(),
    total_price: Joi.number().positive().required(),
    statusId: Joi.number().integer().required(),
    clientId: Joi.number().integer().required(),
    serviceId: Joi.number().integer().required(),
  });

  return schema.validate(body, { abortEarly: false });
};
