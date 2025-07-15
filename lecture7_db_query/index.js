const  express = require("express");
const app = express();
const PORT = 5000;
const {MongoClient} = require("mongodb");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new MongoClient(process.env.DB_URI);
let userCollection;

async function connectDB(){
  await client.connect();
  const db = client.db("G25");
  userCollection = db.collection("users");
  return 'done';
}

app.post("/user",async (req, res) => {
  try {
    const {name,email,password} = req.body;
    const result = await userCollection.insertOne({name,email,password});
    res.status(201).json({result})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});

app.post("/users",async(req,res)=>{
  try {
    const {users} = req.body;
    const result = await userCollection.insertMany(users);
    res.status(201).json({result});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

app.delete("/user/:id",async(req,res)=>{
  try {
    const {id} = req.params;
    const result = await userCollection.deleteMany({_id:id});
    res.status(200).json({result,message:"user delted successfully"});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

app.listen(PORT, () =>{
  connectDB().then(()=>{
    console.log("db connected");
  }).catch((err)=>{
    console.log(err);
  })
  console.log("Server running on port " + PORT)
});