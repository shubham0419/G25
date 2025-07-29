
const filterButtons = document.getElementById("filter");

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