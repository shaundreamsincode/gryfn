import React, { useState, useEffect } from "react";
import {
    Button,
    CardContent,
    List,
    ListItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Toolbar,
    Snackbar
} from "@material-ui/core";
import ApiService from "../../services/ApiService";
import {useNavigate} from "react-router-dom";

const IntakeSummary = () => {
    const navigate = useNavigate()

    const currentUrl = window.location.href
    const assessmentToken = currentUrl.split("/")[4]
    const [assessment, setAssessment] = useState(null)
    const [snackbarMessage, setSnackbarMessage] = useState(null);


    useEffect(() => {
        ApiService.getIntakeAssessmentSummary(assessmentToken).then((response) => {
            setAssessment(response.data)
        })
    }, [assessmentToken])

    if (!assessment) {
        return(<CardContent>Loading...</CardContent>)
    }

    const handleEmailResults = () => {
        ApiService.sendIntakeAssessmentSummaryEmail(assessmentToken).then((response) => {
            setSnackbarMessage('Results sent! Check your spam inbox if you do not see an email.')
        })
    }

    debugger

    return(
        <CardContent>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Answer</TableCell>
                        <TableCell>Your Answer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        assessment.intake_questions.map((question) => {
                            const userAnswerWasCorrect = question.answer.toUpperCase() === question.correct_answer.toUpperCase()
                            return(<TableRow>
                                <TableCell>{ question.correct_answer }</TableCell>
                                <TableCell>{ question.answer }</TableCell>
                                <TableCell>{ userAnswerWasCorrect ? 'Correct' : 'Incorrect' }</TableCell>
                            </TableRow>)
                        })
                    }
                </TableBody>
            </Table>
            <Toolbar>
                <Button onClick={() => { navigate('/') } } align="right" color="primary">
                    Home
                </Button>
                <Button onClick={handleEmailResults} align="right" color="primary">
                    Email Results
                </Button>
            </Toolbar>
            <Snackbar
                open={!!snackbarMessage}
                autoHideDuration={6000}
                onClose={() => setSnackbarMessage(null)}
                message={ snackbarMessage }
            />
        </CardContent>
    )
}

export default IntakeSummary
