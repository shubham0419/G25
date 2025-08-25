const express = require("express");
const connectDB = require("./db/connectDd");
const app = express();
const PORT = 5000;
require("dotenv").config();
// router
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.route")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/auth",authRouter);
app.use("/user",userRouter);
app.get("/", (req, res) => {	});

connectDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
}).catch((error)=>console.log(error))
