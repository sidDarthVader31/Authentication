const mongoose = require("mongoose");
var ratingSchema = mongoose.Schema({
  ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  ratedNumber:{type:String,required:true},
  rating:{type:Number,default:0},
  score:{type:Number,default:0},
  personalityRating:{type:Number,default:0},
  competenceRating:{type:Number,default:0},
  reliabilityRating:{type:Number,default:0},
  helpfulnessRating:{type:Number,default:0},
  relation:{type:String,default:"Others"}
});
var rating = mongoose.model('rating', ratingSchema);
module.exports =rating ;
