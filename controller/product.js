import productModel from "../models/product.js";


const createProduct  = async (req, res) => {
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

}

//product 전체를 불러옴
const getProduct = async (req, res) => {

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
}

const getProductId = async (req, res) => {
    try{
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
}

const brandProduct = async (req, res) => {
    const { brand } = req.body
    try{

        const brandProducts = await productModel.find( { brand})
        res.json({
            product : brandProducts
        })
    } catch (err){
        res.stats(500).json({
            msg : err
        })
    }
}


// const updateProductId = async (req. res) => {
//     //등록된 제품과 로그인한사람이 일치해야함
//     const {
//         name,
//         price,
//         brand,
//         picture,
//         category,
//         region,
//         desc1,
//         desc2
//     } = req.body
// }

export {createProduct, getProduct, getProductId, brandProduct}