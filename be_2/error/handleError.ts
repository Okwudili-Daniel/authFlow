import { NextFunction, Request, Response } from "express";
import { mainError } from "./mainError";

const builderErrorMessage = (err: mainError, res: Response) => {
  return res.status(404).json({
    name: err.name,
    message: err.message,
    success: err.success,
    status: err.status,
    stack: err.stack,
    error: err,
  });
};

export const handlError = (
  err: mainError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return builderErrorMessage(err, res);
};
