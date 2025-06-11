const Joi = require("joi");

exports.statusValidation = (body) => {
  const schema = Joi.object({
    status: Joi.string().max(50).required(),
  });

  return schema.validate(body, { abortEarly: false });
};
