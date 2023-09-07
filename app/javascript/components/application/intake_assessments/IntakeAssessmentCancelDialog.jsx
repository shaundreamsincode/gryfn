import React from "react";
import {Button, Dialog, DialogContent, DialogTitle} from "@material-ui/core";

const IntakeAssessmentCancelDialog = (props) => {
    const { isOpenProp, onCloseProp } = props;
    debugger

    return (
        <Dialog open={isOpenProp} onClose={onCloseProp}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
                <Button onClick={() => { onCloseProp(true)}}>Yes</Button>
                <Button onClick={() => { onCloseProp(false)}}>No</Button>
            </DialogContent>
        </Dialog>
    )
}

export default IntakeAssessmentCancelDialog
