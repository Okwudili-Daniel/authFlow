import { mainError, HTTP } from "./mainError"
import {NextFunction, Request, Response } from "express"


const viewError = (
    err: mainError,
    res: Response
) =>{
    try {
        return res.status(HTTP.BAD_REQUEST).json({
            name: err.name,
            message: err.message,
            status: err.status,
            success: err.success,
        })
    } catch (error) {
        return error
    }
}

export const errorHandler = (err: mainError,
    req: Request,
    res: Response,
    next: NextFunction) =>{
    try {
       return viewError(err, res) 
    } catch (error) {
        return error
    }
}