const express = require("express");
const prisma = require("../prisma/client");
const router = express.Router();

router.post("/create",async (req,res)=>{
  try {
    const {name,email} = req.body;
    // const user = await prisma.user.create({
    //   data:{name,email}
    // })
    const user = await prisma.user.create({
      data:{name,email,
        posts:{
          create:{
            title:"first post",
            description:"this is my first post when user created"
          }
        }
      }
    })
    res.status(201).json({user});
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

module.exports = router;