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
import { useNavigate } from "react-router-dom";
import ApiService from "../../../services/ApiService";
import CreateIntakeAssessmentDialog from "./CreateIntakeAssessmentDialog";

const Dashboard = () => {
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
        debugger

        if (newIntakeAssessment) {
            const newIntakeAssessments = Array.from(intakeAssessments)
            newIntakeAssessments.push(newIntakeAssessment)
            setIntakeAssessments(newIntakeAssessments)
        }
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {intakeAssessments.map((assessment, index) => (
                            <TableRow key={index}>
                                <TableCell>{assessment.email}</TableCell>
                                <TableCell>{assessment.first_name}</TableCell>
                                <TableCell>{assessment.status}</TableCell>
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
