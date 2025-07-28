const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,"public")))

app.get("/", (req, res) => {
  res.send("server is running");
});

app.get("/user",(req,res)=>{
  let user = {
    name:"dummy user",
    email:"dummy@gmail.com",
    age:21
  }
  res.status(200).json({result:user});
})

app.get("/contact",(req,res)=>{
  res.redirect("contact.html");
})

app.listen(PORT, () => console.log("Server running on port " + PORT));