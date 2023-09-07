import React, {useEffect, useState} from "react";
import {Button, Container, TextField, Snackbar, Alert} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {CardContent} from "@material-ui/core";
import ApiService from "../services/ApiService";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false)

    // const [invalidLogin, setInvalidLogin] = useState(false)

    const navigate = useNavigate()
    const jwtToken = localStorage.getItem('jwtToken');

    const checkTokenValidity = () => {
        fetch('/api/verify_jwt', {
            headers: {Authorization: `Bearer ${jwtToken}`},
        }).then((response) => {
            if (response.ok) {
                debugger
                navigate('/application/dashboard')
            }
        })
    };

    useEffect(() => {
        checkTokenValidity()
    }, [jwtToken])

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

        setEmail('')
        setPassword('')

        ApiService.login({ email: email, password: password }).then((response) => {
            // Save the token in local storage or a secure cookie
            localStorage.setItem('jwtToken', response.data);
            // Redirect to a protected route
            navigate('/application/dashboard')
        }).catch(() => {
            setShowSnackbar(true)
        })
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={handleEmailChange}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                >
                    Login
                </Button>
            </form>

            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
            >
                <Alert severity="error">
                    Username or password incorrect.
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Login;
