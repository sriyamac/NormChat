import React from 'react'
import { Redirect } from './Redirect'
import { Outlet } from 'react-router-dom'
export const Home = (isAuth) => {

    return (
        Redirect("/conversation-list", isAuth) //redirects to conversation list if user is authenticated
    );
}
