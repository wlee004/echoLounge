import React from 'react'
const { io } = require("socket.io-client");
//const socket = io('http://localhost:8080');

// Components 
import SearchBar from '../../components/searchbar'

export default function Lounge() {
  
  //TODO Get all features working with socket,
  //TODO set the lounge page as a group that multiple clients can join in and out from
  //TODO make a middle page that either makes new group for people to join, or join existing group
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
