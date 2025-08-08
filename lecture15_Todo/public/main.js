const form = document.getElementById("task-form");
const filterButtons = document.getElementById("filter");

form.addEventListener("submit",async(e)=>{
  e.preventDefault();  // stops page refresh
  // const list = form.children  return list of child elements
  const input = form.children[0];
  const task = input.value;   //input value of what user have written
  // const res = await axios.post("http://localhost:4000/todo/create",{task:task})
  const res = await axios.post("http://localhost:4000/todo/create",{task})
  
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