import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Handling login...');
    navigate('/chat'); //redirect to chatbox after successful login
  };

  const responseGoogle = (response) => {
    //access user details from 'response.profileObj'
    console.log('Google Sign-In success:', response);

    //call backend API to verify the Google ID token and perform login
    handleLogin(); //if succesful, then navigate to chatbox but its currently not working :/

  };

  return (
    <div className="container text-center mt-5">
      <h2>Login Page</h2>
      <form>
        {/* adding login fields here in future*/}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input type="text" className="form-control" id="username" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <div className="mt-3">
          <GoogleLogin
            clientId="550152795309-vqsjv2qumj1ia8g8v6lv0ind28742pfg.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={(error) => console.error('Google Sign-In error:', error)}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
