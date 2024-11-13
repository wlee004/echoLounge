"use client"
import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


// TODO This is just example, please remove "use client" later on


const Page = () => {
  const [message, setMessage] = useState("LOADING...")

  useEffect(() => { 
    fetch("http://localhost:8080/").then(
      response => response.json()
    ).then(
      data => { 
        console.log(data)
        setMessage(data.message)
      }
    )
  })
  return (
    <div>
      <div>{message}</div>
    </div>
  )
}

export default Page
