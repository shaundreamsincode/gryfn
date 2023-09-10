import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
    Button, DialogContentText,
} from "@material-ui/core";
import ApiService from "../../../services/ApiService";

const CreateIntakeAssessmentDialog = (props) => {
    const { isOpenProp, onCloseProp } = props;
    const [saving, setSaving] = useState(false)
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState(null)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setErrorMessage(null)
    };

    const handleClose = (newIntakeAssessment) => {
        setFirstName(null)
        setEmail(null)
        setSubmitButtonDisabled(true)

        onCloseProp(newIntakeAssessment);
    }

    const handleSubmit = () => {
        setSaving(true)

        if (!emailRegex.test(email)) {
            setErrorMessage("Email is invalid")
            return
        }

        const data = { first_name: firstName, email: email }
        ApiService.createIntakeAssessmentForCurrentAccount(data).then((response) => {
            handleClose(response.data)
        })
    };

    useEffect(() => {
        const calcSubmitButtonDisabled = () => {
            if (saving) {
                setSubmitButtonDisabled(true)
            } else if (!(firstName && email)) {
                setSubmitButtonDisabled(true)
            } else {
                setSubmitButtonDisabled(!emailRegex.test(email))
            }
        }

        calcSubmitButtonDisabled()
    }, [firstName, email])

    return (
        <Dialog open={isOpenProp} onClose={() => {handleClose(null)}}>
            <DialogTitle>Create Intake Assessment</DialogTitle>
            <DialogContent>
                {
                    errorMessage && <DialogContentText variant="caption" align="center" style={{ color: 'red' }}>
                        { errorMessage }
                    </DialogContentText>

                }
                <FormControl fullWidth>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        margin="normal"
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        margin="normal"
                    />
                </FormControl>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px", marginBottom: "20px" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={submitButtonDisabled}
                    >
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateIntakeAssessmentDialog;
