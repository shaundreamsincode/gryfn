import React, { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";
import {Button, Card, CardContent} from "@material-ui/core";
import IntakeSpellingQuestions from "./IntakeSpellingQuestions";
import {useNavigate} from "react-router-dom";
import IntakePhoneticQuestionsInstructions from "./IntakePhoneticQuestionsInstructions";

const IntakePhoneticQuestions = () => {
    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[4];
    const navigate = useNavigate()

    const [questions, setQuestions] = useState(null)
    const [readInstructions, setReadInstructions] = useState(localStorage.getItem('phoneticInstructionsRead'))

    useEffect(() => {
        ApiService.getIntakePhoneticQuestions(assessmentToken).then((response) => {
            setQuestions(response.data)
        })
    }, [assessmentToken])

    const handleQuestionSave = (newQuestions) => {
        setQuestions(newQuestions)
    }

    const handleFinish = () => {
        ApiService.moveIntakeAssessmentToNextStep(assessmentToken).then(() => {
            navigate(`/intake_assessments/${assessmentToken}`)
        })
    }

    if (!questions) {
        return <CardContent>Loading...</CardContent>
    }

    const onViewedInstructions = () => {
        setReadInstructions(true)
        localStorage.setItem('phoneticInstructionsRead', true)
    }


    if (!readInstructions) {
        return(
            <CardContent>
                <IntakePhoneticQuestionsInstructions/>
                <div style={{ 'display': 'flex', 'justify-content': 'flex-end', 'margin-top': '1rem' }}>
                    <Button color="primary" variant="contained" onClick={onViewedInstructions}>Continue</Button>
                </div>
            </CardContent>
        )
    }

    return(
        <CardContent>
            <IntakeSpellingQuestions
                questions={questions}
                onSave={handleQuestionSave}
                onFinish={handleFinish}
                title="Phonetic"
                finishButtonText="Finish"
                questionSaveEndpoint={ApiService.upsertIntakePhoneticQuestionResponse}
            />
        </CardContent>
    )
}

export default IntakePhoneticQuestions
