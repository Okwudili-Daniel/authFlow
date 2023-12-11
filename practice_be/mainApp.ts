import { Application, NextFunction, Request, Response } from "express";
import { HTTP } from "./utils/enum";
import { mainError } from "./error/mainError";
import { handleError } from "./error/handleError";
import auth from "./router/userRouter";

export const mainApp = (app: Application) => {
  try {
    app.use("/api/v1/auth", auth);
    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(HTTP.OK).json({
          message: "Welcome",
        });
      } catch (error) {
        return res.status(HTTP.BAD_REQUEST).json({
          message: "Invalid",
        });
      }
    });

    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new mainError({
          name: "Route Error",
          message: `This endpoint ${req.originalUrl} does not exist`,
          status: HTTP.BAD_REQUEST,
          success: false,
        })
      );
    });

    app.use(handleError);
  } catch (error) {
    return error;
  }
};
