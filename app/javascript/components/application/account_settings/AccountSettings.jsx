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

import PasswordForm from "./PasswordForm";

const AccountSettings = () => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);

    const [currentPassword, setCurrentPassword] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordConfirmation, setPasswordConfirmation] = useState(null);

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const [successMessage, setSuccessMessage] = useState(null)

    const [disableUpdateBasicInfo, setDisableUpdateBasicInfo] = useState(true)
    const [disableUpdatePassword, setDisableUpdatePassword] = useState(true)

    useEffect(() => {
        ApiService.getCurrentAccount().then((response) => {
            setFirstName(response.data.first_name);
            setLastName(response.data.last_name);
            setEmail(response.data.email);
            setLoading(false); // Set loading to false after API call
        });
    }, ['']);

    const handleBasicInfoSubmit = (e) => {
        e.preventDefault()
        setSaving(true)

        // setDisableUpdateBasicInfo(true)
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        setSaving(true)

        ApiService.updateCurrentAccountPassword(
            { password: password, password_confirmation: passwordConfirmation, current_password: currentPassword }
        ).then((response) => {
            setSuccessMessage('Password successfully updated!')
            setDisableUpdatePassword(true)

            setPassword('')
            setPasswordConfirmation('')
            setCurrentPassword('')
        })
    };

    const disableUpdatePasswordButton = () => {
        if (saving) {
            return true
        }

        if (!(currentPassword && password && passwordConfirmation)) {
            return true
        }

        return false
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!firstName || !lastName || !email) {
        return <div>Loading...</div>;
    }
    // setDisableUpdateBasicInfo(false)

    return (
        <Container>
            <Typography variant="h4">Account Settings</Typography>
            <Grid container spacing={2}>
                {/* Basic Information Form */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: "16px" }}>
                        <Typography variant="h6">Basic Information</Typography>
                        <form onChange={() => { setDisableUpdateBasicInfo(false) }} onSubmit={handleBasicInfoSubmit}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                defaultValue={firstName}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                margin="normal"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={disableUpdateBasicInfo}
                                fullWidth
                            >
                                Update Basic Inf
                            </Button>
                        </form>
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
