//대상자, 제품명, 약속일자, 시간, 메모
import mongoose from "mongoose";

const reservationSchema = mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
            required : true
        },

        product : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "product",
            required: true
        },
        promise : {
            type : Date,
            required : true
        },
        memo : {
            type : String,

        }


    },
    {
        timestamps : true
    }
)

const reservationModel = mongoose.model("reservation", reservationSchema)

export default reservationModel