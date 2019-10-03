const jwt=require('jsonwebtoken')
const config = require("config");
module.exports = function(req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return res.status(401).json({status:false,message:"Access denied. No token provided."});

  try {
    const decoded = jwt.verify(token, config.get("authKey"));
    req.userId = decoded._id;
    next();
  } catch (ex) {
    res.status(400).json({status:false,message:"Invalid token"});
  }
};
