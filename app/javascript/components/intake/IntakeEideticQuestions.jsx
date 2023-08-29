import React, {useState, useEffect} from 'react'
import {Button, CardContent} from "@material-ui/core";
import IntakeSpellingQuestions from "./IntakeSpellingQuestions";
import ApiService from "../../services/ApiService";

const IntakeEideticQuestions = (props) => {
    const { questions, onFinish } = props

    const [spellingQuestions, setSpellingQuestions] = useState(questions)

    const handleQuestionSave = (newQuestions) => {
        setSpellingQuestions(newQuestions)
    }

    return (
        <CardContent>
            <IntakeSpellingQuestions
                questions={spellingQuestions}
                onSave={handleQuestionSave}
                onFinish={onFinish}
                title="Eidetic"
                questionSaveEndpoint={ApiService.upsertIntakeEideticQuestionResponse}
            />
        </CardContent>
    );
}

export default IntakeEideticQuestions