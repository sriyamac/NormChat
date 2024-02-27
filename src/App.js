import React, { useState, useRef } from 'react';
import "./styles/App.css";
import { Auth } from './components/Auth.js';
import { ConversationList } from './components/ConversationList.js';
import { Chat } from "./components/Chat.js"
import Cookies from "universal-cookie";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import {Layout} from  "./Layout.js"
import { v4 as uuidv4 } from 'uuid'; //for new room reference 
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config'

const cookies = new Cookies(); //get, set, and remove cookies from browser


function App() { 
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token")) //if there is an auth-token then set to true (you can check by inspecting page manually)

  //once a user logs in, uuidv4 will generate a unique room ID
  const [room, setRoom] = useState(uuidv4()) //for joining different chatbots

  const roomInputRef = useRef(null)


  const signUserOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      setIsAuth(false);
      setRoom(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout signUserOut={signUserOut} setIsAuth={setIsAuth} Auth={Auth} isAuth={isAuth}/>}>
          <Route path="/" element={<Chat room={room} />} />
          <Route path="/conversation-list" element={<ConversationList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

  

    //IMPLEMENTATION BELOW: POSSIBLE ROOM BEFORE ENTERING CHAT
  // return  <div> { room ? ( //if user is authenticated, redircts to chat
  //     <Chat room = {"NormChat"} /> //passes room variable through Chat component

  //     ) : (
  //       <div className = "room"> 
  //         <label> Topic </label> 
  //         <input  ref = {roomInputRef}/> {/**every chat has a reference assigned to it through "ref" */}
  //         <button onClick = {() => setRoom(roomInputRef.current.value)}> Enter Chat </button>  {/**getting value of input and setting it to value of input */}
  //       </div>
  //     )}
  //   </div>;



export default App;
