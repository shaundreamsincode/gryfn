import React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

function ClearMessagesConfirmDialog(props) {
    const { open, closeDialog, dialogConfirmation } = props
    debugger

    return (
        <>
            {/*<Button variant="contained" color="primary" onClick={handleClickOpen}>*/}
            {/*    Open Confirmation*/}
            {/*</Button>*/}
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to proceed?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button onClick={dialogConfirmation} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ClearMessagesConfirmDialog;
