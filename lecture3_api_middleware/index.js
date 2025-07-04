const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

app.use((req,res,next)=>{
  console.log("generic middleware 1");
  next(); 
})

app.get("/user",(req,res)=>{
  console.log(req.query);
  const userName = req.query.name;
  const {name,number} = req.query;
  // const {number,name} = req.query; // this is same as above
  console.log(name);
  res.status(200).send("ok");
});

app.get("/user/:id",(req,res)=>{
  console.log(req.params);
  const {id} = req.params;
  console.log(id);
  res.send("ok");
})

app.get("/user/:id/:userId",(req,res)=>{
  console.log(req.params);
  const {id} = req.params;
  console.log(id);
  res.send("ok");
})

app.listen(PORT,()=>{
  console.log(`server live on ${PORT}`);
})