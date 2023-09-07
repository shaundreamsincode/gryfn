import React, {useEffect, useState} from "react";
import {Button, FormControl, Paper, TextField, Typography, Snackbar, Container} from "@material-ui/core";
import ApiService from "../../../services/ApiService";
import {Alert, AlertTitle} from "@mui/material";

const PasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordConfirmation, setPasswordConfirmation] = useState(null);
    const [saving, setSaving] = useState(false)
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [disableSave, setDisableSave] = useState(true)

    useEffect(() => {
        const toggleUpdatePasswordButton = () => {

            if (saving) {
                setDisableSave(true);
            } else if (!(currentPassword && password && passwordConfirmation)) {
                setDisableSave(true);
            } else {
                setDisableSave(false);
            }
        };

        toggleUpdatePasswordButton(); // Initial call to the function

        // Now, specify the dependencies for the effect
    }, [currentPassword, password, passwordConfirmation]);

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        setSaving(true)

        ApiService.updateCurrentAccountPassword(
            { password: password, password_confirmation: passwordConfirmation, current_password: currentPassword }
        ).then((response) => {
            setSuccessMessage('Password successfully updated!')
            setPassword('')
            setPasswordConfirmation('')
            setCurrentPassword('')
        }).catch((e) => {
            setErrorMessage(e.response.data.error)
        })
    }

    return(<>
        <Typography variant="h6">Password</Typography>
        <FormControl>
            <TextField
                label="Current Password" // New field
                variant="outlined"
                type="password"
                fullWidth
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                margin="normal"
            />
            <TextField
                label="New Password"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                fullWidth
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                margin="normal"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={disableSave}
                onClick={handlePasswordSubmit}
            >
                Update Password
            </Button>
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
            <Snackbar

                open={!!errorMessage}
                autoHideDuration={6000}
                onClose={() => setErrorMessage(null)}
                message={ errorMessage }
            >
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {
                        errorMessage
                    }
                </Alert>
            </Snackbar>
        </FormControl>
    </>)
}

export default PasswordForm
