"use client"

import { useParams } from "next/navigation";

// SSR ( "use server")
// export default ({params})=>{

//   const {id} = params;

//   return <>
//     <h1>Hello {id}</h1>
//   </>
// }

export default ()=>{

  const params = useParams();
  const {id} = params;


  return <>
    <h1>Hello {id}</h1>
  </>
}