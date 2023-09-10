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
    Paper,
} from "@material-ui/core";
import ApiService from "../../../services/ApiService";
import CreateIntakeAssessmentDialog from "./CreateIntakeAssessmentDialog";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate()
    const [intakeAssessments, setIntakeAssessments] = useState([]);
    const [dialogIsOpen, setDialogIsOpen] = useState(false)

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
        // application/intake_assessments/:token
        navigate(`/application/intake_assessments/${assessmentToken}`)
    }

    return (
        <>
            <Typography>Dashboard</Typography>
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
                                <TableCell><Button onClick={() => { handleViewAssessment(assessment.token) }}>View</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
        </>
    );
};

export default Dashboard;
