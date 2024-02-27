import {auth, provider} from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import "../styles/App.css";

import Cookies from "universal-cookie";

import { Button, buttonVariants } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Link } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"
const cookies = new Cookies();//get, set, and remove cookies from browser

export const Auth = ({ setIsAuth, setRoom }) => {
  const signInWithGoogle = async () => {
    
    try {
      const result = await signInWithPopup(auth, provider); //logged-in user's info stored in result
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true); //setting authentication to true whenever the uesr logs in

      window.location.href = "/chat"; //redirecting to chatbot

    } catch (x) { //trouble shooting
      console.error(x);
    }
  };
  
  return (
    <div className = "App">
        <header>
          <h1>NormChat</h1>
        </header>
          <div>
            <div className="auth">
              <Card className="w-[350px]">
              <CardHeader>
                <CardTitle> Sign In</CardTitle>
                <CardDescription>Please Sign In with Google to Continue.</CardDescription>
              </CardHeader>
              <CardContent>
                
                  <div  className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                    <Button >   
                    <EnvelopeOpenIcon className="mr-5 h-4 w-4" />  
                    <p onClick={signInWithGoogle}>Sign in with Email</p>
                      </Button>

                  
                    
                  

                  
                    </div>
            
                    
                  </div>
                
              </CardContent>
              <CardFooter className="flex justify-between">
              
              </CardFooter>
            </Card>
            </div>
          <p>Created by students for students to answer all UNC Charlotte-related questions.</p>
      </div>
 
      {/* <p> Sign In With Google To Continue </p>
      <button onClick={signInWithGoogle}> Sign In With Google </button>
    </div> */}
    </div>
    
  );
};