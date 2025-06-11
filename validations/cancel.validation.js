const Joi = require("joi");

exports.cancelValidation = (body) => {
  const schema = Joi.object({
    clientId: Joi.number().integer().required(),
    serviceId: Joi.number().integer().required(),
    cancel_date: Joi.date().iso().required(),
    reason: Joi.string().required(),
    refund: Joi.string(),
  });

  return schema.validate(body, { abortEarly: false });
};
