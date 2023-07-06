import React, { useState } from 'react';
import LanguageService from "../../../../services/LanguageService";

import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
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
                <DialogTitle> { LanguageService.translate('sendSummaryTitle') }</DialogTitle>
                <DialogContent>
                    <DialogContentText>{ LanguageService.translate('emailSummaryInstructions') }</DialogContentText>
                </DialogContent>

                {
                    isInvalid &&
                        <DialogContentText variant="caption" align="center" style={{ color: 'red' }}>{ LanguageService.translate('emailIsInvalidError') }</DialogContentText>
                }

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField style={{ width: '75%' }} onChange={(event) => onEmailChange(event.target.value)} />
                </div>
                <DialogActions>
                    <Button onClick={onDialogClose} color="primary"> { LanguageService.translate('cancelButton') }</Button>
                    <Button onClick={onSubmit} autoFocus color="primary" disabled={email.length === 0}>
                        { LanguageService.translate('confirmButton') }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EmailSummaryDialog;
