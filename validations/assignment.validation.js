const Joi = require("joi");

exports.assignmentsValidation = (body) => {
  const schema = Joi.object({
    clientId: Joi.number().integer().required(),
    adminId: Joi.number().integer().required(),
    serviceId: Joi.number().integer().required(),
    orderId: Joi.number().integer().required(),
  });
  return schema.validate(body, { abortEarly: false });
};
