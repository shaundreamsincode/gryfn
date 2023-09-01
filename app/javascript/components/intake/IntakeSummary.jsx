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
    const [speechAssessmentGrade, setSpeechAssessmentGrade] = useState(null)
    const [snackbarMessage, setSnackbarMessage] = useState(null)

    useEffect(() => {
        ApiService.getIntakeAssessmentSummary(assessmentToken).then((response) => {
            setLoading(false)

            setSpeechQuestions(response.data.speech_questions)
            setEideticQuestions(response.data.eidetic_questions)
            setPhoneticQuestions(response.data.phonetic_questions)
            setSpeechAssessmentGrade(response.data.speech_assessment_grade)
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

    return(
        <CardContent>
            <div>
                <h2>Level: { speechAssessmentGrade }</h2>
            </div>

            <h3 style={{ 'marginTop': '50px' }}>Speech Questions</h3>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Question Number</TableCell>
                        <TableCell>Answer</TableCell>
                        <TableCell>Your Answer</TableCell>
                        <TableCell>Result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        questionsWithAnswer.map((question, index) => {
                            return(<TableRow key={index}>
                                <TableCell>{ index + 1 }</TableCell>
                                <TableCell>{ question.correct_answer }</TableCell>
                                <TableCell>{ question.answer }</TableCell>
                                <TableCell>{ question.is_correct ? 'Correct' : 'Incorrect' }</TableCell>
                            </TableRow>)
                        })
                    }
                </TableBody>
            </Table>

            <h3 style={{ 'marginTop': '50px' }}>Eidetic Questions</h3>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Question Number</TableCell>
                        <TableCell>Answer</TableCell>
                        <TableCell>Your Answer</TableCell>
                        <TableCell>Result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        eideticQuestions.map((question, index) => {
                            return(<TableRow>
                                <TableCell key={index}>{ index + 1 }</TableCell>
                                <TableCell key={index}>{ question.correct_answer }</TableCell>
                                <TableCell key={index}>{ question.answer }</TableCell>
                                <TableCell key={index}>{ question.is_correct ? 'Correct' : 'Incorrect' }</TableCell>
                            </TableRow>)
                        })
                    }
                </TableBody>
            </Table>

            <h3 style={{ 'marginTop': '50px' }}>Phonetic Questions</h3>
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
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <Button
                        onClick={() => { navigate('/') } }
                        style={{ marginRight: 'auto' }} // Pushes the button to the left
                        color="primary"
                        variant="contained"
                    >
                        Home
                    </Button>
                    <Button
                        onClick={handleEmailResults}
                        style={{ marginLeft: 'auto' }} // Pushes the button to the right
                        color="primary"
                        variant="contained"
                    >
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
