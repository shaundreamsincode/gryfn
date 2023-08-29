import React, { useState, useEffect } from "react";
import {Card, CardContent} from "@material-ui/core";
import ApiService from "../../services/ApiService";
import IntakeEideticQuestions from "./IntakeEideticQuestions";
import IntakePhoneticQuestions from "./IntakePhoneticQuestions";

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

    return(<IntakeEideticQuestions questions={assessment.eidetic_questions} assessmentToken={assessmentToken}/>)
    // return(<IntakeEideticQuestions title="Eidetic" questions={assessment.eidetic_questions}/>)


    // if (assessment.current_step === "speech") {
    //     return(<IntakeSpeechQuestions questions={assessment.speech_questions}/>)
    // }

    // if (assessment.current_step === "eidetic") {
    //     return(<IntakeEideticQuestions title="Eidetic" questions={assessment.eidetic_questions}/>)
    // }

    // if (assessment.current_step === "phonetic") {
    //     return(<IntakeEideticQuestions title="Phonetic" questions={assessment.phonetic_questions}/>)
    // }

    // return(<CardContent>Invalid current step</CardContent>)
};

export default IntakeAssessment;
