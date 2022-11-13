import React,{ useContext, useState } from 'react';
import { Box, Typography, useTheme, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from "yup";
import PocketBase from 'pocketbase'
import { useNavigate } from 'react-router-dom';

import {UserContext} from '../../userContext'
import { ColorModeContext, tokens } from '../../theme';
import Waves from '../../assets/waves.svg';

const Signup = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const client = new PocketBase(import.meta.env.VITE_POCKETBASE_HOST);
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          passwordConfirm: ''
        },
        validationSchema: signupSchema,
        onSubmit: (values) => {
          signup(values)
        }
    });

    //TODO: Refactor to own business logic component
    const signup = async (values) => {
        try{
            await client.users.create({
                email: values.email, 
                password: values.password,
                passwordConfirm: values.passwordConfirm
            })
        }catch(exception){
            setError(exception.message);
        }

        const user = await client.users.authViaEmail(
            values.email, 
            values.password
        );

        setUser(user.user);
        //Login user
        navigate('/');
    }


    return (
        <>
        <Box sx={{  backgroundImage: `url(${Waves})`, 
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed'}} 
            width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">
            <Box padding="20px" display="flex" justifyContent="center" alignItems="center" backgroundColor={colors.primary[400]} borderRadius="12px">
                <form onSubmit={formik.handleSubmit}>
                    <Box padding="20px">
                    {error ? <Typography color={colors.redAccent[600]} fullWidth>{error}</Typography> : undefined}
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
                            sx={{mb: "20px"}}
                            />
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            variant="filled"
                            type="password"
                            name="passwordConfirm"
                            value={formik.values.passwordConfirm}
                            onChange={formik.handleChange}
                            error={!!formik.touched.passwordConfirm && !!formik.errors.passpasswordConfirmword}
                            helperText={formik.touched.passwordConfirm && formik.touched.passwordConfirm}
                            />
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Button type="submit" color="secondary" variant="contained">
                            Sign Up
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
        </>
    );
}

const signupSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    passwordConfirm: yup.string().required("required").oneOf([yup.ref('password'), null], 'Passwords must match')
});

export default Signup;
