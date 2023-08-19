import React, { useState, useEffect }  from "react";
import {CardContent} from "@material-ui/core";
import ApiService from "../services/ApiService";

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

    return(<CardContent>
        Assessment ID:
        {
            assessment.id
        }
    </CardContent>)
}

export default IntakeAssessment
