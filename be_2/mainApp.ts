import { Application, NextFunction, Request, Response } from "express";
import { mainError } from "./error/mainError";
import { handlError } from "./error/handleError";
import { HTTP } from "./utils/enum";

export const mainApp = (app: Application) => {
  try {
    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "OK",
        });
      } catch (error) {
        return res.status(404).json({
          message: "Invalid",
        });
      }
    });

    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new mainError({
          name: "Router Error",
          message: `This endpoint ${req.originalUrl} does'nt exist`,
          status: HTTP.BAD_REQUEST,
          success: false,
        })
      );
    });

    app.use(handlError);
  } catch (error) {
    return error;
  }
};
