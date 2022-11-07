import React, { useContext } from 'react';
import { Box, IconButton, useTheme, InputBase, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

import { ColorModeContext, tokens } from '../../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';

import {UserContext} from '../../userContext'


const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();


    return (
        <>
        { user ? 
            <Box display="flex" justifyContent="space-between" p={2}>
                <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
                    <InputBase sx={{ ml: 2, flex: 1}} placeholder="Search"></InputBase>
                    <IconButton type="button" sx={{p: 1}}>
                        <SearchIcon />
                    </IconButton>
                </Box>
                <Box display="flex">
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                    </IconButton>
                    <IconButton>
                        <NotificationsOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <SettingsOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <PersonOutlinedIcon />
                    </IconButton>
                </Box>
            </Box> : 
            <Box display="flex" justifyContent="flex-end" p={2}>
                <Button color="primary" variant="contained" onClick={() => navigate('/login')}>Log in</Button>
                <Button sx={{ml: 2}} color="secondary" variant="contained" onClick={() => navigate('/signup')}>Sign up</Button>
            </Box>}
        </>
    );
}

export default Topbar;