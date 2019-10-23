/**
 * validation for profile api's
 */

const { check, validationResult,query } = require("express-validator");
/**
 * for route: api/v1/postExperience
 */
const postExperience = [
  check("company")
    .exists()
    .withMessage("company name is missing")
    .bail(),
  check("designation")
    .exists()
    .withMessage("designation name is missing")
    .bail(),
  check("currentlyWorking")
    .exists()
    .withMessage("currently working is missing")
    .bail()
    .isBoolean()
    .withMessage("currently working must be a boolean")
    .bail(),
  check("startDate")
    .exists()
    .withMessage("start date is missing")
    .bail(),
  check("endDate")
    .exists()
    .withMessage("end date is missing")
    .bail(),
  check("location")
    .exists()
    .withMessage("location is missing")
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
 * route:api/v1/postEducation
 */
const postEducation = [
  check("school")
    .exists()
    .withMessage("school name is missing")
    .bail(),
  check("courseName")
    .exists()
    .withMessage("course name is missing")
    .bail(),
  check("fieldOfStudy")
    .exists()
    .withMessage("field of study working is missing")
    .bail(),
  check("startDate")
    .exists()
    .withMessage("start date is missing")
    .bail(),
  check("endDate")
    .exists()
    .withMessage("end date is missing")
    .bail(),
  check("location")
    .exists()
    .withMessage("location is missing")
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

const checkUserId=[
    query('id')
    .exists()
    .withMessage("id is missing")
    .bail(),
    (req,res,next)=>{
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(422).json({data:err.array()})
        }
        else{
            next()
        }
    }
]

const updateExperience= [
  check("company")
    .exists()
    .withMessage("company name is missing")
    .bail(),
  check("designation")
    .exists()
    .withMessage("designation name is missing")
    .bail(),
  check("currentlyWorking")
    .exists()
    .withMessage("currently working is missing")
    .bail()
    .isBoolean()
    .withMessage("currently working must be a boolean")
    .bail(),
  check("startDate")
    .exists()
    .withMessage("start date is missing")
    .bail(),
  check("endDate")
    .exists()
    .withMessage("end date is missing")
    .bail(),
  check("location")
    .exists()
    .withMessage("location is missing")
    .bail(),
    check("id")
    .exists()
    .withMessage("id is missing")
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

const updateEducation=[
  check("school")
    .exists()
    .withMessage("school name is missing")
    .bail(),
  check("courseName")
    .exists()
    .withMessage("course name is missing")
    .bail(),
  check("fieldofStudy")
    .exists()
    .withMessage("field of study working is missing")
    .bail(),
  check("startDate")
    .exists()
    .withMessage("start date is missing")
    .bail(),
  check("endDate")
    .exists()
    .withMessage("end date is missing")
    .bail(),
  check("location")
    .exists()
    .withMessage("location is missing")
    .bail(),
    check("id")
    .exists()
    .withMessage("id is missing")
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
module.exports={
    checkUserId,
    postEducation,
    postExperience,
    updateEducation,
    updateExperience
}
