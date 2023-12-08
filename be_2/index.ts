import express from "express";
import cors from "cors";
import env from "dotenv"
env.config()

const app = express();
const port: number = parseInt(process.env.PORT!)

app.use(express.json())
app.use(cors())

app.listen(port, () =>{
    console.clear()
    console.log()
    console.log("Connected")
})