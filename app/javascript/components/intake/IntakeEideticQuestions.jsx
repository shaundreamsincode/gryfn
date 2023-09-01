import React, {useState, useEffect} from 'react'
import {Button, CardContent} from "@material-ui/core";
import IntakeSpellingQuestions from "./IntakeSpellingQuestions";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import IntakeEideticQuestionsInstructions from "./instructions/IntakeEideticQuestionsInstructions";

const IntakeEideticQuestions = () => {
    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[4];
    const navigate = useNavigate()

    const [questions, setQuestions] = useState(null)
    const [readInstructions, setReadInstructions] = useState(localStorage.getItem('eideticInstructionsRead'))

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

    const onViewedInstructions = () => {
        setReadInstructions(true)
        localStorage.setItem('eideticInstructionsRead', true)
    }

    if (!readInstructions) {
        return(
            <CardContent>
                <IntakeEideticQuestionsInstructions/>
                <div style={{ 'display': 'flex', 'justify-content': 'flex-end', 'margin-top': '1rem' }}>
                    <Button color="primary" variant="contained" onClick={onViewedInstructions}>Continue</Button>
                </div>
            </CardContent>
        )
    }

    return (
        <CardContent>
            {
                questions && <IntakeSpellingQuestions
                    questions={questions}
                    onSave={handleQuestionSave}
                    onFinish={handleFinish}
                    title="Eidetic"
                    finishButtonText="Next"
                    questionSaveEndpoint={ApiService.upsertIntakeEideticQuestionResponse}
                />
            }

        </CardContent>
    );
}

export default IntakeEideticQuestions