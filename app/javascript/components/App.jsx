import React from "react";
import Routes from "./Routes";

import {Container, Card, CardContent, Typography, Button, Link} from "@material-ui/core";

export default props => <>
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography component="h1" variant="h4" align="center">
                    GRYFN
                </Typography>
                {Routes}
            </CardContent>

        </Card>
        <div style={{ 'marginTop': '20px' }}>
            <Typography align="center" >
                <Button color="primary" onClick={() => {window.location.href = "https://gryfn.onrender.com/about"} }>
                    About Us
                </Button>
                <Button color="primary" onClick={() => {window.location.href = "https://gryfn.onrender.com/contact"} }>
                    Contact Us
                </Button>
            </Typography>
        </div>
    </Container>
</>;
