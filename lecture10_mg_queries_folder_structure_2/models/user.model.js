const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // name:String,
  name:{
    type:String,
    maxLength:16,
    required:true  // makes an attribute compulsory 
  },
  email:{
    type:String,
    required:true,
    unique:true, // one email can be used only one time
  },
  age:{
    type:Number,
    min:1 // minimum value user can give
  }
})

const User = mongoose.model("User",userSchema); // model -> create 
module.exports = User;