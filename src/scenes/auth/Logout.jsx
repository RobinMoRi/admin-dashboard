import React, { useContext, useState } from 'react';
import { UserContext } from '../../userContext'
import { Button } from '@mui/material';
import PocketBase from 'pocketbase';
import { useNavigate } from 'react-router-dom';

const Logout = ({children}) => {
    const client = new PocketBase(import.meta.env.VITE_POCKETBASE_HOST);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    

    const logoutUser = () => {
        setUser(null);
        client.authStore.clear();
        navigate('/');
    }

    return (
        <Button sx={{ml: 2}} color="secondary" variant="contained" onClick={logoutUser}>
            Logout
        </Button>
    );
}

export default Logout;
