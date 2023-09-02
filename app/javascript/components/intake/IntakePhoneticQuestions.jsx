import React, { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";
import {Button, Card, CardContent} from "@material-ui/core";
import IntakeSpellingQuestions from "./spelling_questions/IntakeSpellingQuestions";
import {useNavigate} from "react-router-dom";
import IntakeQuestionInstructions from "./IntakeQuestionInstructions";

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

    const handleViewedInstructions = () => {
        setReadInstructions(true)
        localStorage.setItem('intakeInstructionsRead', true)
    }

    if (!readInstructions) {
        return(
            <CardContent>
                <IntakeQuestionInstructions questionType="phonetic" onContinue={handleViewedInstructions}/>
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
