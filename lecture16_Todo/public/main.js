const form = document.getElementById("task-form");
const filterButtons = document.getElementById("filter");
const todoContainer = document.getElementById("todo-container");

getAllTodos();  // when script load this will run
  
form.addEventListener("submit",async(e)=>{
  e.preventDefault();  // stops page refresh
  // const list = form.children  return list of child elements
  const input = form.children[0];
  const task = input.value;   //input value of what user have written
  // const res = await axios.post("http://localhost:4000/todo/create",{task:task})
  const res = await axios.post("http://localhost:4000/todo/create",{task});
  input.value = ""  // input will get empty after todo created
  getAllTodos();
  
})

filterButtons.addEventListener("click",(e)=>{
  const button = e.target.id;
  if(!button) return;
  console.log(button);
  if(button == "all"){
    e.target.className = "active"
  }
  if(button =="active"){
    e.target.className = "active"
  }
  if(button=="completed"){
    e.target.className = "active"
  }

  const filerBtns = filterButtons.children;

  for(let btn of filerBtns){
    if(btn.id !=button){
      btn.className = ""
    }
  }

})


async function getAllTodos(){
  let res = await axios.get("http://localhost:4000/todo/all");
  let todos = res.data.todos;
  renderTodos(todos);
}

function renderTodos(todos){
  todoContainer.innerHTML = "";
  for(let todo of todos){
    const div = document.createElement("div");
    div.className = "todo";
    div.innerHTML = `<h4>${todo.task}</h4> <div>
      <button class="status">${todo.status?"Undo":"Complete"}</button>
      <button class="delete">delete</button>
    </div>`;
    todoContainer.prepend(div);
  }
}