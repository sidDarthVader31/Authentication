const { check, validationResult,query } = require("express-validator");
const postRating = [
  check("number")
    .exists()
    .withMessage("Number is missing")
    .bail()
    .isLength({min:10,max:10})
    .withMessage("company name is missing")
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