const express=require('express')
const router=express.Router()
const authMiddleware=require('../../middleware/authMiddleware')
const authController=require('../../controllers/authController')
const profileController=require('../../controllers/profileController')
router.post('/signup',authController.userRegistration)
router.post('/verifyotp',authController.verifyOtp)
router.post('/resendOtp',authController.resendOtp)
router.post('/login',authController.login)
router.post('/basicDetails',authMiddleware,authController.basicDetails)\


//profile api's
router.post('/postAboutMe',authMiddleware,profileController.postAboutMe)
router.get('/getAboutMe',authMiddleware,profileController.getAboutMe)
router.post('/postExperience',authMiddleware,profileController.postExperience)
router.get('/getExperience',authMiddleware,profileController.getExperience)
router.post('/postEducation',authMiddleware,profileController.postEducation)
router.post('/getEducation',authMiddleware,profileController.getEducation)
router.post('/postPersonalDetails',authMiddleware.profileController.postPersonalDetails)

module.exports=router;