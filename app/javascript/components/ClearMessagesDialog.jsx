import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

function ClearMessagesDialog(props) {
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

export default ClearMessagesDialog;
