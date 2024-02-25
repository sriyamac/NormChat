import React, { useState, useRef } from 'react';
import "./styles/App.css";
import { Auth } from './components/Auth.js';
import { Chat } from "./components/Chat.js"
import Cookies from "universal-cookie";
const cookies = new Cookies(); //get, set, and remove cookies from browser


function App() { 
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token")) //if there is an auth-token then set to true (you can check by inspecting page manually)
  const [room, setRoom] = useState(null) //for joining different chatbots, implementation might be removed

  const roomInputRef = useRef(null)

  if (!isAuth) { //user is not authenticated
  return ( //then shows user authentication process 
    <div className = "App">
      <header>
        <h1>NormChat</h1>
      </header>
        <div>
          <Auth setIsAuth = {setIsAuth} /> 
        </div>
        <p>Created by students for students to answer all UNC Charlotte-related questions.</p>
    </div>
  );
  }

  return  <div> { room ? ( //if user is authenticated, redircts to chat
      <Chat room = {room} /> //passes room variable through Chat component

      ) : (
        <div className = "room"> 
          <label> Topic </label> 
          <input  ref = {roomInputRef}/> {/**every chat has a reference assigned to it through "ref" */}
          <button onClick = {() => setRoom(roomInputRef.current.value)}> Enter Chat </button>  {/**getting value of input and setting it to value of input */}
        </div>
      )}
    </div>;

}




export default App;
