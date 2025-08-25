const express = require("express");
const connectDB = require("./db/connectDd");
const app = express();
const path = require("path");
const PORT = 5000;
require("dotenv").config();
// router
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.route")

app.set("view engine","ejs");
app.set('views',path.join(__dirname,"views"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
  res.render("hello")
})
// routes
app.use("/auth",authRouter);
app.use("/user",userRouter);

connectDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
}).catch((error)=>console.log(error))
