const Joi = require("joi");

exports.employeesValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    phone: Joi.string()
      .pattern(/^[0-9]+$/)
      .min(10)
      .max(15)
      .required(),
    skill: Joi.string().max(50).required(),
    hired_date: Joi.date().iso().required(),
    email: Joi.string(),
    password: Joi.string().min(8)
  });

  return schema.validate(body, { abortEarly: false });
};
