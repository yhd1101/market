import passport from "passport"
import profileModel from "../models/profile.js";

const checkAuth = passport.authenticate("jwt", { session : false })


const createProfile = async (req, res) => {
    const { bio, birth, phone } = req.body
    try {
        const newProfile = new profileModel({
            bio, birth, phone, user : req.user._id
        })

        const result = await newProfile.save()
        res.json({
            msg : "Successful profile",
            profileInfo : result
        })

    } catch (err) {
        res.status(500).json({
            msg : err
        })
    }
}

export {createProfile}