const express = require("express");
const { genericMid, pathSpecific, userVerify } = require("./middleware");
const app = express();
const PORT = 4000;


// app.use((req,res,next)=>{
//   console.log("generic middleware");
//   next();
// })
app.use(genericMid);

// app.use("/user",(req,res,next)=>{
//   console.log("/user path middleware");
//   next()
// });
app.use(pathSpecific);

app.get("/user",userVerify,(req,res,next)=>{
  console.log("/user api");
  res.send("ok");
  // next(); // this will pass the req to next app.get("/user")
})

app.get("/user",(req,res)=>{
  console.log("/user apiv2");
  res.send("ok 2");
})

app.get("/",(req,res)=>{
  console.log("home route");
  res.send("ok");
})

app.listen(PORT,()=>{
  console.log(`app live on ${PORT}`);
});