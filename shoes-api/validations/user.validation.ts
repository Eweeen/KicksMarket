import Joi from "joi";

export const validateId = Joi.object({
  user_id: Joi.string().required(),
  id: Joi.string().required(),
});

export const validateUser = Joi.object({
  user_id: Joi.string().required(),
});

export const validateCart = Joi.object({
  user_id: Joi.string().required(),
  id: Joi.string().required(),
  size: Joi.number(),
  quantity: Joi.number().min(1).max(5),
});

export const validatePassword = Joi.object({
  user_id: Joi.string().required(),
  password: Joi.string().min(8).required(),
});
