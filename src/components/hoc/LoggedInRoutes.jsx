import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../../userContext'

// These routes are only accessible if user is logged out!

const LoggedInRoutes = () => {
    const { user } = useContext(UserContext);

    return (
        !user ? <Outlet /> : <Navigate to="/"/>
    );
}

export default LoggedInRoutes;
