import React, { useState, useEffect } from "react";
import { Typography, Grid, Button, Toolbar } from "@material-ui/core";
import ApiService from "../../../services/ApiService";
import IntakeAssessmentCancelDialog from "./IntakeAssessmentCancelDialog";

const IntakeAssessment = () => {
    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[5];

    const [assessment, setAssessment] = useState(null);
    const [cancelDialogIsOpen, setCancelDialogIsOpen] = useState(false);

    useEffect(() => {
        ApiService.getIntakeAssessment(assessmentToken).then((response) => {
            console.log(response);
            setAssessment(response.data);
        });
    }, [assessmentToken]);

    if (!assessment) {
        return null; // Instead of <></>, return null to render nothing while data is loading
    }

    const handleCancel = () => {
        setCancelDialogIsOpen(true)
        debugger
    }

    const handleCancelConfirmation = (confirmationConfirmed) => {
        if (confirmationConfirmed) {
            ApiService.cancelIntakeAssessment().then((response) => {

            })
        }
        debugger
    }

    return (
        <>
            <Typography>Intake Assessments</Typography>
            <div style={{ marginTop: '20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>First Name:</Typography>
                        <Typography>{assessment.first_name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Email:</Typography>
                        <Typography>{assessment.email}</Typography>
                    </Grid>
                </Grid>
                <Toolbar>
                    {/*<Button>Copy Link</Button>*/}
                    {/*<Button>Send Reminder</Button>*/}
                </Toolbar>
                {/*<Button onClick={handleCancel}>Cancel Assessment</Button>*/}

            </div>

            {
                cancelDialogIsOpen && <IntakeAssessmentCancelDialog
                    isOpenProp={!!cancelDialogIsOpen}
                    onCloseProp={handleCancelConfirmation}
                />
            }
        </>
    );
};

export default IntakeAssessment;
