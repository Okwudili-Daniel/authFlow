import { Application, Request, Response } from "express";

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
  } catch (error) {
    return error;
  }
};
