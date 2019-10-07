const mongoose = require("mongoose");
const user=require('./user');
var educationSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  school: String,
  courseName: String,
  fieldOfStudy: String,
  startDate: String,
  endDate: String,
  location: String
});
var education = mongoose.model('education', educationSchema);
module.exports = education;
