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
const Product = require("./models/product.model");

app.use(cookieParser());
app.set("view engine","ejs");
app.set('views',path.join(__dirname,"views"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",verifyUser,async(req,res)=>{
  try {
    const products = await Product.find();
    res.render("home",{products});
  } catch (error) {
    res.status(400).json({message:error.message});
  }
  
})
// routes
app.use("/auth",authRouter);
app.use("/user",userRouter);

connectDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
}).catch((error)=>console.log(error))
