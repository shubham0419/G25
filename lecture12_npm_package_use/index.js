const express = require("express");
const app = express();
const PORT = 5000;
const {generateOtp,verifyOtp} = require("@shubhamo7/otp-handle")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {	});

app.get("/otp/generate",(req,res)=>{
  try {
    let otp = generateOtp(4);
    res.status(200).json({otp});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

app.post("/otp/verify",(req,res)=>{
  try {
    const {otp} = req.body;
    verifyOtp(otp);
    res.status(200).json({message:"user verified"});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

app.listen(PORT, () => console.log("Server running on port " + PORT));