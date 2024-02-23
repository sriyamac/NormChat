import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    //login logic here
    
    //thinking of using a google sign-in api -sriya

    //redirect to chatbox after successful login
    navigate('/chatbox');
  };

  return (
    <div className="container text-center mt-5">
      <h2>Login Page</h2>
      <form>
        {/* Your login form fields go here */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
