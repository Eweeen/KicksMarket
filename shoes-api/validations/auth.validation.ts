import Joi from "joi";

export const validateSignUp = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  birthdate: Joi.date().required(),
});

export const validateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
