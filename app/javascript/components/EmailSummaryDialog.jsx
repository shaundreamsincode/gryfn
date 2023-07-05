import React, { useState } from 'react';

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

function EmailSummaryDialog(props) {
    const [email, setEmail] = useState('')
    const { open, closeDialog, dialogConfirmation } = props

    return (
        <>
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>Send Summary</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please enter the email you want to send the summary to.</DialogContentText>
                </DialogContent>
                <TextField onChange={(event) => setEmail(event.target.value)}/>
                <DialogActions>
                    <Button onClick={closeDialog} disabled={email.length > 0}>Cancel</Button>
                    <Button onClick={() => dialogConfirmation(email)} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EmailSummaryDialog;
