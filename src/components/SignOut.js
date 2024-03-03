import { Outlet, Link } from "react-router-dom";
import { Auth } from './Auth.js';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid'; //for new room reference
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config'
import Cookies from 'universal-cookie'; //for setting cookies





const cookies = new Cookies(); //get, set, and remove cookies from browser
export const SignOut = ({ }) => {


  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
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
  //if there is an auth-token then set to true (you can check by inspecting page manually)

  //once a user logs in, uuidv4 will generate a unique room ID


  return (
    <>
      <Outlet />
      {isAuth && (
        <div className="sign-out">
          <button onClick={signUserOut}> SIGN OUT </button>
        </div>
      )}
      {!isAuth && (
        <Auth setIsAuth={setIsAuth} />
      )}
    </>
  );
};
