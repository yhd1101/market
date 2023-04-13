import express from "express"
import morgan from "morgan"
import dotEnv from "dotenv"
import bodyParser from "body-parser";
import connectDB from "./config/database.js";



const app = express()

dotEnv.config()
connectDB()
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

const port = process.env.PORT || 9000

app.listen(port, console.log("Server started"))

