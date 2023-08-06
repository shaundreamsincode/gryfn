import React from "react";
import Routes from "../routes";
import {Container, Card, CardContent, Typography, Button} from "@material-ui/core";

export default props => <>
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography component="h1" variant="h4" align="center">
                    GRYFN
                </Typography>
            </CardContent>
        </Card>
    </Container>
</>;
