import React, { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";
import {Card, CardContent} from "@material-ui/core";
import IntakeSpellingQuestions from "./IntakeSpellingQuestions";
import {useNavigate} from "react-router-dom";

const IntakePhoneticQuestions = () => {
    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[4];
    const navigate = useNavigate()

    const [questions, setQuestions] = useState(null)

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

    return(
        <CardContent>
            <IntakeSpellingQuestions
                questions={questions}
                onSave={handleQuestionSave}
                onFinish={handleFinish}
                title="Phonetic"
                questionSaveEndpoint={ApiService.upsertIntakePhoneticQuestionResponse}
            />
        </CardContent>
    )
}

export default IntakePhoneticQuestions
