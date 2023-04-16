import express from "express";
import passport from "passport";
import productModel from "../models/product.js";


const router = express.Router()

const checkAuth = passport.authenticate("jwt", { session : false })
//등록하기
router.post("/create", checkAuth, async (req, res) => {
    console.log(req.body)
    const {
        name,
        price,
        brand,
        picture,
        category,
        region,
        desc1,
        desc2,
    } = req.body

    try{
        const newProduct = await productModel({
            name,
            price,
            brand,
            picture,
            category,
            region,
            desc1,
            desc2,
            seller: req.user._id
        })

        const product = await newProduct.save()
        res.json({
            msg : "Successful product",
            product : product
        })
    } catch (err){
        res.status(500).json({
            msg : err
        })
    }

})

export default router