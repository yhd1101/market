import express from "express";
import passport from "passport";
import productModel from "../models/product.js";
import {createProduct, getProduct, getProductId, brandProduct} from  "../controller/product.js"

const router = express.Router()

const checkAuth = passport.authenticate("jwt", { session : false })
//등록하기
router.post("/create", checkAuth, createProduct)
//product 전체 불러오는 api
router.get("/", getProduct)

//product 상세 정보 가져오는 api(상세페이지)
router.get("/:productId", getProductId)

//카테고리별로 데이터가저오는 api
router.get("/brand", brandProduct)

router.put("/:productId", checkAuth, async (req, res) => {
    const { name, price, brand, picture, region, desc1, desc2, category } = req.body

    try {

        const product = await productModel.findById(req.params.productId)

        if(product.seller.toString() !== req.user._id.toString()){
             return res.status(404).json({
                 msg : "수정권한 없음"
             })
        }
        if (product) {
            product.name = name ? name : product.name
            product.price = price ? price : product.price
            product.brand = brand ? brand : product.brand
            product.picture = picture ? picture : product.picture
            product.region = region ? region : product.region
            product.desc1 = desc1 ? desc1 : product.desc1
            product.desc2 = desc2 ? desc2 : product.desc2
            product.category =category ? category : product.category
        }
        const updatedProduct = await product.save()
         res.json({
             msg : `updated product by ${req.params.productId}`
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