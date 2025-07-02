const express = require("express");
const app = express();
const PORT = 4000;

app.get("/",(req,res)=>{
  res.send("server online")
});

app.post("/user",(req,res)=>{  // not work in browser
  console.log("hiii");
  res.send("hello");
})

app.listen(PORT,()=>{
  console.log(`server live on ${PORT}`);
});