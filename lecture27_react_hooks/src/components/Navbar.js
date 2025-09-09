import React from 'react'

const Navbar = ({setter}) => {
  return (
    <div className='flex justify-center items-center'>
      <button onClick={(e)=>{setter((prev)=>prev+1)}}>Incriment From Navbar</button>
    </div>
  )
}

export default Navbar