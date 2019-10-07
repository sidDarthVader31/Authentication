/**
 * validation for auth api's
 */


const { check, validationResult } = require("express-validator");

/**
 * for route:api/vi/signup
 * 
 */
const signup = [
  check("number")
    .exists()
    .withMessage("number is missing")
    .bail()
    .isLength({ min: 10,max:10 })
    .withMessage("mobile number is invalid")
    .bail(),
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(422).json({ data: err.array() });
    } else {
      next();
    }
  }
];

/**
 * for route:api/v1/basicdetails
 */
const basicDetails=[
  check("name")
    .exists()
    .withMessage("name is missing")
    .bail(),
  check("age")
    .exists()
    .withMessage("age is missing")
    .bail()
    .isLength({ min: 2, max: 2 }),
    check("gender")
    .exists()
    .withMessage("gender is missing")
    .bail(),
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(422).json({ data: err.array() });
    } else {
      next();
    }
  }
];

/**
 * for route:api/v1/verifyotp
 */
const verifyOtp=[
  check("number")
    .exists()
    .withMessage("number is missing").bail()
    .isLength({ min: 10 })
    .withMessage("invalid mobile number"),
  check("otp")
    .exists()
    .withMessage("otp is missing").bail()
    .isLength({ min: 4, max: 4 })
    .withMessage("otp length should be four"),
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(422).json({ data: err.array() });
    } else {
      next();
    }
  }
];


module.exports={
  verifyOtp,
  signup,
  basicDetails
}
