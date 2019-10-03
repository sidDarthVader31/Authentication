const mongoose=require('mongoose')
var educationSchema=mongoose.Schema({
    school:String,
    courseName:String,
    FieldOfStudy:String,
    startDate:String,
    endDate:String,
    location:String
});

var education=mongoose.model('education',educationSchema);
module.exports=education;