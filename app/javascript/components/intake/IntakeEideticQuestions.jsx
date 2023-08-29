import React, {useState, useEffect} from 'react'
import {Button, CardContent} from "@material-ui/core";
import IntakeSpellingQuestions from "./IntakeSpellingQuestions";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";

const IntakeEideticQuestions = () => {
    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[4];
    const navigate = useNavigate()

    const [questions, setQuestions] = useState(null)

    const handleQuestionSave = (newQuestions) => {
        setQuestions(newQuestions)
    }

    const handleFinish = () => {
        ApiService.moveIntakeAssessmentToNextStep(assessmentToken).then((response) => {
            debugger
            navigate(`/intake_assessments/${assessmentToken}`)
        })
    }

    useEffect(() => {
        ApiService.getIntakeEideticQuestions(assessmentToken).then((response) => {
            setQuestions(response.data)
        })
    }, [assessmentToken])

    return (
        <CardContent>
            {
                questions && <IntakeSpellingQuestions
                    questions={questions}
                    onSave={handleQuestionSave}
                    onFinish={handleFinish}
                    title="Eidetic"
                    questionSaveEndpoint={ApiService.upsertIntakeEideticQuestionResponse}
                />
            }

        </CardContent>
    );
}

export default IntakeEideticQuestions