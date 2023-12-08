import { connect } from "mongoose";
import dotEnv from "dotenv"
dotEnv.config();

const URL:string | undefined = process.env.DATABASE_STRING!

export const dbConfig = () =>{
    try {
        connect("mongodb://127.0.0.1:27017/flowDB").then(() =>{
            console.log("DB connection established")
        })
    } catch (error) {
        return error
    }
}