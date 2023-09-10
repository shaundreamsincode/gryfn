import React, { useState } from "react";
import {CardContent, Typography} from "@mui/material";
import SurveyWelcome from "./SurveyWelcome";
import SurveyInstructions from "./SurveyInstructions";
import SurveyAcceptTerms from "./SurveyAcceptTerms";
import SurveyRegister from "./SurveyRegister";
import {useNavigate} from "react-router";

const IntakeSurvey = () => {
    const steps = ['welcome', 'instructions', 'accept_terms', 'register']
    const [currentStepIndex, setCurrentStepIndex] = useState(3)

    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[5];
    const navigate = useNavigate()

    const handleMoveToNextStep = () => {
        setCurrentStepIndex(currentStepIndex + 1)
    }

    const fetchContent = () => {
        const currentStep = steps[currentStepIndex]

        if (currentStep === 'welcome') {
            return(<SurveyWelcome moveToNextStepProp={handleMoveToNextStep}/>)
        }

        if (currentStep === 'instructions') {
            return (<SurveyInstructions moveToNextStepProp={handleMoveToNextStep}/>)
        }

        if (currentStep === 'accept_terms') {
            return (<SurveyAcceptTerms moveToNextStepProp={handleMoveToNextStep}/>)
        }

        if (currentStep === 'register') {
            return(<
                SurveyRegister
                assessmentToken={assessmentToken}
                moveToNextStepProp={() => { navigate(`/intake/intake_assessments/${assessmentToken}`) } }
            />)
        }

        return(<div>Error!</div>)
    }

    return(<CardContent>

        <Typography>Intake Survey</Typography>

        {
            fetchContent()
        }

    </CardContent>)
}

export default IntakeSurvey
