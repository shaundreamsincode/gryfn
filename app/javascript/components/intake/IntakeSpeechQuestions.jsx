import React, { useState, useEffect } from 'react'
import ApiService from "../../services/ApiService";
import {CardContent, Button} from "@material-ui/core";
import IntakeSpeechQuestion from "./IntakeSpeechQuestion";
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

    const handleQuestionUpdate = (question, newAnswer) => {
        let newQuestion = Object.assign(question, {})
        newQuestion.answer = newAnswer

        let newQuestions = Object.assign(questions, {})
        const indexToUpdate = newQuestions.findIndex((q) => q.token === newQuestion.token)
        newQuestions[indexToUpdate] = newQuestion

        setQuestions(newQuestions)
        setNextButtonDisabled(arrayHasUnansweredQuestions(newQuestions))
    }

    const handleNext = () => {
        ApiService.moveIntakeSpeechAssessmentToNextLevel(assessmentToken).then((response) => {
            navigate(`/intake_assessments/${assessmentToken}`)
        })
        // ApiService.moveIntakeAssessmentToNextStep(assessmentToken).then(() => {
        //     navigate(`/intake_assessments/${assessmentToken}`)
        // })
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

    return(<CardContent>
        {
            questions.map((question) => {
                return(<IntakeSpeechQuestion question={question} onUpdate={handleQuestionUpdate} />)
            })
        }

        <div style={{ 'display': 'flex', 'justify-content': 'flex-end', 'margin-top': '1rem' }}>
            <Button onClick={handleNext} disabled={nextButtonDisabled}>Next</Button>
        </div>

    </CardContent>) }

export default IntakeSpeechQuestions
