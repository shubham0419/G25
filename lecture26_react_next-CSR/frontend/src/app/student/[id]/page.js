"use client"
// export default ({params})=>{

import { useRouter } from "next/router"

//   const {id} = params;

//   return <>
//     <h1>Hello {id}</h1>
//   </>
// }

export default ()=>{

  const router = useRouter();
  const {id} = router.query;


  return <>
    <h1>Hello {id}</h1>
  </>
}