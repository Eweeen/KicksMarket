import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validate = (schema: Joi.ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate({ ...req.body, ...req.params });

    if (error) return res.status(400).json({ message: error.message });

    req.body = value;
    next();
  };
};
