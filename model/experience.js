const mongoose=require('mongoose')
const user=require('./user')
var experienceSchema=mongoose.Schema({
    userId: { type:mongoose.Schema.Types.ObjectId,ref:'user' },
    company:String,
    designation:String,
    startDate:String,
    endDate:String,
    currentlyWorking:Boolean,
    location:String
});
var experience=mongoose.model('experience',experienceSchema);
module.exports=experience;