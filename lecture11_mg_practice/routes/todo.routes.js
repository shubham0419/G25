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

module.exports = router;