const mongoose=require('mongoose')
var experienceSchema=mongoose.Schema({
    companyName:String,
    designation:String,
    startDate:Date,
    endDate:Date,
    isCurrentlyWorking:Boolean,
    location:String
});

var experience=mongoose.model('experience',experienceSchema);
module.exports=experience;