import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
                <Typography align="center">
                    Gryfn is a comprehensive dyslexia screening and personalized support for reading and learning success.
                </Typography>
            </Grid>

            <Grid item>
                <Button variant="contained" color="primary" onClick={() => { navigate('/instructions') }}>
                    Start
                </Button>
            </Grid>
        </Grid>
    );
};

export default Home;
