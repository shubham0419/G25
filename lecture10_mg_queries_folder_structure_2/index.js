const express = require("express");
const connectDB = require("./db/connectDb");
const User = require("./models/user.model");
const app = express();
const PORT = 4000;
require("dotenv").config();
// Routers
const userRouter = require("./routes/user.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api",userRouter);

// app.get("/",async (req, res) => {
//   const user = await User.create({
//     name:"user 1",
//     email:"user1@gmail.com",
//   })
//   res.status(201).json({user});
// });

// app.post("/user/create",async (req, res) => {
//   try {
//     const {name,email,age} = req.body;
//     // const user = await User.create({
//     //   name:name,
//     //   email:email,
//     //   age:age
//     // })
//     // const user = await User.create({
//     //   name,
//     //   email,
//     //   age
//     // })
//     const user = new User({           // creates doccument only
//       name,
//       email,
//       age
//     })
//     await user.save();               // save doccument to database
//     res.status(201).json({user});
//   } catch (error) {
//     res.status(500).json({message:error.message})
//   }
// });

// app.put("/user/update/:id",async(req,res)=>{
//   try {
//     const {id} = req.params;
//     const {name,age} = req.body;
//     // const result = await User.findByIdAndUpdate(id,{name:name,age:age});
//     const result = await User.updateOne({_id:id},{name:name,age:age})
//     res.status(200).json({message:"user updated successsfully",result});
//   } catch (error) {
//     res.status(500).json({message:error.message})
//   }
// })

connectDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
})
.catch((error)=>console.log(error))
