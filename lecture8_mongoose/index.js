const express = require("express");
const connectDB = require("./db/connectDb");
const User = require("./models/user.model");
const app = express();
const PORT = 4000;
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",async (req, res) => {
  const user = await User.create({
    name:"user 1",
    email:"user1@gmail.com",
  })
  res.status(201).json({user});
});

connectDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
})
.catch((error)=>console.log(error))
