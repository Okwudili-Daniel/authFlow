import { NextFunction, Request, Response } from "express";
import { HTTP } from "./enum";

export const authorized = (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.session.isAuth) {
      next();
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Invalid authorization",
      });
    }
  } catch (error) {
    return error;
  }
};
