import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Box } from '@mui/material';

import { UserContext } from '../../userContext'
import Header from '../../components/Header/Header'
import Waves from '../../assets/waves.svg';

const Dashboard = () => {
    const { user } = useContext(UserContext);

    return (
        <>
            {user ? 
            <Box m="20px">
                <Box    
                    display="flex" 
                    justifyContent="space-between" 
                    alignItems="center">
                    <Header
                        title="DASHBOARD"
                        subtitle={`Welcome ${user?.user.profile.name}!`} />
                </Box>
            </Box> : 
            <>
                <Box sx={{  backgroundImage: `url(${Waves})`, 
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed'}} 
                    width="100%" height="100vh">
                    <Header
                            title="ADMIN DASHBOARD"
                            subtitle="Please login or sign up" />
                </Box>
            </>}
        </>
    );
}

export default Dashboard;