const user = require("../model/user");
const education = require("../model/education");
const experience = require("../model/experience");
const sendResponse = require("../helper/sendResponse");
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
    const found =new user(req.data);
    Object.assign(found,req.body);
    await found.save();
    sendResponse(res, 200, found);
  } catch (e) {
    sendResponse(res, 500, e.toString());
  }
};

const postPersonalDetails = async (req, res) => {
  try {
    const found = new user(req.data);
    const input=req.body;
    Object.assign(found,input);
    await found.save();
    sendResponse(res, 200, found);
  } catch (e) {
    sendResponse(res, 500, e.toString());
  }
};

const postEducation = async (req, res) => {
  try {
    const found = new user(req.data);
    var result = new education({
      school: req.body.school,
      courseName: req.body.courseName,
      fieldOfStudy: req.body.fieldOfStudy,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      location: req.body.location
    });
    found.education.push(result);
    await result.save();
    await found.save();
    sendResponse(res, 200, result);
  } catch (e) {
    sendResponse(res, 500, e.toString());
  }
};

const postExperience = async (req, res) => {
  try {
    var result = new experience(req.body);
    result.userId=req.userId;
    const found = new user(req.data);
    found.experience.push(result._id);
    await found.save();
    await result.save();
    sendResponse(res, 200, found);
  } catch (e) {
    sendResponse(res, 500, e.toString());
  }
};

const getAboutMe = async (req, res) => {
  try {
    const found = req.data;
    var data = {
      gender: found.gender,
      dob: found.dob,
      location: found.location,
      relationshipStatus: found.relationshipStatus,
      email: found.email
    };
    sendResponse(res, 200, data);
  } catch (e) {
    sendResponse(res, 500, e.toString());
  }
};

const getPersonalDetails = async (req, res) => {
  try {
    const found = new user(req.data);
    var data = {
      height: found.height,
      weight: found.weight,
      fitness: found.fitness,
      drinking: found.drinking,
      smoking: found.smoking,
      religion: found.religion,
      politicalViews: found.politicalViews,
      bloodGroup: found.bloodGroup
    };
    sendResponse(res, 200, data);
  } catch (e) {
    sendResponse(res, 500, e.toString());
  }
};

const getInterests = async (req, res) => {
  try {
    const found = new user(req.data);
    sendResponse(res, 200, found.intersts);
  } catch (e) {
    sendResponse(res, 500, e.toString());
  }
};

const getEducation = async (req, res) => {
  try {
    const found = new user(req.data);
    sendResponse(res, 200, found.education);
  } catch (e) {
    sendResponse(res, 500, e.toString());
  }
};

const getExperience = async (req, res) => {
  try {
    const found = req.data;
    sendResponse(res, 200, found.experience);
  } catch (e) {
    sendResponse(res, 500, e.toString());
  }
};

const updateExperience = async (req, res) => {
  try {
    var result = new experience({
      userId: req.userId,
      company: req.body.company,
      designation: req.body.designation,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      location: req.body.location,
      currentlyWorking: req.body.currentlyWorking
    });
    const found = new user(req.data);
    found.experience.forEach(function(ex) {
      if (ex._id == req.body.id) {
        (ex.company = result.company),
          (ex.userId = result.userId),
          (ex.designation = result.designation),
          (ex.startDate = result.startDate),
          (ex.endDate = result.endDate),
          (ex.location = result.location),
          (ex.currentlyWorking = result.currentlyWorking);
      }
      found.save(err => {
        if(err){

        }
        sendResponse(res, 200, found.result);
      });
    });
  } catch (e) {
    sendResponse(res, 500, e.toString());
  }
};

const updateEducation = async (req, res) => {
  try {
    var result = new education({
      userId: req.userId,
      school: req.body.school,
      courseName: req.body.courseName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      location: req.body.location,
      fieldOfStudy: req.body.fieldOfStudy
    });
    const found = new user(req.data);
    found.education.forEach(function(ex) {
      if (ex._id == req.body.id) {
        (ex.school = result.school),
          (ex.courseName = result.courseName),
          (ex.designation = result.designation),
          (ex.startDate = result.startDate),
          (ex.endDate = result.endDate),
          (ex.location = result.location),
          (ex.fieldOfStudy = result.fieldOfStudy);
      }
      found.save(err => {
        sendResponse(res, 200, found.result);
      });
    });
    sendResponse(res, 200, found.result);
  } catch (e) {
    sendResponse(res, 500, e.toString());
  }
};

module.exports = {
  postAboutMe,
  getAboutMe,
  postExperience,
  getExperience,
  postEducation,
  getEducation,
  postPersonalDetails,
  getPersonalDetails,
  updateExperience,
  updateEducation
};
