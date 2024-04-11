import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import "../styles/App.css";
import Cookies from "universal-cookie";
import { Card } from "../components/ui/card";


const cookies = new Cookies(); //get, set, and remove cookies from browser

export const Auth = ({ setIsAuth, setRoom }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider); //logged-in user's info stored in result
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);  //setting authentication to true whenever the uesr logs in
      window.location.href = "/new-chat"; //redirecting to new-chat to create new chat
    } catch (error) {
      console.error(error); //trouble shooting
    }
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        <h1>NormChat</h1>
      </header>
      <div className="auth-content">
        <Card className="auth-card">
          <div className="card-header">
            <h2 className="pb-2.5 text-lg">Sign In</h2>
          </div>
          <div className="card-content">
            <button className="btn btn-success" onClick={signInWithGoogle}>Sign in with Google</button>
            <div className="separator">or</div>
            <form className="mb-1">
              <input type="email" placeholder="Email" className="input input-bordered w-full max-w-xs mb-1 p-1.5 border rounded" />
              <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs p-1.5 border rounded" />
            </form>
            <button className="btn btn-success btn-wide w-full">Sign in with Email</button>
          </div>
          <div className="card-footer">
            <p>Created by students for students to answer all UNC Charlotte-related questions.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
