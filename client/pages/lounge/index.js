import React from 'react'
//const { io } = require("socket.io-client");
//const socket = io('http://localhost:8080');

// Components 
import SearchBar from '../../components/searchbar'

export default function Lounge() {
  
  //socket.emit("message", "We are connected through websocket")
  

  return (
    <div>
      <header>
        <nav className= "navbar bg-body-tertiary" data-bs-theme="dark">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Echo Lounge</span>
          </div>
        </nav>
      </header>
      <SearchBar/>
    </div>
  )
}
