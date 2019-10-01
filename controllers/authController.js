const user = require("../model/user");
const otp=require('../model/otp')

userRegistration = async (req, res) => {
  try {
    if (req.body.number.length < 10) {
      res.status(400).json({ status: false, message: "invalid mobile number" });
    } else {
      const found = await user.findOne({ number: req.body.number });
      if (found) {
        // send found.otp to message 91 service
      } else {
        var result = new otp(req.body);
        result.otp = Math.floor(Math.random() * 9999) + 1000;
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
            const found=await otp.findOne({number:req.body.number});
            if(!found){
                res.status(400).json({status:false,message:'user does not exist'})
            }
            else{
                if(found.otp===req.body.otp){
                    var newUser=new user({
                        number:found.number,
                        isRegistered:true
                    })
                    newUser.save();
                    await found.remove();
                    res.status(200).json({status:true,message:'user verified successfully'})
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
    const found=await otp.findOne({number:req.body.number});
    if(found){
      //send sms to found.number and otp as found.otp
      res.status(200).json({status:true,message:'otp sent again successfully'})
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


module.exports = {
  userRegistration,
  verifyOtp,
  resendOtp
};
