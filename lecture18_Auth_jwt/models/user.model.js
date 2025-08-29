const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    select:false   // this field will not be available in user data when we extract a user from DB
  }
},{
  timestamps:true  // createdAt and updatedAt fields
});

const User = mongoose.model("User",userSchema);
module.exports = User
