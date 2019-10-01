
var jsonValidator=function(req,res,buff,encoding,next){
    try{
        JSON.parse(buff)
        console.log('correct input')
    }
    catch(e){
        console.log('wrong input')
        res.status(404).JSON({status:false,message:'wrong input'})
    }
  finally{
      next()
  }
}
module.exports=jsonValidator;