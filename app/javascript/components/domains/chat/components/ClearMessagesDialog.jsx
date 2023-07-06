import React from 'react';
import LanguageService from "../../../../services/LanguageService";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

function ClearMessagesDialog(props) {
    const { open, closeDialog, dialogConfirmation } = props

    return (
        <>
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>{ LanguageService.translate('clearMessagesDialogTitle') }</DialogTitle>
                <DialogContent>
                    <DialogContentText> { LanguageService.translate('confirmProceed') }</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}> { LanguageService.translate('cancelButton') }</Button>
                    <Button onClick={dialogConfirmation} autoFocus>
                        { LanguageService.translate('confirmButton') }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ClearMessagesDialog;
