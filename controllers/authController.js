const user = require("../model/user");
const otpGenerator = require("../helper/otpgenerator");

/**
 * handle sign up
 */
userRegistration = async (req, res) => {
  try {
    if (req.body.number.length < 10) {
      res.status(400).json({ status: false, message: "invalid mobile number" });
    } else {
      const found = await user.findOne({ number: req.body.number });
      if (found) {
        res.status(401).json({ status: false, message: "user already exists" });
      } else {
        var result = new user(req.body);
        result.otp = otpGenerator();
        result.save(err => {
          if (err) console.error(err);
          res.status(200).json({
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
/**
 *
 * @param {request received from front end} req
 * @param {*} res
 */
const verifyOtp = async (req, res) => {
  try {
    if (!req.body.number) {
      res
        .status(400)
        .json({ status: false, message: "phone number is missing" });
    } else if (!req.body.otp) {
      res.status(400).json({ status: false, message: "otp is missing" });
    } else {
      const found = await user.findOne({ number: req.body.number });
      if (!found) {
        res.status(400).json({ status: false, message: "user does not exist" });
      } else {
        if (found.otp === req.body.otp) {
          found.isRegistered = true;
          await found.save();
          const data = {
            id: found._id,
            token: found.generateAuthToken()
          };
          res.status(201).json({
            status: true,
            message: "user verified successfully",
            data: data
          });
        } else {
          res.status(400).json({ status: false, message: "wrong otp" });
        }
      }
    }
  } catch (e) {
    res.status(500).json({ status: false, message: e.toString() });
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
    if (!req.body.name) {
      res.status(400).json({ status: false, message: "Name is missing" });
    } else if (!req.body.age) {
      res.status(400).json({ status: false, message: "age is missing" });
    } else if (!req.body.gender) {
      res.status(400).json({ status: false, message: "Gender is missing" });
    } else {
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
    }
  } catch (e) {
    res.status(500).json({ status: false, message: e.toString() });
  }
};

/**
 * req.body={
 * gender:,
 * dob:,
 * location:,
 * relationshipStatus:,
 * email:
 * }
 * @param {*} req
 * @param {*} res
 */
const postAboutMe = async (req, res) => {
  try {
    const found = await user.findOne({ _id: req.userId });
    if (!found) {
      res.status(400).json({ status: false, message: "user does not exist" });
    } else {
      if (req.body.gender) {
        found.gender = req.body.gender;
      }
      if (req.body.dob) {
        found.dob = req.body.dob;
      }
      if (req.body.location) {
        found.location = req.body.location;
      }
      if (req.body.relationshipStatus) {
        found.relationshipStatus = req.body.relationshipStatus;
      }
      if (req.body.email) {
        found.email = req.body.email;
      }
      await found.save();
      res
        .status(200)
        .json({ status: true, message: "details saved successfully" });
    }
  } catch (e) {
    res.status(500).json({ status: false, message: e.toString() });
  }
};
const postPersonalDetails = async (req, res) => {};
const postEducation = async (req, res) => {};
const postExperience = async (req, res) => {};

const getAboutMe = async (req, res) => {
  const found = await user.findOne({ _id: req.query.id });
  try {
    if (!found) {
      res.status(400).json({ status: false, message: "User does not exist" });
    } else {
      var data = {
        gender: found.gender,
        dob: found.dob,
        location: found.location,
        relationshipStatus: found.relationshipStatus,
        email: found.email
      };
      res.status(200).json({
        status: true,
        message: "date extracted successfully",
        data: data
      });
    }
  } catch (e) {
    res.status(500).json({ status: false, message: e.toString() });
  }
};
const getPersonalDetails = async (req, res) => {
  const found = await user.findOne({ _id: req.params.id });
  try {
    if (!found) {
      res.status(400).json({ status: false, message: "User does not exist" });
    } else {
      var data = {
        height: user.height,
        weight: user.weight,
        fitness: user.fitness,
        drinking: user.drinking,
        smoking: user.smoking,
        religion: user.religion,
        politicalViews: user.politicalViews,
        bloodGroup: user.bloodGroup
      };
      res.status(200).json({
        status: true,
        message: "date extracted successfully",
        data: data
      });
    }
  } catch (e) {
    res.status(500).json({ status: false, message: e.toString() });
  }
};

const getInterests = async (req, res) => {
  try {
    const found = await user.findOne({ _id: req.params.id });
    if (!found) {
      res.status(400).json({ status: false, message: "user not found" });
    } else {
      res.status(200).json({
        status: false,
        message: "data received",
        data: found.intersts
      });
    }
  } catch (e) {
    res.status(500).json({ status: false, message: e.toString() });
  }
};
const getEducation = async (req, res) => {
  try {
    const found = await user.findOne({ _id: req.params.id });
    if (!found) {
      res.status(400).json({ status: false, message: "user not found" });
    } else {
      res.status(200).json({
        status: false,
        message: "data received",
        data: found.education
      });
    }
  } catch (e) {
    res.status(500).json({ status: false, message: e.toString() });
  }
};
const getExperience = async (req, res) => {
  try {
    const found = await user.findOne({ _id: req.params.id });
    if (!found) {
      res.status(400).json({ status: false, message: "user not found" });
    } else {
      res.status(200).json({
        status: false,
        message: "data received",
        data: found.experience
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
  basicDetails,
  postAboutMe,
  getAboutMe
};
