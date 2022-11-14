import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import SentimentDissatisfiedOutlined from '@mui/icons-material/SentimentDissatisfiedOutlined';


const NotFound = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box 
            display="flex-row" 
            textAlign="center"
            height="70%"

            >
            <SentimentDissatisfiedOutlined sx={{ fontSize: "202px"}}/>
            <Typography variant="h1" sx={{ fontSize: "102px"}} color={colors.grey[100]}>404</Typography>
            <Typography variant="h4" color={colors.redAccent[100]}>Page Not Found</Typography>
        </Box>
    );
}

export default NotFound;
