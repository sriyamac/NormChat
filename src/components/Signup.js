import { Card } from "../components/ui/card";
import "../styles/App.css";

export const Signup = () => {
  return (
    <div className="auth-container">
      <header className="auth-header">
        <h1>NormChat</h1>
      </header>
      <div className="auth-content">
        <Card className="auth-card">
          <div className="card-header">
            <p className="pb-3 text-xl">Sign Up</p>
          </div>
          <div className="card-content">
            <form className="mb-1">
              <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs mb-1 p-1.5 border rounded" />
              <input type="email" placeholder="Email" className="input input-bordered w-full max-w-xs mb-1 p-1.5 border rounded" />
              <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs p-1.5 border rounded" />
            </form>
            <button className="btn btn-success btn-wide w-full mb-2.5">Sign in</button>
            <button className="btn btn-success btn-wide w-full">Sign up</button>
          </div>
          <div className="card-footer">
            <p>Created by students for students to answer all UNC Charlotte-related questions.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}