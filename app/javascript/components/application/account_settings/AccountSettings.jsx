import React, { useState, useEffect } from "react";
import ApiService from "../../../services/ApiService";
import {
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    Container,
    Snackbar, CardContent, FormControl
} from "@material-ui/core";
import {Alert, AlertTitle} from "@mui/material";

import BasicInfoForm from "./BasicInfoForm";
import PasswordForm from "./PasswordForm";

const AccountSettings = () => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);

    const [loading, setLoading] = useState(true)
    const [successMessage, setSuccessMessage] = useState(null)

    useEffect(() => {
        ApiService.getCurrentAccount().then((response) => {
            setFirstName(response.data.first_name);
            setLastName(response.data.last_name);
            setEmail(response.data.email);
            setLoading(false);
        });
    }, ['']);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!firstName || !lastName || !email) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Typography variant="h4">Account Settings</Typography>
            <Grid container spacing={2}>
                {/* Basic Information Form */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: "16px" }}>
                        <BasicInfoForm initialFirstName={firstName} initialLastName={lastName} initialEmail={email}/>
                    </Paper>
                </Grid>

                {/* Password Form */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: "16px" }}>
                        <PasswordForm/>
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar
                open={!!successMessage}
                autoHideDuration={6000}
                onClose={() => setSuccessMessage(null)}
                message={ successMessage }
            >
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {
                        successMessage
                    }
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AccountSettings;
