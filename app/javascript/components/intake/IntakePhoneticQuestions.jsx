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

    const onQuestionSave = (newQuestions) => {
        setQuestions(newQuestions)
    }

    return(
        <IntakeSpellingQuestions
        questions={questions}
        onSave={onQuestionSave}
        title="Phonetic"
        questionSaveEndpoint={ApiService.upsertIntakePhoneticQuestionResponse}
    />
    )
}

export default IntakePhoneticQuestions