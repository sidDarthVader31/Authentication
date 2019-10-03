const mongoose=require('mongoose')
const config=require('config')
const jwt=require('jsonwebtoken')
var schema=mongoose.Schema;
var userSchema=new schema({
    name:String,
    number:{type:String,required:true},
    dob:Date,
    otp:String,
    gender:String,
    bio:{type:String,maxlength:255},
    latitude:String,
    longitude:String,
    createdAt:{type:Date,default:Date.now()},
    updatedAt:{type:Date,default:Date.now()},
    isRegistered:{type:Boolean,default:false},
    lookingFor:[{type:String}],
    whoAreYou:String,
    network:Number,
    score:Number,
    kPoints:{type:Number,default:15},
    relationshipStatus:String,
    email:String,
    interests:[{type:String}],
    height:{type:Number,min:100,max:200},
    weight:Number,
    fitness:String,
    drinking:String,
    smoking:String,
    religion:String,
    politicalViews:String,
    bloodGroup:String,
    education:[{ type: mongoose.Schema.Types.ObjectId, ref: 'education' }],
    experience:[{type:mongoose.Schema.Types.ObjectId,ref:'experience'}]
});

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id}, config.get('authKey')); //get the private key from the config file -> environment variable
    return token;
  }
  
var user=mongoose.model('user',userSchema);
module.exports=user;