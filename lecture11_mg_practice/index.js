const express = require('express');
const connectDB = require('./db/connectDd');
const app = express();
require("dotenv").config();


app.use(express.json());



connectDB().then(()=>{
  app.listen(process.env.PORT,()=>{
  console.log("server is live");
})
}).catch((err)=>console.log(err))
