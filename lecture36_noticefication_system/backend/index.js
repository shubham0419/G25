const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const socket = require("socket.io");
const {v4:uuid} = require("uuid");
const io = socket(server,{
  cors:{
    origin:"https://g25-insm.vercel.app/",
  }
});
const PORT = 4000;
const path = require("path");

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")))

//{ 
// "username":"socket.id"
// "username2":socket.id
// }
const Users = {};

//  post - > {
  // id.  ->.  
  // author  -> username
  // content  ->string
  // likes -> [username]
  // createdAt -> date
// }
let Posts = [];


// tasks --------
// 1. real time likes update on posts
// 2. real time posts update on posts
// 3. user get notification when someone likes their post

io.on("connection",(client)=>{
  console.log("User 1 connected -> ",client.id);
  
  // register user
  client.on("register",(username)=>{
    Users[username] = client.id
  })
  
})

app.post("/post/create",async (req,res)=>{
  try {
    const {username,content} = req.body;
    const post = {
      id:uuid(),
      author:username,
      content,
      likes:[],
      createdAt: new Date()
    }
    Posts.unshift(post);
    io.emit("post update",Posts);
    res.status(201).json({posts:Posts})
  } catch (error) {
    res.status(401).json({message:error.message})
  }
})

app.get("/post/all",async (req,res)=>{
  res.status(200).json({posts:Posts})
})


// let obj = {
// "shubham":"skhjdfbwehijfbvweikbrkb"
// }

// obj["shubham"] -> socketId

app.post("/post/like/:id/:username",(req,res)=>{
  try {
    const {id,username} = req.params;
    // [post,post,updated post, post ,post]
    let userPost;
    Posts = Posts.map((post)=>{
      if(post.id == id ){
        if(post.likes.includes(username)){
          throw new Error("alreday liked the post");
        }
        userPost = post;
        post.likes.push(username);
      }
      return post;
    })

    if(Users[userPost.author] && username != userPost.author){
      io.to(Users[userPost.author]).emit("notice",`${username} liked your post ${userPost.content}`)
    }
    io.emit("post update",Posts);
    
    res.status(200).json({message:"post updated successfully"})
  } catch (error) {
    res.status(401).json({message:error.message})
  }
})

app.get("/", (req, res) => {
  res.send("server running");
});



server.listen(PORT, () => console.log("Server running on port " + PORT));