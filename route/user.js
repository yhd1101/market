import express from "express";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken"
import passport from "passport";
import profile from "../models/profile.js";
import profileModel from "../models/profile.js";
import { signup, login, getProfile} from "../controller/user.js"
const authCheck = passport.authenticate("jwt", { session : false }) //auto

const router = express.Router()

//회원가입
router.post("/signup", signup)

router.post("/login", login)

router.get("/", authCheck, getProfile)



export default router
