import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        //이름, 사진, 카테고리, 지역,설명,가격,판매자정보
        name : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        brand : {
            type : String,
            // required : true
        },
        picture : {
            type : String,
            //required: true
        },
        category : {
            type : [String],
            // required : true
        },
        region : {
            type : String,
            required : true
        },
        desc1 : {
            type : String,
            required : true
        },
        desc2 : {
            type : String,
            // required : true
        },
        isSelling : {
            type : Boolean,
            default : false //팔리면 true
        },
        seller : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
            required : true
        }

    },
    {
        timestamps : true
    }
)

const productModel = mongoose.model("product", productSchema)

export default productModel