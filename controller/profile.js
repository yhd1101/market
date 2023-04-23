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
const updateProfile = async (req, res) => {
    const { bio, birth, phone } = req.body
    try{
        const profile = await profileModel.findOne({user : req.user._id})
        console.log(profile)
        if(profile){
            profile.bio = bio ? bio : profile.bio
            profile.birth = birth ? birth : profile.birth
            profile.phone = phone ? phone : profile.phone
        }
        await profile.save()
        res.json({
            msg : `updated profile by ${req.user._id}`
        })

    } catch (err){
        res.status(500).json({
            msg : err
        })
    }

}
export {createProfile, updateProfile}