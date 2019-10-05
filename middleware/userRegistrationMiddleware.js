const { check, validationResult } = require('express-validator');
module.exports=   [check('number').exists().isLength({min:10})
,(req, res,next) => {

  const err=validationResult(req);
  if (!err.isEmpty()) {
     return res.status(422).json({ data: err.array() });
  }
  else{
    next();
  }
}
];

   
