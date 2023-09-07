import React, {useEffect, useState} from "react";
import {Button, FormControl, Paper, TextField, Typography, Snackbar, Container} from "@material-ui/core";
import ApiService from "../../../services/ApiService";
import {Alert, AlertTitle} from "@mui/material";

const BasicInfoForm = (props) => {
    const { initialFirstName, initialLastName, initialEmail } = props

    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    const [email, setEmail] = useState(initialEmail);

    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(true)

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [disableSave, setDisableSave] = useState(true)

    useEffect(() => {
        const toggleUpdateBasicInfoButton = () => {
            if (saving) {
                setDisableSave(true);
            } else if (loading) {
                setDisableSave(true);
            } else if (!(firstName && lastName && email)) {
                setDisableSave(true);
            } else {
                setDisableSave(false);
            }

            setLoading(false)
        };

        toggleUpdateBasicInfoButton(); // Initial call to the function

        // Now, specify the dependencies for the effect
    }, [firstName, lastName, email]);

    const handleSubmit = (e) => {
        e.preventDefault()
        setSaving(true)

        ApiService.updateCurrentAccountBasicInfo(
            { first_name: firstName, last_name: lastName, email: email }
        ).then((response) => {
            setSuccessMessage('Account details successfully updated!')
        }).catch((e) => {
            setErrorMessage(e.response.data.error)
        })
    }

    return(<>
        <Typography variant="h6">Basic Info</Typography>
        <FormControl>
            <TextField
                label="First Name"
                variant="outlined"
                fullWidth
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
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={disableSave}
                onClick={handleSubmit}
            >
                Update Info
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

export default BasicInfoForm
