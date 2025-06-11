const Joi = require("joi");

exports.ClientServiceEmployeeValidation = (body) => {
  const schema = Joi.object({
    employeeId: Joi.number().integer().required(),
    clientId: Joi.number().integer().required(),
    orderId: Joi.number().integer().required(),
  });

  return schema.validate(body, { abortEarly: false });
};
