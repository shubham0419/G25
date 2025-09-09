"use client"

import Navbar from "@/components/Navbar";
import { useState } from "react"

const About = ()=>{
  const [count,setCount] = useState(0);
  // let count = 0;
  // function IncrimentCount(){
  //   count++;
  //   console.log(count);
  // }
  function IncrimentCount(){
    // setCount(count+1);
    setCount((prev)=>prev+1);
  }


  return <>
    <Navbar setter={setCount}/>
    <h1>About page</h1>
    <h2 className="text-4xl text-center">{count}</h2>
    <button onClick={(e)=>{IncrimentCount()}}>Incriment</button>
  </>
}

export default About;