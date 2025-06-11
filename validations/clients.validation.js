const Joi = require("joi");

exports.clientsValidation = (body) => {
  const schema = Joi.object({
    full_name: Joi.string().min(3).max(100).required(),
    phone: Joi.string()
      .min(10)
      .max(15)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).optional(),
    address: Joi.string(),
  });

  return schema.validate(body, { abortEarly: false });
};
