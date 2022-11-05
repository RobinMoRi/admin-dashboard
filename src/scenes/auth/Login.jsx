import React,{ useContext } from 'react';
import { Box, Typography, useTheme, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from "yup";
import PocketBase from 'pocketbase'
import { useNavigate } from 'react-router-dom';

import {UserContext} from '../../userContext'
import { ColorModeContext, tokens } from '../../theme';

const Login = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const client = new PocketBase(import.meta.env.VITE_POCKETBASE_HOST);
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

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

    const login = async (values) => {
        const user = await client.users.authViaEmail(
          values.email, 
          values.password
        );
        console.log(user);
        setUser(user.user);
        navigate('/');
    }


    return (
        <Box width="100%" height="70%" display="flex" justifyContent="center" alignItems="center">
            <Box width="30%" height="60%" display="flex" justifyContent="center" alignItems="center" backgroundColor={colors.primary[400]} borderRadius="12px">
                <form onSubmit={formik.handleSubmit}>
                    <Box padding="20px">
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
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={!!formik.touched.password && !!formik.errors.password}
                            helperText={formik.touched.password && formik.touched.password}
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
    );
}

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

export default Login;
