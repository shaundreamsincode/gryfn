import React from "react";
import {AppBar, Toolbar, IconButton, Typography, Button} from "@material-ui/core";
import {useNavigate} from "react-router-dom";

// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

const ApplicationNavbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('jwtToken')
        navigate('/login')
    }

    return(
        // <AppBar style={ { marginBottom: '20px' } } position="static" color="none">
            <Toolbar>
                <Button onClick={() => { navigate('/application/dashboard') }}>
                    Home
                </Button>
                <Button onClick={() => { navigate('/application/account_settings') }}>
                    Settings
                </Button>
                <Button onClick={handleLogout}>
                    Logout
                </Button>
                {/*<IconButton edge="start" aria-label="menu">*/}
                {/*    hiZZ*/}
                {/*    /!*<MenuIcon />*!/*/}
                {/*</IconButton>*/}
                {/*<Typography variant="h6" component="div">*/}
                {/*    My App*/}
                {/*</Typography>*/}
                {/*/!* Add navigation links or additional navbar content here *!/*/}
            </Toolbar>
        // </AppBar>
    )
}

export default ApplicationNavbar
