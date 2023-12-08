import { NextFunction, Request, Response } from "express";
import joi from "joi";
import { HTTP } from "../error/mainError";
import { ObjectSchema } from "joi";

export default (schema: ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error === undefined) {
      next();
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "validation error",
        data: error,
      });
    }
  };
};
