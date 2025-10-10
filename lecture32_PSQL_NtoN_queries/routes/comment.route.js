const express = require("express");
const prisma = require("../prisma/client");
const router = express.Router();

router.post("/create",async (req,res)=>{
  try {
    const {comment,userId,postId} = req.body;
    const post = await prisma.comment.create({
      data:{comment,authorId:userId,postId}
    })
    res.status(201).json({post});
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})



module.exports = router;