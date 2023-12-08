import express, { Application } from "express"
import cors from "cors"
import dotEnv from "dotenv"
import { dbConfig } from "./utils/dbConfig";
import { mainApp } from "./mainApp";
dotEnv.config();

const app: Application = express();
const port: string | number = process.env.PORT!

app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");

mainApp(app)

app.listen(port, () =>{
    console.clear()
    dbConfig()
})