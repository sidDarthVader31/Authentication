const user = require("../model/user");
const otpGenerator=require('../helper/otpgenerator');
userRegistration = async (req, res) => {
  try {
    if (req.body.number.length < 10) {
      res.status(400).json({ status: false, message: "invalid mobile number" });
    } else {
      const found = await user.findOne({ number: req.body.number });
      if (found) {
        res.status(401).json({status:false,message:'user already exists'});
      } else {
        var result = new user(req.body);
        result.otp = otpGenerator();
        result.save(err => {
          if (err) console.error(err);
          res
            .status(200)
            .json({
              status: true,
              message: "otp sent successfully",
              otp: result.otp
            });
        });
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: false, message: e.toString() });
  }
};
const verifyOtp = async(req, res) => {
    try{
        if(!req.body.number){
            res.status(400).json({status:false,message:'phone number is missing'})
        }
        else if(!req.body.otp){
            res.status(400).json({status:false,message:'otp is missing'})
        }
        else{
            const found=await user.findOne({number:req.body.number});
            if(!found){
                res.status(400).json({status:false,message:'user does not exist'})
            }
            else{
                if(found.otp===req.body.otp){
                    found.isRegistered=true
                    await found.save();
                    res.status(201).json({status:true,message:'user verified successfully'})
                }
                else{
                    res.status(400).json({status:false,message:'wrong otp'})
                }
            }
        }
    }
    catch(e){
        res.status(500).json({status:false,message:e.toString()})
    }
};


const resendOtp = async (req, res) => {
  try{
   
  if(!req.body.number){
    res.status(401).json({status:false,message:'phone number is missing'})
  }
  else {
    const found=await user.findOne({number:req.body.number});
    if(found){
      //send sms to found.number and otp as found.otp
      res.status(200).json({status:true,message:'otp sent again successfully',otp:found.otp})
    }
    else{
      res.status(403).json({status:false,message:'user does not exist, please sign up'})
    }
  } 
  }
  catch(e){
    res.status(500).json({status:false,message:e.toString()})
  }
};

const login=async (req,res)=>{
  if(req.body.number.length<10){
    res.status(400).json({status:false,message:'invalid phone number'});
  }
  else{
    const found=await user.findOne({number:req.body.number})
    if(!found ||!found.isRegistered){
      res.status(401).json({status:false,message:'user does not exist'});
    }
    else {
      found.otp=otpGenerator()
      await found.save();
      res.status(200).json({status:true,message:'otp sent successfully',otp:found.otp});
    }
  }
};
module.exports = {
  userRegistration,
  verifyOtp,
  resendOtp,
  login
};
