/**
 * middleware to verify tokens
 */
const jwt=require('jsonwebtoken')
const config = require("config");
const user=require('../../model/user');
const sendResponse=require('../../helper/sendResponse');
const verifyToken = function(req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return res.status(401).json({status:false,message:"Access denied. No token provided."});

  try {
    const decoded = jwt.verify(token, config.get("authKey"));
    req.userId = decoded._id;
    next();
  } catch (ex) {
    sendResponse(res,400,ex.toString()+"catch");
  }
};

const checkIfUserExist= async(req,res,next)=>{
  try{
    const found=await user.findOne({_id:req.userId});
    if(!found){
      sendResponse(res,400,"user not found");
    }
    else{
      req.data=found;
      next();
    }
  }
  catch(e){
    sendResponse(res,500,e.toString());
  }  
}

module.exports={
  verifyToken,
  checkIfUserExist
}