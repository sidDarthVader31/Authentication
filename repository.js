/**
 * repository class 
 */

const user=require('./model/user')
const experience=require('./model/experience')
const education=require('./model/education')

const findUser=async(key,value)=>{
    var k=key;
    return await user.findOne({k:value})
}

const findUserById=async(id)=>{
    return await user.findOne({_id:id});
}

const findUserByNumber=async(value)=>{
    found= await user.findOne({number:value});
    res.status(200).json({hey:found});
    return user;
}

const saveUser=async(value)=>{
     await value.save();
}

module.exports={
    findUserById,
    findUserByNumber,
    saveUser
}