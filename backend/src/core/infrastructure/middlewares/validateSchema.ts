import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

export const validateRequest = (schema: yup.ObjectSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      await schema.validate(payload);
      next();
    } catch (error) {
      res.status(400).json({
        message: "Validation Error",
        errors: (error as yup.ValidationError).errors,
      });
    }
  };
};
