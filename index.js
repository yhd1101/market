import express from "express"
import morgan from "morgan"
import dotEnv from "dotenv"
import bodyParser from "body-parser";
import passport from "passport";
import connectDB from "./config/database.js";
import passportConfig from "./config/passport.js";

import userRoutes from "./route/user.js"
import profileRoutes from "./route/profile.js"



const app = express()

dotEnv.config()
connectDB()
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(passport.initialize())
passportConfig(passport)

app.use("/user", userRoutes)
app.use("/profile", profileRoutes)

const port = process.env.PORT || 8500

app.listen(port, console.log("Server started"))

