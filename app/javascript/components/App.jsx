import React from "react";
import Routes from "../routes";
import { Container, Card, CardContent, Typography } from "@material-ui/core";

export default props => <>
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography component="h1" variant="h4" align="center">
                    DocBot
                </Typography>
                {Routes}
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="text.secondary" align="center">
                    DocBot is NOT a substitute for professional medical advice, diagnosis or treatment.
                    Always seek the advice of your physician or other qualified health provider with any
                    questions you may have regarding a medical condition. If you are having a
                    medical emergency, call 911 or your local emergency services number.
                </Typography>
            </CardContent>
        </Card>
    </Container>
</>;
