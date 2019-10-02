const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/esocial',{useNewUrlParser:true},{useUnifiedTopology:true})
var schema=mongoose.Schema;
var userSchema=new schema({
    name:String,
    number:{type:String,required:true},
    dob:Date,
    otp:String,
    gender:String,
    about:String,
    latitude:String,
    longitude:String,
    createdAt:{type:Date,default:Date.now()},
    updatedAt:{type:Date,default:Date.now()},
    isRegistered:{type:Boolean,default:false},
    lookingFor:[{type:String}],
    whoAreYou:String
});
var user=mongoose.model('user',userSchema);
module.exports=user;