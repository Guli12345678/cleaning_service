const Joi = require("joi");

exports.paymentsValidation = (body) => {
  const schema = Joi.object({
    payment_method: Joi.string()
      .valid("cash", "card")
      .required(),
    payment_date: Joi.date().iso().required(),
    payment_status: Joi.string()
      .valid("pending", "completed", "rejected")
      .required(),
    orderId: Joi.number().integer().required(),
    clientId: Joi.number().integer().required(),
    amount: Joi.number().positive().required(),
  });

  return schema.validate(body, { abortEarly: false });
};
