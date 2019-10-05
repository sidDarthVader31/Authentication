const { check, validationResult } = require('express-validator');
module.exports=   [check('name').exists()
,(req, res,next) => {

  const err=validationResult(req);
  if (!err.isEmpty()) {
     return res.status(422).json({ data: err.array() });
  }
  else{
    next();
  }
},
check('age').exists()
,(req, res,next) => {

  const err=validationResult(req);
  if (!err.isEmpty()) {
     return res.status(422).json({ data: err.array() });
  }
  else{
    next();
  }
},
check('gender').exists()
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

   
