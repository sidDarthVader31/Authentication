const user=require('../model/user')
const rating=require('../model/rating')
const Postrating=(req,res)=>{
    const rate=new rating(req.body);
    rate.ratedBy=req.userId;
    rate.save();
    
};