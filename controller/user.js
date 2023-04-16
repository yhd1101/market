import userModel from "../models/user.js";
import jwt from "jsonwebtoken"
import passport from "passport";
import profile from "../models/profile.js";
import profileModel from "../models/profile.js";

const authCheck = passport.authenticate("jwt", { session : false }) //auto


const signup = async (req, res) => {
    const { name, email, password } = req.body

    //아이디 유무체크
    try {
        const user = await userModel.findOne( { email })

        if(user){
            return res.status(400).json({
                msg : "user email existed"
            })
        }

        const newUser = new userModel({
            name, email, password
        })
        const result = await newUser.save()
        res.json({
            msg : "Successful signup!",
            userInfo : result
        })

    }catch (err){
        res.status(500).json({
            msg : err
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        //email 유뮤 체크
        const user = await userModel.findOne({ email})
        if(!user){
            return res.json({
                msg : "No userEmail"
            })
        }
        const isMatched = await user.matchPassword(password)
        if (!isMatched) {
            return res.json({
                msg : "password do not match"
            })
        }

        //jsonwebtoken 생성
        const token = await jwt.sign(
            {id : user._id},
            process.env.SECRET_KEY,
            {expiresIn: "1h"} //1시간 지속
        )
        res.json({
            msg : "Successful login",
            token : token
        })



    } catch (err){
        res.status(500).json({
            msg : err
        })
    }
}

const getProfile = async (req, res) => {
    const { name, email, password } = req.user
    const profile = await profileModel.findOne({ user : req.user._id}) //프로필 정보 가져오기
    res.json({
        msg : "Successful get userInfo",
        user : {
            name, email, password
        },
        profile
    })
}

export { signup, login, getProfile}