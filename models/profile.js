import mongoose from "mongoose";

const profileSchema = mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
            required : true
        },
        bio : {
            type : Boolean,
            default : true // true면 남자 false는 여자
        },

        birth : {
            type : Date
        },

        phone : {
            type : Number
        }
    },
    {
        timestamps : true
    }
)

const profileModel = mongoose.model("profile", profileSchema)

export default profileModel