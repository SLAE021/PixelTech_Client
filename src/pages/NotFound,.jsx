import { Link } from "react-router-dom"
import React from 'react'
  

function NotFound() {
  return (
    <div>
      
      <h2>Te has perdido</h2>

      <img/>

      <h5>Click en el Logo para volver a home</h5>

      <Link to={"/"}>
        <img src="./src/assets/notfound.jpg"/>
     </Link>

    </div>
  )
}

export default NotFound