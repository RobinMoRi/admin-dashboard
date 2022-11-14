import React, { useEffect, useContext, useState, Suspense } from 'react';
import { Box, Typography, useTheme, CircularProgress } from '@mui/material';
import { tokens } from '../../theme';
import { DataGrid } from '@mui/x-data-grid';

import Header from '../../components/Header/Header';
import PocketBase from 'pocketbase'
import { Login } from '../auth'
import { UserContext } from '../../userContext'


const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const client = new PocketBase(import.meta.env.VITE_POCKETBASE_HOST);
    const {user, setUser} = useContext(UserContext);
    const [ team, setTeam ] = useState();

    const getUsers = async () => {
        const pageResult = await client.users.getList(1, 100);
        setTeam(pageResult.items);
    }

    useEffect(() => {
        getUsers();
    }, [])

    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        { 
            field: "profile", 
            headerName: "Name", 
            flex: 1, 
            cellClassName: "name-column--cell",
            renderCell: (params) => {
                return <div>{params.row.profile.name}</div>;
            }
        },
        { field: "email", headerName: "Email", flex: 1}
    ];



    return (
        <>
    {!user.isAdmin ? <Login adminLogin={true} /> :       

        <Box m="20px">
            <Header title="TEAM" subtitle="Managing the Team Members" />
            <Box m="40px 0 0 0" height="75vh"
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell' : {
                        borderBottom: 'none',
                    },
                    '& .name-column--cell': {
                        color: colors.greenAccent[300]
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: 'none'
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: colors.primary[400]
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none',
                        backgroundColor: colors.blueAccent[700]
                    }
                }}>
                    {team ? <DataGrid 
                        rowsPerPageOptions={[5, 10, 20]}
                        rows={team}
                        columns={columns}/> : <CircularProgress color="secondary" />}
            </Box>
        </Box>}
        </>
    );
}

export default Team;
