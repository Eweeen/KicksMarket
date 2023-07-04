import Joi from "joi";

export const validateShoe = Joi.object({
  id: Joi.string().required(),
});

export const validateBrand = Joi.object({
  name: Joi.string().required(),
});

const size = Joi.object({
  size: Joi.number().required(),
  quantity: Joi.number().required(),
});

export const validateCreateShoes = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  brand: Joi.string().required(),
  hidden: Joi.boolean().required(),
  image: Joi.string().required(),
  sizes: Joi.array().items(size).required(),
});

export const validateUpdateShoes = Joi.object({
  id: Joi.string().required(),
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  brand: Joi.string(),
  hidden: Joi.boolean(),
  image: Joi.string(),
  sizes: Joi.array().items(size),
});