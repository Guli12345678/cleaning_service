const Joi = require("joi");

exports.servicesValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
    price: Joi.number().positive().required(),
    ownerId: Joi.number().integer().required(),
  });

  return schema.validate(body, { abortEarly: false });
};
