const user = require("../model/user");
const otpGenerator = require("../helper/otpgenerator");
const repository = require("../repository");
/**
 * handle sign up
 */
userRegistration = async (req, res) => {
  try {
    const found = await user.findOne({ number: req.body.number });
    if (found) {
      res.status(401).json({ data: "user already exists" });
    } else {
      var result = new user(req.body);
      result.otp = otpGenerator();
      await result.save();
      res.status(200).json({
        data: result.otp
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: false, message: e.toString() });
  }
};

/**
 *
 * @param {request received from front end} req
 * @param {*} res
 */
const verifyOtp = async (req, res) => {
  try {
    const found= await user.findOne({number:req.body.number})
        if (found.otp == req.body.otp) {
          found.isRegistered = true;
          await found.save();
          const data = {
            id: found._id,
            token: found.generateAuthToken()
          };
          return res.status(201).json({
            data: data
          });
        } else {
          return res.status(400).json({ data:"wrong otp" });
        }
      }
     catch (e) {
    return res.status(500).json({ data: e.toString() });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const resendOtp = async (req, res) => {
  try {
    if (!req.body.number) {
      res
        .status(401)
        .json({ status: false, message: "phone number is missing" });
    } else {
      const found = await user.findOne({ number: req.body.number });
      if (found) {
        //send sms to found.number and otp as found.otp
        res.status(200).json({
          status: true,
          message: "otp sent again successfully",
          otp: found.otp
        });
      } else {
        res.status(403).json({
          status: false,
          message: "user does not exist, please sign up"
        });
      }
    }
  } catch (e) {
    res.status(500).json({ status: false, message: e.toString() });
  }
};

const login = async (req, res) => {
  if (req.body.number.length < 10) {
    res.status(400).json({ status: false, message: "invalid phone number" });
  } else {
    const found = await user.findOne({ number: req.body.number });
    if (!found || !found.isRegistered) {
      res.status(401).json({ status: false, message: "user does not exist" });
    } else {
      found.otp = otpGenerator();
      await found.save();
      res.status(200).json({
        status: true,
        message: "otp sent successfully",
        otp: found.otp
      });
    }
  }
};

/**
 * api to save basic details
 * @param {} req
 * @param {*} res
 */

const basicDetails = async (req, res) => {
  try {
      const found = await user.findOne({ _id: req.userId });
      if (!found) {
        res.status(400).json({ status: false, message: "user not found." });
      } else {
        found.name = req.body.name;
        found.age = parseInt(req.body.age);
        found.gender = req.body.gender;
        if (req.body.lookingFor instanceof Array) {
          found.lookingFor = req.body.lookingFor;
        }
        await found.save();
        res.status(200).json({
          status: true,
          message: "data saved successfully",
          data: found
        });
      }
  } catch (e) {
    res.status(500).json({ status: false, message: e.toString() });
  }
};

module.exports = {
  userRegistration,
  verifyOtp,
  resendOtp,
  login,
  basicDetails
};
