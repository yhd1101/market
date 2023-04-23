import express from "express";
import passport from "passport"
import reservationModel from "../models/reservation.js";

const router = express.Router()
const checkAuth = passport.authenticate("jwt", { session : false})


router.post("/",  checkAuth, async (req, res) => {
    const { promise, memo, product} = req.body
    // console.log(req.body)
    console.log(req.user)
    try {
        const newReservation = new reservationModel({
            user : req.user._id,
            product, memo, promise
        })
         console.log("+++++++++++++++++++++++++++++++++++", newReservation)
        const reservation = await newReservation.save()
        res.json({
            msg : "Successful reservation!",
            reservation : reservation
        })

    } catch (err){
        res.status(500).json({
            msg : err
        })
    }
})

router.delete("/:reservationId", checkAuth, async (req, res) => {
    const { product} = req.body
    try {
        const reservaton = await reservationModel.findById(req.params.reservationId)
        if(reservaton.user.toString() !== req.user._id.toString()){
            return res.status(404).json({
                msg : "삭제권한 없음"
            })
        }

        await reservationModel.findByIdAndDelete(req.params.reservationId)
        res.json({
            msg : `deleted product by ${req.params.reservationId}`
        })
    } catch (err){
        res.status(500).json({
            msg : err
        })
    }

})

//전체를 불러옴
router.get("/", checkAuth, async (req, res) => {
    try{

        const reservations = await reservationModel
            .findOne({user : req.user._id})
            .populate("product")
            .sort({createdAt : -1})
        res.json({
            msg : "Successful get reservation",
            count : reservations.length,
            reservations
        })

    } catch (err){
        res.status(500).json({
            msg : err
        })
    }
})




export default router