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
    const [finishButtonDisabled, setFinishButtonDisabled] = useState(false)

    const sortedQuestions = questions.sort(function(a, b) {
        var textA = a.file_name;
        var textB = b.file_name;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    const handleQuestionUpdate = (question, newAnswer) => {
        let newQuestion = Object.assign(question, {})
        newQuestion.answer = newAnswer

        let newQuestions = Object.assign(questions, {})
        const indexToUpdate = newQuestions.findIndex((q) => q.token === newQuestion.token)
        newQuestions[indexToUpdate] = newQuestion

        setQuestions(newQuestions)
        setFinishButtonDisabled(arrayHasUnansweredQuestions(newQuestions))
    }

    const handleFinish = () => {
        ApiService.moveIntakeAssessmentToNextStep(assessmentToken).then(() => {
            navigate(`/intake_assessments/${assessmentToken}`)
        })
    }

    useEffect(() => {
        ApiService.getIntakeSpeechQuestions(assessmentToken).then((response) => {
            setQuestions(response.data)
            debugger
            setFinishButtonDisabled(arrayHasUnansweredQuestions(response.data))
        }).catch((error) => {
            console.log('error')
            console.log(error)
        })
    }, [assessmentToken])

    if (sortedQuestions.length === 0) {
        return(<CardContent>Loading...</CardContent>)
    }

    return(<CardContent>
        {
            sortedQuestions.map((question) => {
                return(<IntakeSpeechQuestion question={question} onUpdate={handleQuestionUpdate} />)
            })
        }

        <Button onClick={handleFinish} disabled={finishButtonDisabled}>Finish</Button>
    </CardContent>) }

export default IntakeSpeechQuestions
