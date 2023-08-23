import React, {useState, useEffect} from 'react'
import ApiService from "../../services/ApiService";
import {Button, CardContent} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import IntakeSpellingQuestion from "./IntakeSpellingQuestion";

const IntakeSpellingQuestions = (props) => {
    const { questions } = props
    const navigate = useNavigate()
    const currentUrl = window.location.href
    const assessmentToken = currentUrl.split("/")[4]

    const sortedQuestions = questions.sort(function(a, b) {
        var textA = a.file_name;
        var textB = b.file_name;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    const hasUnansweredQuestions = questions.some((q) => !q.answer)

    const onQuestionSave = (updatedQuestion) => {
        const newQuestions = questions.slice(0)

        const indexOfUpdatedQuestion = newQuestions.findIndex((question) => {
            return question.token === updatedQuestion.token
        })

        newQuestions[indexOfUpdatedQuestion] = updatedQuestion
        setQuestions(newQuestions)
    };

    const handleFinishButtonClick = () => {
        navigate(`/intake_assessments/${assessmentToken}/summary`)
    }

    return (
        <CardContent>
            <div>
                {
                    sortedQuestions.map((question) => (
                        <IntakeSpellingQuestion key={question.token} question={question} onSave={onQuestionSave} />
                    ))
                }
            </div>
            <div style={{ 'display': 'flex', 'justify-content': 'flex-end', 'margin-top': '1rem' }}>
                <Button variant="contained" color="primary" onClick={handleFinishButtonClick} disabled={hasUnansweredQuestions}>Finish</Button>
            </div>
        </CardContent>
    );

    // return(<CardContent>
    //     {
    //         questions.map((question) => {
    //             return(<div> { question.file_name }</div>)
    //         })
    //     }
    // </CardContent>)
}

export default IntakeSpellingQuestions