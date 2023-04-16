import express from "express";
import passport from "passport"
import { createProfile } from "../controller/profile.js"
import profileModel from "../models/profile.js";

const router = express.Router()

const checkAuth = passport.authenticate("jwt", { session : false })


//프로필 등록
router.post("/create", checkAuth, createProfile)


export default router