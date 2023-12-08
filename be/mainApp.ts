import { Application, NextFunction, Request, Response } from "express";
import { HTTP, mainError } from "./error/mainError";
import { errorHandler } from "./error/errorHandler";
import ejs from "ejs"
import auth from "./router/userRouter"

export const mainApp = (app: Application) =>{
    try {
        app.get("/api/v1/auth", auth)
        app.set("view engine", "ejs");

        app.get("/view", (req: Request, res: Response) =>{
            try {

                const user= {
                    userName: "Peter",
          email: "peter@test.com",
          _id: "445mpo099",
          token: "32556",
                }
                 res.render("index.ejs");
            } catch (error) {
                return res.status(404).json({
                    message: "Error loading"
                })
            }
        })
        app.get("/", (req: Request, res: Response) => {
            try {
                return res.status(200).json({
                    message: "Hello"
                })
            } catch (error) {
                return res.status(404).json({
                    message: "Invalid"
                })
            }
        })

        app.all("*", (req: Request, res: Response, next: NextFunction) => {
            next(
                new mainError({
                    name: "Route Error",
                    message: `This route ${req.originalUrl} does not exist`,
                    status: HTTP.BAD_REQUEST,
                    success: false
                })
            )
        })

        app.use(errorHandler)

    } catch (error) {
        return error
    }
}