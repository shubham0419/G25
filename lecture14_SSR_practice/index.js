const express = require('express');
const connectDB = require('./db/connectDd');
const app = express();
require("dotenv").config();
const path = require("path")

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")))

connectDB().then(()=>{
  app.listen(process.env.PORT,()=>{
  console.log("server is live");
})
}).catch((err)=>console.log(err))
