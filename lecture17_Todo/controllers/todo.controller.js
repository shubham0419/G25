const Todo = require("../models/todo.model");

const createTodo = async(req,res)=>{
  try {
    const {task} = req.body;
    const todo = await Todo.create({
      task
    });
    res.status(201).json({todo,message:"todo created successfully"});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const deleteTodo = async (req,res)=>{
  try {
    const {id} = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({message:"todo deleted successfully"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

module.exports = {createTodo,deleteTodo}