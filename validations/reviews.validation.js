const Joi = require("joi");

exports.reviewsValidation = (body) => {
  const schema = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().max(500).optional(),
    employeeId: Joi.number().integer().required(),
    clientId: Joi.number().integer().required(),
  });

  return schema.validate(body, { abortEarly: false });
};
