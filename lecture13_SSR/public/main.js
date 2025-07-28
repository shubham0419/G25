const container = document.getElementById("container")

async function getUser(){
  let res = await axios.get("http://localhost:5000/user");
  let user = res.data.result;

  const h2 = document.createElement("h2");
  h2.innerText = `${user.name}`;

  container.innerHTML = `<p>${user.email}</p> <p>${user.age}</p>`;
  // container.append(h2);  
  container.prepend(h2)
}

getUser();