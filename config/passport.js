import {Strategy, ExtractJwt} from "passport-jwt"
import userModel from "../models/user.js";


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET_KEY || "YANGHANDONG"

const passportConfig = passport => {
    passport.use(
        new Strategy(opts, (jwt_payload, done) => {
            userModel
                .findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user); //에러는 null값 user로 리턴
                    }
                    return done(null, false)
                })
                .catch(err => console.log(err))
        })


    )
}
export default passportConfig