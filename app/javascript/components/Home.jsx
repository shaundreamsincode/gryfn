import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <Typography align="center">
                    Gryfn is a comprehensive dyslexia screening and personalized support for reading and learning success.
                </Typography>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop: '20px'}}>
                <Button variant="contained" color="primary" onClick={() => { navigate('/request_access')}}>
                    Request Access
                </Button>

                <Button variant="contained" color="primary" onClick={() => { navigate('/login') }}>
                    Login
                </Button>
            </div>
        </div>
    );
};

export default Home;
