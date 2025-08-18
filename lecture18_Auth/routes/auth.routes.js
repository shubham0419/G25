const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/signup",async (req,res)=>{
  try {
    let {name,email,password} = req.body;
    if(!name || !email || !password){
      throw new Error("All fields are required");
    }
    const hashPass = await bcrypt.hash(password,10);

    let user = await User.create({
      name:name,
      email:email,
      password:hashPass
    })
    res.status(200).json({message:"user signup successfull",user})
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})

router.post("/login",async (req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email:email}).select("+password");
    if(!user){
      throw new Error("Invalid email or password")
    }
    const isMatched = await bcrypt.compare(password,user.password);
    if(!isMatched){
      throw new Error("Invalid email or password")
    }
    res.status(200).json({message:"user loggedin successfull"})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

module.exports = router;

