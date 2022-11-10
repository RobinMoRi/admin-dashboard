import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Box } from '@mui/material';

import { UserContext } from '../../userContext'

import Header from '../../components/Header/Header'

const Dashboard = () => {
    const { user } = useContext(UserContext);

    return (
        <Box m="20px">
            <Box>
                <Header
                    title="DASHBOARD"
                    subtitle={`Welcome ${user?.profile.name}!`}>

                </Header>
            </Box>
        </Box>
    );
}

export default Dashboard;