import React, { useEffect } from "react";
import IntakeService from "../../services/IntakeService";
import {useNavigate} from "react-router-dom";

const IntakeAssessment = () => {
    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[5];
    const navigate = useNavigate()

    useEffect(() => {
        IntakeService.getIntakeAssessment(assessmentToken).then((response) => {
            const currentStep = response.data.current_step
            navigate(`/intake/intake_assessments/${assessmentToken}/${currentStep}`)
        });
    }, [assessmentToken]);
};

export default IntakeAssessment;
