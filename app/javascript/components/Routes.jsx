import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../components/Home";
import Application from "./application/Application";

import Login from "./Login";
import RequestAccess from "./RequestAccess";

import ApplicationRoute from "./ApplicationRoute";

// toolbar
import About from "./app_toolbar/About";
import Contact from "./app_toolbar/Contact";
import FrequentlyAskedQuestions from "./app_toolbar/FrequentlyAskedQuestions";
import DyslexiaResources from "./app_toolbar/DyslexiaResources";
import TermsOfService from "./app_toolbar/TermsOfService";
import PrivacyPolicy from "./app_toolbar/PrivacyPolicy";


// intake
import IntakeAssessment from "./intake/IntakeAssessment";
import IntakeSummary from "./intake/IntakeSummary";
import IntakeEideticQuestions from "./intake/IntakeEideticQuestions";
import IntakePhoneticQuestions from "./intake/IntakePhoneticQuestions";
import IntakeInsufficientCorrectSpeechQuestionsFailure
    from "./intake/failures/IntakeInsufficientCorrectSpeechQuestionsFailure";
import IntakeInsufficientIncorrectSpeechQuestionsFailure
    from "./intake/failures/IntakeInsufficientIncorrectSpeechQuestionsFailure";
import IntakeSpeechQuestion from "./intake/speech_questions/IntakeSpeechQuestion";

import IntakeSurvey from "./intake/survey/IntakeSurvey";

export default (
    <Router>
        <Fragment>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/login' element={<Login/>}/>
                <Route exact path='/request_access' element={<RequestAccess/>}/>

                <Route exact path='/about' element={<About/>}/>
                <Route exact path='/contact' element={<Contact/>}/>
                <Route exact path='/faq' element={<FrequentlyAskedQuestions/>}/>
                <Route exact path='/dyslexia_resources' element={<DyslexiaResources/>}/>
                <Route exact path='/privacy_policy' element={<PrivacyPolicy/>}/>
                <Route exact path='/terms_of_service' element={<TermsOfService/>}/>

                <Route exact path='intake/intake_assessments/:intakeAssessmentToken' element={<IntakeAssessment/>}/>

                <Route exact path='intake/intake_assessments/:intakeAssessmentToken/survey' element={<IntakeSurvey/>}/>
                <Route exact path='intake/intake_assessments/:intakeAssessmentToken/summary' element={<IntakeSummary/>}/>

                <Route exact path='intake/intake_assessments/:intakeAssessmentToken/speech' element={<IntakeSpeechQuestion/>}/>
                <Route exact path='intake/intake_assessments/:intakeAssessmentToken/eidetic' element={<IntakeEideticQuestions/>}/>
                <Route exact path='intake/intake_assessments/:intakeAssessmentToken/phonetic' element={<IntakePhoneticQuestions/>}/>
                <Route exact path='intake/intake_assessments/:intakeAssessmentToken/fail_insufficient_correct' element={<IntakeInsufficientCorrectSpeechQuestionsFailure/>}/>
                <Route exact path='intake/intake_assessments/:intakeAssessmentToken/fail_insufficient_incorrect' element={<IntakeInsufficientIncorrectSpeechQuestionsFailure/>}/>

                {/*<Route exact path='/application' element={<ApplicationRoute/>}>*/}
                {/*    <Route exact path='/application' element={<Application/>}/>*/}
                {/*</Route>*/}

                <Route exact path='/application/dashboard' element={<ApplicationRoute/>}>
                    <Route exact path='/application/dashboard' element={<Application/>}/>
                </Route>

                <Route exact path='/application/intake_assessments/:token' element={<ApplicationRoute/>}>
                    <Route exact path='/application/intake_assessments/:token' element={<Application/>}/>
                </Route>

                <Route exact path='/application/account_settings' element={<ApplicationRoute/>}>
                    <Route exact path='/application/account_settings' element={<Application/>}/>
                </Route>
            </Routes>
        </Fragment>
    </Router>
);
