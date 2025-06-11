const Joi = require("joi");

exports.ownersValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    shares: Joi.string().required(),
    join_date: Joi.date().iso().required(),
    email: Joi.string().email(),
    password: Joi.string().min(8).optional(),
  });

  return schema.validate(body, { abortEarly: false });
};
