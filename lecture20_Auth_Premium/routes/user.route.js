const express = require("express");
const verifyUser = require("../middleware/verify.middleware");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const router = express.Router();


router.post("/package/buy",verifyUser,async(req,res)=>{
  try {
    const {package} = req.query;
    if(!package){
      throw new Error("package name is required")
    }
    const currUserId = req.user.id;
    const user = await User.findById(currUserId);
    user.package = package;
    if(package=="gold"){
      user.credits += 500;
    }
    if(package=="platinum"){
      user.credits += 1000;
    }
    await user.save();
    res.status(200).json({message:"package bought successfully"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})


router.get("/gold/discount/:productId",async(req,res)=>{
  try {
    const {productId} = req.params;
    const userId = req.user.id;

    const [user,product] = await Promise.all([
      await User.findById(userId),
      await Product.findById(productId)
    ]);

    if(user.credits - (product.price*0.1)<0){
      throw new Error("Not enough credits")
    }

    const discountedPrice = product.price - (product.price*0.1);
    user.credits -= (product.price*0.1);
    await user.save();
    res.status(200).json({newPrice:discountedPrice});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})


router.get("/platinum/discount/:productId",async(req,res)=>{
  try {
    const {productId} = req.params;
    const userId = req.user.id;

    const [user,product] = await Promise.all([
      await User.findById(userId),
      await Product.findById(productId)
    ]);

    if(user.credits - (product.price*0.2)<0){
      throw new Error("Not enough credits")
    }
    
    const discountedPrice = product.price - (product.price*0.2);
    user.credits -= (product.price*0.2);
    await user.save();
    res.status(200).json({newPrice:discountedPrice});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})
module.exports = router;