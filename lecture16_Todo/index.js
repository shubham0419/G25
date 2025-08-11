const express = require('express');
const connectDB = require('./db/connectDd');
const app = express();
require("dotenv").config();
const path = require("path")
// routers
const todoRouter = require("./routes/todo.routes") 

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

// routes
app.use("/todo",todoRouter);

connectDB().then(()=>{
  app.listen(process.env.PORT,()=>{
  console.log("server is live");
})
}).catch((err)=>console.log(err))
