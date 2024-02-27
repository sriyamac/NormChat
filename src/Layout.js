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
        <Auth setIsAuth={setIsAuth} />
      )}
    </>
  );
};
