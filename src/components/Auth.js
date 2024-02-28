import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import "../styles/App.css";

import Cookies from "universal-cookie";

import { Button, buttonVariants } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const cookies = new Cookies(); //get, set, and remove cookies from browser

export const Auth = ({ setIsAuth, setRoom }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider); //logged-in user's info stored in result
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);  //setting authentication to true whenever the uesr logs in
      window.location.href = "/chat"; //redirecting to chatbot
    } catch (error) {
      console.error(error); //trouble shooting
    }
  };
  
  return (
    <div className="auth-container">
      <header className="header">
        <h1>NormChat</h1>
      </header>
      <div className="auth-content">
        <Card className="auth-card">
          <div className="card-header">
            <h2>Sign In</h2>
          </div>
          <div className="card-content">
            <Button variant={buttonVariants.primary} onClick={signInWithGoogle}>
             Please Sign In with Google to Continue
            </Button>
            <div className="separator">or</div>
            <Input type="email" placeholder="Enter your email" />
            <Input type="password" placeholder="Enter your password" />
            <Button variant={buttonVariants.secondary}>Sign in with Email</Button>
          </div>
          <div className="card-footer">
            <p>Created by students for students to answer all UNC Charlotte-related questions.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};