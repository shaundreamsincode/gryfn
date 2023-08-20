import React, { useState, useEffect } from "react";
import {CardContent} from "@material-ui/core";
import ApiService from "../../services/ApiService";

const IntakeSummary = () => {
    const currentUrl = window.location.href
    const assessmentToken = currentUrl.split("/")[4]
    const [questionsCount, setQuestionsCount] = useState(null)
    const [questionsCorrect, setQuestionsCorrect] = useState(null)

    useEffect(() => {
        ApiService.getIntakeAssessmentSummary(assessmentToken).then((response) => {
            setQuestionsCount(response.data.questions_count)
            setQuestionsCorrect(response.data.questions_correct)
        })
        // getIntakeAssessmentSummary
    }, [assessmentToken])

    if (questionsCount === null || questionsCorrect === null) {
        return(<CardContent>Loading...</CardContent>)
    }

    return(
        <CardContent>
            <div>
                Questions Count: { questionsCount }
            </div>
            Questions Correct: { questionsCorrect }
        </CardContent>
    )
}

export default IntakeSummary
