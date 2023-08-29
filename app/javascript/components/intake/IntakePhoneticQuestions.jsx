import React, { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";
import {CardContent} from "@material-ui/core";
import IntakeSpellingQuestions from "./IntakeSpellingQuestions";

const IntakePhoneticQuestions = (props) => {
    const { assessmentToken } = props
    const [questions, setQuestions] = useState(null)

    useEffect(() => {
        ApiService.getIntakePhoneticQuestions(assessmentToken).then((response) => {
            setQuestions(response.data)
        })
    }, assessmentToken)

    if (!questions) {
        return(<CardContent>Loading...</CardContent>)
    }

    const handleQuestionSave = (newQuestions) => {
        setQuestions(newQuestions)
    }

    const handleFinish = () => {
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