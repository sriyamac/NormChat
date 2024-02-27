import { Outlet, Link } from "react-router-dom";
import { Auth } from './components/Auth.js';


export const Layout = ({signUserOut, setIsAuth, isAuth}) => {
  return (
    <>
      <Outlet />
      {isAuth && (
        <div className="sign-out">
          <button onClick={signUserOut}> SIGN OUT </button>
        </div>
      )}
      {!isAuth && (
        <div className="App">
          <Auth setIsAuth={setIsAuth} />
          <p>Created by students for students to answer all UNC Charlotte-related questions.</p>
        </div>
      )}
    </>
  );
};
