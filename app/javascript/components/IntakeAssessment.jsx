import React, { useState, useEffect }  from "react";
import {CardContent} from "@material-ui/core";
import ApiService from "../services/ApiService";
import IntakeSurvey from "./IntakeSurvey";

const IntakeAssessment = () => {
    const currentUrl = window.location.href
    const assessmentToken = currentUrl.split("/")[4]
    const [assessment, setAssignment] = useState(null)

    useEffect(() => {
        ApiService.getIntakeAssessment(assessmentToken).then((response) => {
            setAssignment(response.data)
        })
    }, [assessmentToken])

    if (!assessment) {
        return(<CardContent>
            Loading...
        </CardContent>)
    }

    if (!assessment.level_of_education) {
        return (
            <CardContent>
                <IntakeSurvey assessment={assessment}/>
            </CardContent>
            )
    }
    debugger

    return(<CardContent>
        Assessment ID:
        {
            assessment.id
        }
    </CardContent>)
}

export default IntakeAssessment
