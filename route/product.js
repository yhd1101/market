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
//product 전체 불러오는 api
router.get("/", async (req, res) => {
    try {
        const products = await productModel.find().sort({createdAt : -1}) //최신
        res.json({
            msg : "Successful get products",
            count : products.length,
            products
        })

    } catch (err){
        res.status(500).json({
            msg : err
        })
    }
})

//product 상세 정보 가져오는 api(상세페이지)
router.get("/:productId", async (req, res) => {
    try {
        const product = await productModel.findById(req.params.productId)
        res.json({
            msg : `Successful get product by ${req.params.productId}`,
            product
        })

    } catch (err){
        res.status(500).json({
            msg : err
        })
    }
})

router.put("/:productId", checkAuth, async (req, res) => {
    //등록된 제품과 로그인한사람이 일치해야함
    const {
        name,
        price,
        brand,
        picture,
        category,
        region,
        desc1,
        desc2
    } = req.body
    try {

        const product = await productModel.findById(req.params.productId)
        console.log(product.seller.toString())
        console.log(req.params.productId)
        if(product.seller.toString() !== req.user._id.toString()){
             return res.status(404).json({
                 msg : "수정권한 없음"
             })
        }
        //제품 업데이트(수정)
        // const updateProductFields = {}
        // updateProductFields.seller = req.user._id
        // if (name) updateProductFields.name = name
        // if (price) updateProductFields.price = price
        // if (brand) updateProductFields.brand = brand
        // if (picture) updateProductFields.picture = picture
        // if (region) updateProductFields.region = region
        // if (desc1) updateProductFields.desc1 = desc1
        // if (desc2) updateProductFields.desc2 = desc2
        // if (typeof category !== "undefined") {
        //     updateProductFields.category = category.split(",")
        // }
        // await productModel.findByIdAndUpdate(
        //     req.params.productId,
        //     { $set : updateProductFields },
        //     { new : true }
        // )
        // res.json({
        //     msg : `updated product by ${req.params.productId}`
        // })
        if (product) {
            product.name = name
            product.price = price
            product.brand = brand
            product.picture = picture
            product.region = region
            product.desc1 = desc1
            product.desc2 = desc2
            product.category = category
        }
        const updatedProduct = await product.save()
        res.json({
            msg : `updated product by ${productId}`
        })

    } catch (err){
        res.status(500).json({
            msg : err
        })
    }
})

//제품 삭제
router.delete("/:productId", checkAuth, async (req, res) => {
    try{
        const product = await productModel.findById(req.params.productId)
        console.log(product.seller.toString())
        console.log(req.user._id)
        if(product.seller.toString() !== req.user._id.toString()){
            return res.status(404).json({
                msg : "삭제권한 없음."
            })
        }
        //제품 삭제
        await productModel.findByIdAndDelete(req.params.productId)
        res.json({
            msg : `deleted product by ${req.params.productId}`
        })

    } catch (err){
        res.status(500).json({
            msg : err
        })
    }
})

export default router