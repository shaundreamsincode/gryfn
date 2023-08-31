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
    const [loading, setLoading] = useState(true)

    const [speechQuestions, setSpeechQuestions] = useState(null)
    const [eideticQuestions, setEideticQuestions] = useState(null)
    const [phoneticQuestions, setPhoneticQuestions] = useState(null)

    const [snackbarMessage, setSnackbarMessage] = useState(null);

    useEffect(() => {
        ApiService.getIntakeAssessmentSummary(assessmentToken).then((response) => {
            setLoading(false)

            setSpeechQuestions(response.data.speech_questions)
            setEideticQuestions(response.data.eidetic_questions)
            setPhoneticQuestions(response.data.phonetic_questions)
        })
    }, [assessmentToken])

    if (loading) {
        return(<CardContent>Loading...</CardContent>)
    }

    const handleEmailResults = () => {
        ApiService.sendIntakeAssessmentSummaryEmail(assessmentToken).then((response) => {
            setSnackbarMessage('Results sent! Check your spam inbox if you do not see an email.')
        })
    }

    const questionsWithAnswer = speechQuestions.filter((question) => !!question.answer)

    // debugger

    return(
        <CardContent>
            Speech Questions
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Answer</TableCell>
                        <TableCell>Your Answer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        questionsWithAnswer.map((question) => {
                            return(<TableRow>
                                <TableCell>{ question.correct_answer }</TableCell>
                                <TableCell>{ question.answer }</TableCell>
                                <TableCell>{ question.is_correct ? 'Correct' : 'Incorrect' }</TableCell>
                            </TableRow>)
                        })
                    }
                </TableBody>
            </Table>
            Eidetic Questions
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Answer</TableCell>
                        <TableCell>Your Answer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        eideticQuestions.map((question) => {
                            return(<TableRow>
                                <TableCell>{ question.correct_answer }</TableCell>
                                <TableCell>{ question.answer }</TableCell>
                                <TableCell>{ question.is_correct ? 'Correct' : 'Incorrect' }</TableCell>
                            </TableRow>)
                        })
                    }
                </TableBody>
            </Table>
            Phonetic Questions
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Answer</TableCell>
                        <TableCell>Your Answer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        phoneticQuestions.map((question) => {
                            return(<TableRow>
                                <TableCell>{ question.correct_answer }</TableCell>
                                <TableCell>{ question.answer }</TableCell>
                                <TableCell>{ question.is_correct ? 'Correct' : 'Incorrect' }</TableCell>
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
