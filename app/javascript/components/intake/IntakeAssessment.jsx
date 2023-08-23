import React, { useState, useEffect } from "react";
import { CardContent } from "@material-ui/core";
import ApiService from "../../services/ApiService";
import IntakeSpellingQuestions from "./IntakeSpellingQuestions";

const IntakeAssessment = () => {
    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[4];
    const [assessment, setAssessment] = useState(null)

    useEffect(() => {
        ApiService.getIntakeAssessment(assessmentToken).then((response) => {
            setAssessment(response.data);
        });
    }, [assessmentToken]);

    if (!assessment) {
        return (
            <CardContent>
                Loading...
            </CardContent>
        );
    }

    return(<IntakeSpellingQuestions questions={assessment.spelling_questions}/>)
};

export default IntakeAssessment;
