import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../components/Home";
import Register from "./onboarding/Register"
import Instructions from "./onboarding/Instructions";
import PrivacyPolicy from "./onboarding/PrivacyPolicy";

import IntakeAssessment from "./intake/IntakeAssessment";
import IntakeSummary from "./intake/IntakeSummary";
import IntakeSpeechQuestions from "./intake/IntakeSpeechQuestions";
export default (
    <Router>
        <Fragment>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/register' element={<Register/>}/>
                <Route exact path='/instructions' element={<Instructions/>}/>
                <Route exact path='/privacy_policy' element={<PrivacyPolicy/>}/>

                <Route exact path='/intake_assessments/:intakeAssessmentToken' element={<IntakeAssessment/>}/>
                <Route exact path='/intake_assessments/:intakeAssessmentToken/summary' element={<IntakeSummary/>}/>
                <Route exact path='/intake_assessments/:intakeAssessmentToken/speech_questions' element={<IntakeSpeechQuestions/>}/>
            </Routes>
        </Fragment>
    </Router>
);
