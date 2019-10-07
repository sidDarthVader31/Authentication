const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/user/authMiddleware");
const authController = require("../../controllers/authController");
const profileController = require("../../controllers/profileController");
const authValidator = require("../../middleware/registrationapi/authValidtionMiddleware");
const profileValidator = require("../../middleware/profile/profileValidator");
//authentication
router.post("/signup", authValidator.signup, authController.userRegistration);
router.post("/verifyotp", authValidator.verifyOtp, authController.verifyOtp);
router.post("/resendOtp", authValidator.basicDetails, authController.resendOtp);
router.post("/login", authController.login);
router.post("/basicDetails",  authMiddleware.verifyToken, authController.basicDetails);
//profile api's

router.post("/postAboutMe",  authMiddleware.verifyToken, profileController.postAboutMe);
router.get(
  "/getAboutMe",
  authMiddleware.verifyToken,
  profileValidator.checkUserId,
  authMiddleware.checkIfUserExist,
  profileController.getAboutMe
);
router.post(
  "/postExperience",
  authMiddleware.verifyToken,
  profileValidator.postExperience,
  authMiddleware.checkIfUserExist,
  profileController.postExperience
);
router.get(
  "/getExperience",
  authMiddleware.verifyToken,
  profileValidator.checkUserId,
  authMiddleware.checkIfUserExist,
  profileController.getExperience
);
router.post(
  "/postEducation",
  authMiddleware.verifyToken,
  profileValidator.postEducation,
  authMiddleware.checkIfUserExist,
  profileController.postEducation
);
router.post(
  "/getEducation",
  authMiddleware.verifyToken,
  profileValidator.checkUserId,
  authMiddleware.checkIfUserExist,
  profileController.getEducation
);
router.post(
  "/postPersonalDetails",
  authMiddleware.verifyToken,
  authMiddleware.checkIfUserExist,
  profileController.postPersonalDetails
);
router.get(
  "/getPersonalDetails",
  authMiddleware.verifyToken,
  profileValidator.checkUserId,
  authMiddleware.checkIfUserExist,
  profileController.getPersonalDetails
);
router.put(
  "/updateExperience",
  authMiddleware.verifyToken,
  profileValidator.updateExperience,
  authMiddleware.checkIfUserExist,
  profileController.updateExperience
);
router.put(
  "/updateEducation",
  authMiddleware.verifyToken,
  profileValidator.updateEducation,
  authMiddleware.checkIfUserExist,
  profileController.updateEducation
);
module.exports = router;
