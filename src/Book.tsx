import React, { useState } from 'react'

function Book() {

    const [counter, setCounter] = useState(0)

    const handleIncrease = () => {
        setCounter((prev)=>prev+1)
    }

  return (
    <div>
        <button onClick={handleIncrease}>counter</button>
        <span>{counter}</span>
    </div>
  )
}

function Child (){

  function sleep (ms: number) {
    const end = Date.now();
    while (Date.now() < end ){
      
    }
  }

  return (
    <div>
      <span>Child</span>
    </div>
  )
}
export default Book;
export { Child }; 
