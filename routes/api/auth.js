const express=require('express')
const router=express.Router()
const controller=require('../../controllers/authController')
router.post('/signup',controller.userRegistration)
router.post('/verifyotp',controller.verifyOtp)
router.post('/resendOtp',controller.resendOtp)
module.exports=router;