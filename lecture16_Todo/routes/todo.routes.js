const express = require("express");
const Todo = require("../models/todo.model");
const { createTodo, deleteTodo } = require("../controllers/todo.controller");
const router = express.Router();

router.post("/create",createTodo);

router.delete("/delete/:id",deleteTodo);

router.put("/update/:id",async (req,res)=>{
  try {
    const {id} = req.params;
    const todo = await Todo.findById(id);
    todo.status = !todo.status;
    await todo.save();
    res.status(200).json({message:"todo updated successfully"});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})

router.get("/search",async(req,res)=>{
  try {
    const {task} = req.query;
    const matchedTodos = await Todo.find({task:{$regex:task},$options:"i"});
    res.status(200).json({todos:matchedTodos})
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})

router.get("/all",async(req,res)=>{
  try {
    const todos = await Todo.find();
    res.status(200).json({todos})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

router.get("/filter",async (req,res)=>{
  try {
    const {filterName} = req.query;
    if(!filterName){
      throw new Error("filterName is required");
    }
    // filterName - all , active , completed (possible values)
    // all -> return all todos
    // active -> return todos whose status is false
    // completed -> return todos whose status is true
    if(filterName=="all"){
      const todos = await Todo.find();
      return res.status(200).json({todos});
    }
    // Todo.find({status:false}) -> active
    // Todo.find({status:true}) -> completed
    const todos = await Todo.find({status:filterName=="active"?false:true})
    res.status(200).json({todos});
  } catch (error) {
    res.status(200).json({message:error.message})
  }
})

router.delete("/clear/completed",async (req,res)=>{
  try {
    // deletes todos whose status is true i.e "completed"
    await Todo.deleteMany({status:true}); 
    res.status(200).json({message:"todos deleted"});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

module.exports = router;