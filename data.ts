const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const mongoose= require('mongoose')
const empcrud= require('./model')
const app = express();
app.use(cors());
//app.use(bp.urlencoded({extended:true}))
app.use(bp.json());
userdata = [];

app.post("/adduser", (req, res) => {
   
   const users= new empcrud({
    ...req.body
   })
   users.save().then(() => res.send('user added'))
});
app.post("/loginvalid", (req, res) => {
  var data = req.body;
  valid = false;
  console.log(data);
  if (data.uname === "admin" && data.pass === "pass123") {
    valid = true;
  } else {
    valid = false;
  }

  res.send(valid);
});
app.get("/loaduser", (req, res) => {
  res.send(userdata);
});

const startServer=async() =>{
  await mongoose.connect('mongodb+srv://amar:amar123@cluster0.rle5i.mongodb.net/mmcdb?retryWrites=true&w=majority&appName=Cluster0')
  app.listen(4000, () => {
    console.log("server is ready");
  });
}

startServer()


-----------


  


const mongoose= require('mongoose')

const empcrud= mongoose.model('empcrud',{
    username:String,
    password:String,
    email:String
})
module.exports=empcrud
