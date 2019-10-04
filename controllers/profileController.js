const user = require("../model/user");
const education = require("../model/education");
const experience = require("../model/experience");

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
          .json({ status: true, message: "details saved successfully",data:found });
      }
    } catch (e) {
      res.status(500).json({ status: false, message: e.toString() });
    }
  };

  const postPersonalDetails = async (req, res) => {
    try{
      const found=await user.findOne({_id:req.userId});
      if(!found){
        res.status(400).json({status:false,message:'User not found'});
      }
      else{
        if(req.body.height){
          found.height=req.body.height;
        }
        if(req.body.weight){
          found.weight=req.body.weight;
        }
        if(req.body.fitness){
          found.fitness=req.body.fitness;
        }
        if(req.body.drinking){
          found.drinking=req.body.drinking;
        }
        if(req.body.smoking){
          found.smoking=req.body.smoking;
        }
        if(req.body.religion){
          found.religion=req.body.religion;
        }
        if(req.body.politicalViews){
          found.politicalViews=req.body.politicalViews;
        }
        if(req.body.bloodGroup){
          found.bloodGroup=req.body.bloodGroup
        }
        await found.save();
        res.status(200).json({status:true,message:"details saved successfully",data:found});
      }
    }
    catch(e){
      res.status(500).json({status:false,message:e.toString()});
    }
  };
  const postEducation = async (req, res) => {
    try{
      if(!req.body.school){
        res
        .status(400)
        .json({ status: false, message: "school is missing" });
      }
      else if(!req.body.courseName){
        res
        .status(400)
        .json({ status: false, message: "course name is missing" });
      }
      else if(!req.body.fieldOfStudy){
        res
        .status(400)
        .json({ status: false, message: "field of study is missing" });
      }
      else if(!req.body.startDate){
        res
        .status(400)
        .json({ status: false, message: "start date is missing" });
      }
      else if(!req.body.endDate){
        res
        .status(400)
        .json({ status: false, message: "end date is missing" });
      }
      else if(!req.body.location){
        res
        .status(400)
        .json({ status: false, message: "location is missing" });
      }
      else{
        const found=await user.findOne({_id:req.userId});
        if(!found){
          res.status(400).json({status:false,message:"user not found"})
        }
        else{
          var result=new education({
            school:req.body.school,
            courseName:req.body.courseName,
            fieldOfStudy:req.body.fieldOfStudy,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            location:req.body.location
          })
        }
        found.education=result;
        await found.save();
        res.status(200).json({status:true,message:"details saved successfully"});
      }
    }
    catch(e){
      res.status(500).json({status:false,message:e.toString()});
    }
  };
  const postExperience = async (req, res) => {
    try {
      if (!req.body.company) {
        res
          .status(400)
          .json({ status: false, message: "company name is missing" });
      } else if (!req.body.designation) {
        res
          .status(400)
          .json({ status: false, message: "designation is missing" });
      } else if (!req.body.startDate) {
        res.status(400).json({ status: false, message: "start date is missing" });
      } else if (!req.body.endDate) {
        res.status(400).json({ status: false, message: "end date is missing" });
      } else if (!req.body.currentlyWorking) {
        res.status(400).json({ status: false, message: "currently is missing" });
      } else if (!req.body.location) {
        res.status(400).json({ status: false, message: "location is missing" });
      } else {
        var result = new experience({
          userId: req.userId,
          company: req.body.company,
          designation: req.body.designation,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          location: req.body.location,
          currentlyWorking: req.body.currentlyWorking
        });

        var found=await user.findOne({_id:req.userId});
        if(!found){
          res.status(400).json({status:false,message:"user not found"});
        }
        else{
          found.experience=result;
        await found.save()
        res.status(200).json({ status: true, message: "experience saved successfully" });
        }
        
      }
    } catch (e) {
      res.status(500).json({ status: false, message: e.toString() });
    }
  };
  
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
          email: found.email,
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
   
    try {
      const found = await user.findOne({ _id: req.query.id });
      if (!found) {
        res.status(400).json({ status: false, message: "User does not exist" });
      } else {
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
    postAboutMe,
    getAboutMe,
    postExperience,
    getExperience,
    postEducation,
    getEducation,
    postPersonalDetails,
    getPersonalDetails
  };  