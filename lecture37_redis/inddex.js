const express = require("express");
const client = require("./client");
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// string data type
app.get("/",async (req, res) => {
  try {
    const res1 = await client.set("users:10","test 2",'nx');
    console.log(res1);

    const res2 = await client.expire("users:10",7)

    const data = await client.get("users:10")
    const datas = await client.mget("users:10","users:1","users:2");
    res.json({data,datas})
  } catch (error) {
    console.log(error);
  }
});

// list data type
app.get("/list",async (req,res)=>{
  try {
    const res1 = await client.lpush("mylist",1);
    const res2 = await client.rpush("mylist",2);

    const data = await client.lrange("mylist",0,-1);
    res.json({data})
  } catch (error) {
    console.log(error);
  }
})

// sets data type
app.get("/sets",async (req,res)=>{
  try {
    const res1 = await client.sadd("myset","hello",7);
    const res2 = await client.sadd("myset","hel",14);
    const res3 = await client.sadd("myset",1,21);

    const allKeys = await client.smembers("myset");
    const isExist = await client.sismember("myset","hello");
    res.json({allKeys,isExist})
  } catch (error) {
    console.log(error);
  }
})

app.listen(PORT, () => console.log("Server running on port " + PORT));