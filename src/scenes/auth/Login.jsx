import React,{ useContext, useState } from 'react';
import { Box, Typography, useTheme, TextField, Button, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from "yup";
import PocketBase from 'pocketbase'
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { UserContext } from '../../userContext'
import { ColorModeContext, tokens } from '../../theme';
import Waves from '../../assets/waves.svg';

/* TODO
- Add caching/cookie/storage to store user token that should be used in request
- Add checking if user is authenticated through current cookies etc.
*/

const Login = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const client = new PocketBase(import.meta.env.VITE_POCKETBASE_HOST);
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [ showPassword, setShowPassword ] = useState(false);

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
          login(values)
        }
    });

    //TODO: Refactor to own business logic component
    const login = async (values) => {
        const user = await client.users.authViaEmail(
          values.email, 
          values.password
        );
        setUser(user.user);
        navigate('/');
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }


    return (
        <>
        <Box sx={{  backgroundImage: `url(${Waves})`, 
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed'}} 
            width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center" zIndex="1">
            <Box padding="20px" display="flex" justifyContent="center" alignItems="center" backgroundColor={colors.primary[400]} borderRadius="12px">
                <form onSubmit={formik.handleSubmit}>
                    <Box padding="20px">
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <img src="../../../public/logo.png"></img>
                        </Box>
                        <TextField 
                            fullWidth
                            label="Email"
                            variant="filled"
                            type="text"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={!!formik.touched.email && !!formik.errors.email}
                            helperText={formik.touched.email && formik.touched.email}
                            sx={{mb: "20px"}}
                            />
                        <TextField
                            fullWidth
                            label="Password"
                            variant="filled"
                            type={showPassword ? "password" : "text"}
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={!!formik.touched.password && !!formik.errors.password}
                            helperText={formik.touched.password && formik.touched.password}
                            InputProps={{
                                endAdornment: 
                                <InputAdornment position="end" onClick={toggleShowPassword}>
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </InputAdornment>
                            }}
                            />
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Button type="submit" color="secondary" variant="contained">
                            Login
                        </Button>
                    </Box>
                </form>
            </Box>
            </Box>
        </>
    );
}

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

export default Login;
