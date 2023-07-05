import React, { useState } from 'react';

import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from "@material-ui/core";

function EmailSummaryDialog(props) {
    const [email, setEmail] = useState('')
    const [isInvalid, setIsInvalid] = useState(false)

    const { open, closeDialog, dialogConfirmation } = props
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const onEmailChange = (newEmail) => {
        setEmail(newEmail)
        setIsInvalid(false)
    }

    const onDialogClose = () => {
        setIsInvalid(false)
        closeDialog()
    }

    const onSubmit = () => {
        setIsInvalid(false)

        const emailIsValid = emailRegex.test(email)

        if (emailIsValid) {
            dialogConfirmation(email)
        } else {
            setIsInvalid(true)
        }
    }

    return (
        <>
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>Send Summary</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please enter the email you want to send the summary to.</DialogContentText>
                </DialogContent>

                {
                    isInvalid &&
                        <DialogContentText variant="caption" align="center" style={{ color: 'red' }}>Email is invalid</DialogContentText>
                }

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField style={{ width: '75%' }} onChange={(event) => onEmailChange(event.target.value)} />
                </div>
                <DialogActions>
                    <Button onClick={onDialogClose} color="primary">Cancel</Button>
                    <Button onClick={onSubmit} autoFocus color="primary" disabled={email.length === 0}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EmailSummaryDialog;
