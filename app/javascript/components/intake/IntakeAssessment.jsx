import React, { useState, useEffect }  from "react";
import {CardContent, Button} from "@material-ui/core";
import ApiService from "../../services/ApiService";
import IntakeQuestion from "./IntakeQuestion";

const IntakeAssessment = () => {
    const currentUrl = window.location.href
    const assessmentToken = currentUrl.split("/")[4]
    const [assessment, setAssessment] = useState(null)

    useEffect(() => {
        ApiService.getIntakeAssessment(assessmentToken).then((response) => {
            setAssessment(response.data)
            console.log(response.data)
        })
    }, [assessmentToken])

    if (!assessment) {
        return(<CardContent>
            Loading...
        </CardContent>)
    }

    return(<CardContent>
        <div>
            {
                assessment.questions.map((question) => {
                    return (<IntakeQuestion question={question}/>)
                })
            }
        </div>

        <Button>Finish</Button>
    </CardContent>)
}

export default IntakeAssessment
