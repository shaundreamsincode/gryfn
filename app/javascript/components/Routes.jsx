import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../components/Home";

// onboarding
import Register from "./onboarding/Register"
import Instructions from "./onboarding/Instructions";
import PrivacyPolicy from "./onboarding/PrivacyPolicy";

// toolbar
import About from "./About";
import Contact from "./Contact";

// intake
import IntakeAssessment from "./intake/IntakeAssessment";
import IntakeSummary from "./intake/IntakeSummary";

import IntakeSpeechQuestions from "./intake/IntakeSpeechQuestions";
import IntakeEideticQuestions from "./intake/IntakeEideticQuestions";
import IntakePhoneticQuestions from "./intake/IntakePhoneticQuestions";

export default (
    <Router>
        <Fragment>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/register' element={<Register/>}/>
                <Route exact path='/instructions' element={<Instructions/>}/>
                <Route exact path='/privacy_policy' element={<PrivacyPolicy/>}/>

                <Route exact path='/contact' element={<Contact/>}/>
                <Route exact path='/about' element={<About/>}/>

                <Route exact path='/intake_assessments/:intakeAssessmentToken' element={<IntakeAssessment/>}/>
                <Route exact path='/intake_assessments/:intakeAssessmentToken/summary' element={<IntakeSummary/>}/>

                <Route exact path='/intake_assessments/:intakeAssessmentToken/speech' element={<IntakeSpeechQuestions/>}/>
                <Route exact path='/intake_assessments/:intakeAssessmentToken/eidetic' element={<IntakeEideticQuestions/>}/>
                <Route exact path='/intake_assessments/:intakeAssessmentToken/phonetic' element={<IntakePhoneticQuestions/>}/>
            </Routes>
        </Fragment>
    </Router>
);
