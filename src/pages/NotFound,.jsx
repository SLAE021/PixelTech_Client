import { Link } from "react-router-dom"
import React from 'react'
  

function NotFound() {
  return (
    <div>
      
      <h2>Seems you are lost</h2>

      <img/>

      <h5>Click on the Logo to go back home</h5>

      <Link to={"/"}>
        <img src="./src/assets/notfound.jpg"/>
     </Link>

    </div>
  )
}

export default NotFound