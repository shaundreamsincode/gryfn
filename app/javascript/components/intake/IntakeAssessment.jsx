import React, { useState, useEffect } from "react";
import {Card, CardContent} from "@material-ui/core";
import ApiService from "../../services/ApiService";
import IntakeEideticQuestions from "./IntakeEideticQuestions";
import IntakePhoneticQuestions from "./IntakePhoneticQuestions";
import IntakeSpeechQuestions from "./IntakeSpeechQuestions";
import IntakeSummary from "./IntakeSummary";
import {useNavigate} from "react-router-dom";

const IntakeAssessment = () => {
    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[4];
    const navigate = useNavigate()
    const [insufficientCorrectSpeechQuestions, setInsufficientCorrectSpeechQuestions] = useState(false)
    const [insufficientIncorrectSpeechQuestions, setInsufficientIncorrectSpeechQuestions] = useState(false)


    useEffect(() => {
        ApiService.getIntakeAssessment(assessmentToken).then((response) => {
            const currentStep = response.data.current_step

            if (currentStep === "fail_insufficient_correct") {
                return(<CardContent>
                    Sorry, you didn't answer enough questions to continue onto the next portion of the assessment.
                </CardContent>)
            }

            if (currentStep === "fail_insufficient_incorrect") {
                return(<CardContent>
                    Sorry, you didn't answer enough questions to continue onto the next portion of the assessment.
                </CardContent>)
            }

            navigate(`/intake_assessments/${assessmentToken}/${currentStep}`)
        });
    }, [assessmentToken]);

    // const handleQuestionsFinished = () => {
    //     ApiService.moveIntakeAssessmentToNextStep(assessmentToken).then((response) => {
    //         const nextStep = response.data.current_step
    //
    //         setCurrentStep(nextStep)
    //         navigate(`/intake_assessments/${assessmentToken}/${nextStep}`)
    //     })
    // }

    // if (currentStep === "speech") {
    //     return(
    //         <IntakeSpeechQuestions
    //             assessmentToken={assessmentToken}
    //             onFinish={handleQuestionsFinished}
    //         />)
    // }
    //
    // if (currentStep === "eidetic") {
    //     return(<IntakeEideticQuestions
    //         assessmentToken={assessmentToken}
    //         onFinish={handleQuestionsFinished}
    //     />)
    // }
    //
    // if (currentStep === "phonetic") {
    //     return(<IntakePhoneticQuestions
    //         questions={assessment.phonetic_questions}
    //         onFinish={handleQuestionsFinished}
    //         />
    //     )
    // }
    //
    // if (currentStep === "summary") {
    //     // navigate('/')
    //     // return<IntakeSummary/>
    // }

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
