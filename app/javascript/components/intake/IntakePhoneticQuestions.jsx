import React, { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";
import {CardContent} from "@material-ui/core";
import IntakeSpellingQuestions from "./IntakeSpellingQuestions";

const IntakePhoneticQuestions = (props) => {
    const { questions, onFinish } = props
    const [spellingQuestions, setSpellingQuestions] = useState(questions)

    const handleQuestionSave = (newQuestions) => {
        setSpellingQuestions(newQuestions)
    }

    return(
        <CardContent>
            <IntakeSpellingQuestions
                questions={spellingQuestions}
                onSave={handleQuestionSave}
                onFinish={onFinish}
                title="Phonetic"
                questionSaveEndpoint={ApiService.upsertIntakePhoneticQuestionResponse}
            />
        </CardContent>
    )
}

export default IntakePhoneticQuestions
