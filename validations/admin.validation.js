const Joi = require("joi");

exports.adminsValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(10).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(8),
    activation_link: Joi.string(),
  });

  return schema.validate(body, { abortEarly: false });
};
