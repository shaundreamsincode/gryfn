import React, { useState, useEffect } from 'react'
import ApiService from "../../services/ApiService";
import {CardContent, Button, List, ListItem, Typography} from "@material-ui/core";
import IntakeSpeechQuestion from "./IntakeSpeechQuestion";
import IntakeSpeechQuestionsInstructions from "./instructions/IntakeSpeechQuestionsInstructions";

import { useNavigate } from "react-router-dom";

const IntakeSpeechQuestions = (props) => {
    const arrayHasUnansweredQuestions = (_questions) => {
        return _questions.some((question) => { return !question.answer })
    }

    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[4];
    const navigate = useNavigate()

    const [questions, setQuestions] = useState([])
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false)
    const [readInstructions, setReadInstructions] = useState(localStorage.getItem('speechInstructionsRead'))
    const [questionError, setQuestionError] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showSuccessUndoMessage, setShowSuccessUndoMessage] = useState(false)

    const containerStyle = {
        // display: 'flex',
        // justifyContent: 'space-between',
        // flexDirection: 'column', // Stack components vertically
        // alignItems: 'center', // Horizontally center components
    };

    const handleQuestionUpdate = (question, newAnswer) => {
        setShowSuccessMessage(false)
        setShowSuccessUndoMessage(false)
        let newQuestion = Object.assign(question, {})
        newQuestion.answer = newAnswer

        let newQuestions = Object.assign(questions, {})
        const indexToUpdate = newQuestions.findIndex((q) => q.token === newQuestion.token)
        newQuestions[indexToUpdate] = newQuestion

        setQuestions(newQuestions)
        setNextButtonDisabled(arrayHasUnansweredQuestions(newQuestions))
        setQuestionError(false)

        if (newAnswer) {
            setShowSuccessMessage(true)
        } else {
            setShowSuccessUndoMessage(true)
        }
    }

    const handleNext = () => {
        ApiService.moveIntakeSpeechAssessmentToNextLevel(assessmentToken).then((response) => {
            const updatedAssessment = response.data

            if (!updatedAssessment.speech_assessment_current_level) {
                // handleFinish()
            }

            navigate(`/intake_assessments/${assessmentToken}`)
        })
    }

    const handleRecordingBegin = () => {
        setShowSuccessMessage(false)
        setShowSuccessUndoMessage(false)
        setQuestionError(false)
    }

    const handleQuestionError = () => {
        setShowSuccessMessage(false)
        setShowSuccessUndoMessage(false)
        setQuestionError(true)
    }

    const onViewedInstructions = () => {
        setReadInstructions(true)
        localStorage.setItem('speechInstructionsRead', true)
    }

    useEffect(() => {
        ApiService.getIntakeSpeechQuestions(assessmentToken).then((response) => {
            setQuestions(response.data)
            setNextButtonDisabled(arrayHasUnansweredQuestions(response.data))
        }).catch((error) => {
            console.log('error')
            console.log(error)
        })
    }, [assessmentToken])

    if (questions.length === 0) {
        return(<CardContent>Loading...</CardContent>)
    }

    if (!readInstructions) {
        return(
            <CardContent>
                <IntakeSpeechQuestionsInstructions/>
                <div style={{ 'display': 'flex', 'justify-content': 'flex-end', 'margin-top': '1rem' }}>
                    <Button color="primary" variant="contained" onClick={onViewedInstructions}>Continue</Button>
                </div>
            </CardContent>
        )
    }

    return(<CardContent>
        <h2>Speech Questions</h2>
        {
            questionError && <Typography style={{ "color": "red" }}>There was an error with recording your audio. Please try again.</Typography>
        }
        {
            showSuccessMessage && <Typography style={{ "color": "green" }}>Your answer was successfully updated!</Typography>
        }

        {
            showSuccessUndoMessage && <Typography style={{ "color": "green" }}>Your answer was successfully deleted!</Typography>
        }
        <div>
            <List>
                {
                    questions.map((question) => {
                        return(
                                <IntakeSpeechQuestion
                                    question={question}
                                    onRecordingBegin={handleRecordingBegin}
                                    onUpdate={handleQuestionUpdate}
                                    onError={handleQuestionError}
                                />
                            )
                    })
                }
            </List>
            {/*<div style={containerStyle}>*/}
            {/*</div>*/}
            <div style={{ 'display': 'flex', 'justify-content': 'flex-end', 'margin-top': '1rem' }}>
                <Button onClick={handleNext} disabled={nextButtonDisabled}>Next</Button>
            </div>
        </div>

    </CardContent>) }

export default IntakeSpeechQuestions
