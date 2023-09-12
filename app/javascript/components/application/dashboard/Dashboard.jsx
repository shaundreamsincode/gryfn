import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Snackbar,
    Paper,
} from "@material-ui/core";
import ApiService from "../../../services/ApiService";
import CreateIntakeAssessmentDialog from "./CreateIntakeAssessmentDialog";
import { useNavigate } from "react-router-dom";

import CopyIcon from '@mui/icons-material/ContentCopy'
const Dashboard = () => {
    const navigate = useNavigate()
    const [intakeAssessments, setIntakeAssessments] = useState([]);
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState(null)

    useEffect(() => {
        ApiService.getCurrentAccountIntakeAssessments().then((response) => {
            setIntakeAssessments(response.data);
        });
    }, []);

    if (!intakeAssessments) {
        return <></>;
    }

    const onDialogClose = (newIntakeAssessment) => {
        setDialogIsOpen(false)

        if (newIntakeAssessment) {
            const newIntakeAssessments = Array.from(intakeAssessments)
            newIntakeAssessments.push(newIntakeAssessment)
            setIntakeAssessments(newIntakeAssessments)
        }
    }

    const handleViewAssessment = (assessmentToken) => {
        navigate(`/application/intake_assessments/${assessmentToken}`)
    }

    const handleCopyAssessmentUrl = (assessmentToken) => {
        const url = `https://gryfn.onrender.com/intake/intake_assessments/${assessmentToken}`;

        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(url)
                .then(() => {
                    setSnackbarMessage("Link copied to clipboard!")
                    console.log("Link copied to clipboard");
                })
                .catch((error) => {
                    setSnackbarMessage("Error copying Link to clipboard")
                    console.error("Error copying Link to clipboard: ", error);
                });
        } else {
            // Fallback for browsers that don't support the Clipboard API
            const textarea = document.createElement("textarea");
            textarea.value = url;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setSnackbarMessage("Link copied to clipboard")
            console.log("URL copied to clipboard");
            console.warn("Clipboard API not supported; using fallback");
        }
    };

    const buildTable = () => {
        return(
            <TableContainer style={{ marginTop: '10px' }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {intakeAssessments.map((assessment, index) => (
                            <TableRow key={index}>
                                <TableCell>{assessment.email}</TableCell>
                                <TableCell>{assessment.first_name}</TableCell>
                                <TableCell>{assessment.status}</TableCell>
                                <TableCell><Button  onClick={() => { handleViewAssessment(assessment.token) }}>View</Button></TableCell>
                                <TableCell><CopyIcon style={{ cursor: 'pointer' }} onClick={() => { handleCopyAssessmentUrl(assessment.token)}}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return (
        <>
            <Typography>Dashboard</Typography>

            {
                intakeAssessments.length === 0 && <Typography>You don't have any intake assessments...yet.</Typography>
            }

            {
                intakeAssessments.length > 0 && buildTable()
            }
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                <Button
                    onClick={() => { setDialogIsOpen(true) }}
                    variant="contained"
                    color="primary">
                    Create Assessment
                </Button>
            </div>
            <CreateIntakeAssessmentDialog
                isOpenProp={dialogIsOpen}
                onCloseProp={onDialogClose}/>

            {/*{*/}
                 <Snackbar
                    open={!!snackbarMessage}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarMessage(null)}
                    message={snackbarMessage}
                />
            {/*}*/}
        </>
    );
};

export default Dashboard;
