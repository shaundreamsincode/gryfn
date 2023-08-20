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
    Toolbar
} from "@material-ui/core";
import ApiService from "../../services/ApiService";
import {useNavigate} from "react-router-dom";

const IntakeSummary = () => {
    const navigate = useNavigate()

    const currentUrl = window.location.href
    const assessmentToken = currentUrl.split("/")[4]
    const [assessment, setAssessment] = useState(null)

    useEffect(() => {
        ApiService.getIntakeAssessmentSummary(assessmentToken).then((response) => {
            setAssessment(response.data)
        })
    }, [assessmentToken])

    if (!assessment) {
        return(<CardContent>Loading...</CardContent>)
    }

    debugger

    return(
        <CardContent>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Your Answer</TableCell>
                        <TableCell>Actual Answer</TableCell>
                        <TableCell>Was Correct?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        assessment.intake_questions.map((question) => {
                            const userAnswerWasCorrect = question.answer.toUpperCase() === question.correct_answer.toUpperCase()
                            return(<TableRow>
                                <TableCell>{ question.answer }</TableCell>
                                <TableCell>{ question.correct_answer }</TableCell>
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
                <Button align="right" color="primary">
                    Email Copy
                </Button>
            </Toolbar>
        </CardContent>
    )
}

export default IntakeSummary
