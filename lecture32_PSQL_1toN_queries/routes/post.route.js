const express = require("express");
const prisma = require("../prisma/client");
const router = express.Router();

router.post("/create",async (req,res)=>{
  try {
    const {title,description,userId} = req.body;
    const post = await prisma.post.create({
      data:{title,description,authorId:userId}
    })
    res.status(201).json({post});
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

router.get("/all",async (req,res)=>{
  try {
    // const allPosts = await prisma.post.findMany({
    //   include:{
    //     author:true,
    //     comments:true
    //   }
    // });
    const allPosts = await prisma.post.findMany({
      include:{
        author:true,
        comments:{include:{author:true}}
      }
    });
    res.status(200).json({allPosts})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

// 



module.exports = router;