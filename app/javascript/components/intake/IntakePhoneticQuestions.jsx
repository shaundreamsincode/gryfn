import React, { useState, useEffect } from "react";
import IntakeService from "../../services/IntakeService";
import {Button, Card, CardContent} from "@material-ui/core";
import IntakeSpellingQuestions from "./spelling_questions/IntakeSpellingQuestions";
import {useNavigate} from "react-router-dom";
import IntakeQuestionInstructions from "./IntakeQuestionInstructions";

const IntakePhoneticQuestions = () => {
    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[5];
    const navigate = useNavigate()

    const [questions, setQuestions] = useState(null)
    const [readInstructions, setReadInstructions] = useState(false)

    useEffect(() => {
        IntakeService.getIntakePhoneticQuestions(assessmentToken).then((response) => {
            setQuestions(response.data)
        })
    }, [assessmentToken])

    const handleQuestionSave = (newQuestions) => {
        setQuestions(newQuestions)
    }

    const handleFinish = () => {
        IntakeService.moveIntakeAssessmentToNextStep(assessmentToken).then(() => {
            navigate(`/intake/intake_assessments/${assessmentToken}`)
        })
    }

    if (!questions) {
        return <CardContent>Loading...</CardContent>
    }

    if (!readInstructions) {
        return(
            <CardContent>
                <IntakeQuestionInstructions questionType="phonetic" onContinue={() => { setReadInstructions(true) }}/>
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
                questionSaveEndpoint={IntakeService.upsertIntakePhoneticQuestionResponse}
            />
        </CardContent>
    )
}

export default IntakePhoneticQuestions
