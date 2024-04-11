import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from './Auth.js'


export function Redirect(destination, isAuth) { //redirects to desired destination if user is authenticated
    const isAuthenticated = isAuth;
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(destination);
        }

    }, [destination, navigate]);

}
