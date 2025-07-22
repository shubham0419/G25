const User = require("../models/user.model");

// const createUser = async (req, res) => {
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
// }

// const updateUser = async(req,res)=>{
//   try {
//     const {id} = req.params;
//     const {name,age} = req.body;
//     // const result = await User.findByIdAndUpdate(id,{name:name,age:age});
//     const result = await User.updateOne({_id:id},{name:name,age:age})
//     res.status(200).json({message:"user updated successsfully",result});
//   } catch (error) {
//     res.status(500).json({message:error.message})
//   }
// }

// const deleteUser = async (req,res)=>{
//   try {
//     const {id} = req.params;
//     await User.findByIdAndDelete(id);
//     res.status(200).json({message:"user deleted successfully"});
//   } catch (error) {
//     res.status(500).json({message:error.message})
//   }
// }
// module.exports = {createUser,updateUser,deleteUser}

module.exports.createUser = async (req, res) => {
  try {
    const {name,email,age} = req.body;
    // const user = await User.create({
    //   name:name,
    //   email:email,
    //   age:age
    // })
    // const user = await User.create({
    //   name,
    //   email,
    //   age
    // })
    const user = new User({           // creates doccument only
      name,
      email,
      age
    })
    await user.save();               // save doccument to database
    res.status(201).json({user});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

module.exports.updateUser = async(req,res)=>{
  try {
    const {id} = req.params;
    const {name,age} = req.body;
    // const result = await User.findByIdAndUpdate(id,{name:name,age:age});
    const result = await User.updateOne({_id:id},{name:name,age:age})
    res.status(200).json({message:"user updated successsfully",result});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

module.exports.deleteUser = async (req,res)=>{
  try {
    const {id} = req.params;
    // await User.findByIdAndDelete(id);
    const result = await User.deleteOne({_id:id});
    res.status(200).json({message:"user deleted successfully"});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}