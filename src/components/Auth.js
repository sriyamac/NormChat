import {auth, provider} from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import "../styles/App.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();//get, set, and remove cookies from browser

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider); //logged-in user's info stored in result
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true); //setting authentication to true whenever the uesr logs in
    } catch (x) { //trouble shooting
      console.error(x);
    }
  };
  return (
    <div className="auth">
      <p> Sign In With Google To Continue </p>
      <button onClick={signInWithGoogle}> Sign In With Google </button>
    </div>
  );
};