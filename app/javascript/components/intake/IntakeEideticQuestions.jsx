import React, {useState, useEffect} from 'react'
import {Button, CardContent} from "@material-ui/core";
import IntakeSpellingQuestions from "./spelling_questions/IntakeSpellingQuestions";
import IntakeQuestionInstructions from "./IntakeQuestionInstructions";

import IntakeService from "../../services/IntakeService";
import { useNavigate } from "react-router-dom";

const IntakeEideticQuestions = () => {
    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[4];
    const navigate = useNavigate()

    const [questions, setQuestions] = useState(null)
    const [readInstructions, setReadInstructions] = useState(false)

    const handleQuestionSave = (newQuestions) => {
        setQuestions(newQuestions)
    }

    const handleFinish = () => {
        IntakeService.moveIntakeAssessmentToNextStep(assessmentToken).then((response) => {
            navigate(`/intake_assessments/${assessmentToken}`)
        })
    }

    useEffect(() => {
        IntakeService.getIntakeEideticQuestions(assessmentToken).then((response) => {
            setQuestions(response.data)
        })
    }, [assessmentToken])

    if (!readInstructions) {
        return(
            <CardContent>
                <IntakeQuestionInstructions questionType="eidetic" onContinue={() => { setReadInstructions(true) }}/>
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
                    questionSaveEndpoint={IntakeService.upsertIntakeEideticQuestionResponse}
                />
            }

        </CardContent>
    );
}

export default IntakeEideticQuestions