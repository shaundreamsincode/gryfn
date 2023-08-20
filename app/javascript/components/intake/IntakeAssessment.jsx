import React, { useState, useEffect }  from "react";
import {CardContent, Button} from "@material-ui/core";
import ApiService from "../../services/ApiService";
import IntakeQuestion from "./IntakeQuestion";
import {useNavigate} from "react-router-dom";

const IntakeAssessment = () => {
    const navigate = useNavigate()

    const currentUrl = window.location.href
    const assessmentToken = currentUrl.split("/")[4]
    const [assessment, setAssessment] = useState(null)

    const onQuestionSave = () => {
        ApiService.getIntakeAssessment(assessmentToken).then((response) => {
            setAssessment(response.data)
        })
    }

    const handleFinishButtonClick = () => {
        navigate(`/intake_assessments/${assessmentToken}/summary`)
    }

    useEffect(() => {
        ApiService.getIntakeAssessment(assessmentToken).then((response) => {
            setAssessment(response.data)
        })
    }, [assessmentToken])

    if (!assessment) {
        return(<CardContent>
            Loading...
        </CardContent>)
    }

    const hasUnansweredQuestion = assessment.questions.some((question) => !question.answer);

    return(<CardContent>
        <div>
            {
                assessment.questions.map((question) => {
                    return (<IntakeQuestion question={question} onSave={onQuestionSave}/>)
                })
            }
        </div>

        <Button onClick={handleFinishButtonClick} disabled={hasUnansweredQuestion}>Finish</Button>
    </CardContent>)
}

export default IntakeAssessment
