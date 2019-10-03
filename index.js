const express=require('express')
const app=express()
const PORT = process.env.PORT || 3000;
const jsonValidator=require('./middleware/jsonValidator')
const routerAuth=require('./routes/api/auth')
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/esocial',
{useNewUrlParser:true},{useUnifiedTopology:true})

app.use(express.json({
    verify : (req, res, buf, encoding) => {
      try {
        JSON.parse(buf);
      } catch(e) {
        res.status(404).json({status:false,message:'invalid input'});
        throw Error('invalid JSON');
      }
    }
  }));

// app.use(jsonValidator);
app.get('/',(req,res)=>{
   res.send("<h1>hello world</h1>");
})


app.use('/api/v1/',routerAuth)


app.listen(PORT)