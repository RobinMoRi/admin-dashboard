import React, { useState, useContext, useEffect }  from 'react';
import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { tokens } from '../../theme';
import {UserContext} from '../../userContext'
import PocketBase from 'pocketbase'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return(
        <MenuItem 
            active={selected === title}
            style={{color: colors.grey[100]}}
            onClick={()=>setSelected(title)}
            icon={icon}>
            <Typography>{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    )
}


const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');
    const {user, setUser} = useContext(UserContext);
    const client = new PocketBase('http://127.0.0.1:8090');

      const login = async () => {
    const user = await client.users.authViaEmail(
      'robin.moreno.rinding@gmail.com', 
      import.meta.env.VITE_POCKETBASE_PASSWORD
    );
    console.log(user);
    setUser(user.user);
  }

  // Change logic!!
  useEffect(() => {
    login();
  }, []);

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important"
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important"
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important"
                }
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100]
                        }}
                    >
                        {!isCollapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <Typography variant="h4" color={colors.grey[100]}>ROBIN ADMIN</Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img 
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={"https://media-exp1.licdn.com/dms/image/C4E03AQEbk7_OvjlwHg/profile-displayphoto-shrink_200_200/0/1620939822491?e=1672272000&v=beta&t=uFDtLyJbunnBeC_F_dYV0598d3tZaOpcnL4yLl-G9bQ"}
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%"
                                    }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography 
                                    variant="h3" 
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{
                                        m: "10px 0 0 0"
                                    }}
                                >{user ? user.profile.name : 'Not logged in'}</Typography>
                                <Typography
                                    variant="h5" 
                                    color={colors.greenAccent[500]}
                                    fontWeight="bold"
                                    sx={{
                                        m: "10px 0 0 0"
                                    }}>Admin</Typography>
                            </Box>
                        </Box>
                    )}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item 
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography 
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >Data</Typography>
                        <Item 
                            title="Manage Team"
                            to="/team"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item 
                            title="Contacts"
                            to="/contacts"
                            icon={<ContactsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item 
                            title="Invoices Balances"
                            to="/invoices"
                            icon={<ReceiptOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography 
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >Pages</Typography>
                        <Item 
                            title="Profile Form"
                            to="/form"
                            icon={<PersonOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item 
                            title="Calendar"
                            to="/calendar"
                            icon={<CalendarTodayOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item 
                            title="FAQ"
                            to="/faq"
                            icon={<HelpOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography 
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >Charts</Typography>
                        <Item 
                            title="Bar chart"
                            to="/bar"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item 
                            title="Pie Chart"
                            to="/pie"
                            icon={<PieChartOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item 
                            title="Line Chart"
                            to="/line"
                            icon={<TimelineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item 
                            title="Geography Chart"
                            to="/geography"
                            icon={<MapOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>


        </Box>
    );
}

export default Sidebar;