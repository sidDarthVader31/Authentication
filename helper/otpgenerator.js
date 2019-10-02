const otp=()=>{
    return Math.floor(Math.random() * 9999) + 1000;
}
module.exports=otp;