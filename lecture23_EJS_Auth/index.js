const express = require("express");
const connectDB = require("./db/connectDd");
const app = express();
const path = require("path");
const PORT = 5000;
require("dotenv").config();
const cookieParser = require("cookie-parser");
// router
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.route");
const verifyUser = require("./middleware/verify.middleware");

app.use(cookieParser());
app.set("view engine","ejs");
app.set('views',path.join(__dirname,"views"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",verifyUser,(req,res)=>{
  const name = "shubham";
  const contacts = [{name:"Contact 1",phone:9328469324},
    {name:"Contact 2",phone:8758757656}]
  res.render("hello",{name:name,contacts})
  // upper line is same as bellow
  // res.render("hello",{username:name,contacts:contacts})
})
// routes
app.use("/auth",authRouter);
app.use("/user",userRouter);

connectDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
}).catch((error)=>console.log(error))
