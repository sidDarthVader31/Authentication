/**
 * model to save phone number and otp of neww users
 */

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/esocial",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);
var schema = mongoose.Schema;
var otpSchema = new schema({
  number: { type: String,required:true },
  otp: { type: String }
});
var otp=new mongoose.model('otp',otpSchema);
module.exports=otp;
