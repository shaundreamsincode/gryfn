import React from "react";
import Routes from "./Routes";

import AppToolbar from "./AppToolbar";

// AppToolbar

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
        <AppToolbar/>
    </Container>
</>;
