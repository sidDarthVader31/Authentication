const express=require('express')
const app=express()
const PORT = process.env.PORT || 3000;
const jsonValidator=require('./middleware/jsonValidator')
const routerAuth=require('./routes/api/auth')
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/esocial',
{useNewUrlParser:true},{useUnifiedTopology:true})

var mysql = require("mysql");
//local mysql db connection
var connection = mysql.createConnection({
  host: "13.127.17.67",
  user: "sidd",
  password: "sidd1234",
  database: "esocial_new",
  port: 3306
});

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


app.get('/',(req,res)=>{
   connection.connect(function(err) {
    if (err) {
      res.send(`<h1>${err}</h1>`);
    }
    else{
      res.send("<h1> Hello World</h1>")
    }
   
  });
})


app.use('api/v2/signUp',(req,res)=>{
});


app.use('/api/v1/',routerAuth)

app.listen(PORT)