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

router.get("/all",async (req,res)=>{
  try {
    const users = await prisma.user.findMany({
      include:{posts:true},
      orderBy:{createdAt:"desc"}
    })
    res.status(200).json({users})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

router.post("/transfer",async(req,res)=>{
  try {
    const {senderId,receiverId,amount} = req.body;

    const transaction = await prisma.$transaction(async(tx)=>{
      const sender = await tx.user.findUnique({
        where:{id:senderId}
      })
      // step 1 -> balnce check
      if(!sender || sender.balance <=amount){
        throw new Error("Insufficient balance")
      }

      // step 2 amount deduction
      await tx.user.update({
        where:{id:senderId},
        // data:{balance:sender.balance-amount}
        data:{balance:{decrement:amount}}
      })

      // step 3 -> recever balnce update
      await tx.user.update({
        where:{id:receiverId},
        data:{balance:{increment:amount}}
      })
 
      // step 4 -> tranction table enry (history)
      const trns = await tx.transaction.create({
        data:{amount,senderId,receiverId}
      })
      n
      return trns;
    })
            
    res.status(203).json({transaction});
  } catch (error) {
    res.status(404).json({message:error.message});
  }
})

module.exports = router;