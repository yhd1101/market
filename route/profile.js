import express from "express";
import passport from "passport"
import { createProfile, updateProfile } from "../controller/profile.js"

const router = express.Router()

const checkAuth = passport.authenticate("jwt", { session : false })


//프로필 등록
router.post("/create", checkAuth, createProfile)
//
router.put("/update", checkAuth, updateProfile )


export default router