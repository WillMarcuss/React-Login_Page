import './App.css';
import React, { useEffect, useState } from "react";
import Axios from 'axios'

let credentials = []

function App() {

  const [username,setUsername] = useState('')
  const [password, setPassword] = useState('')


  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      credentials = response.data
    })
  }, [])

  return (
    <div className="allWrapper">
      <div className="middle">
        <div className="login">
          <h1 className="title">Login</h1>
          <input id="username" className="field un" type="text" placeholder="Enter username" onChange={(e)=>{
            setUsername(e.target.value)
          }}></input>
          <br></br>
          <input id="password" className="field pw" type="password" placeholder="Enter password" onChange={(e)=>{
            setPassword(e.target.value)
          }}></input>
          <br></br>
          <button id="loginButton" className="button" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

function handleLogin() {
  let username = document.getElementById("username").value
  let password = document.getElementById("password").value
  let userExists = false

  for(let i=0; i<credentials.length; i++){
    console.log(credentials[i])
    if(username == credentials[i].Username){
      userExists = true
      break;
    }
  }
  if(userExists == false){
    Axios.post('http://localhost:3001/api/insert',
    {username:username, 
      password:password
    }).then(()=>{
      alert("Successful insert")
    })
    window.open("/Users/williammarcus/Desktop/react-app/loginpage/client/src/home.js")
  } else{
    alert("Username already exists")
    userExists = false
  }



}



export default App;
