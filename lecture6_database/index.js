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

app.get("/", (req, res) => {	});

app.listen(PORT, () =>{
  connectDB().then(()=>{
    console.log("db connected");
  }).catch((err)=>{
    console.log(err);
  })
  console.log("Server running on port " + PORT)
});