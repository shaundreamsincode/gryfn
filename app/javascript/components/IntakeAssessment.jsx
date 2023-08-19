import React, { useState, useEffect }  from "react";
import {CardContent} from "@material-ui/core";
import ApiService from "../services/ApiService";
import IntakeSurvey from "./IntakeSurvey";

const IntakeAssessment = () => {
    const currentUrl = window.location.href
    const accountToken = currentUrl.split("/")[4]
    const [currentQuestionType, setCurrentQuestionType] = useState(null)
    const [currentAudioQuestion, setCurrentAudioQuestion] = useState(null)

    useEffect(() => {
        ApiService.getIntakeAssessment(accountToken).then((response) => {
            setCurrentQuestionType(response.data.currentQuestionType)
            setCurrentAudioQuestion(response.data.currentAudioQuestion)
        })
    }, [])

    if (!currentQuestionType && ! currentAudioQuestion) {
        return(<CardContent>
            Loading...
        </CardContent>)
    }

    return(<CardContent>
        {
            currentQuestionType === 'survey' && <IntakeSurvey/>
        }
    </CardContent>)
}

export default IntakeAssessment
