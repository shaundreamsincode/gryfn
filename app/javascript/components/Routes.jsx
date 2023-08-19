import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../components/Home";
import Register from "./onboarding/Register"
import Instructions from "./onboarding/Instructions";
import PrivacyPolicy from "./onboarding/PrivacyPolicy";

import Eidetic from "./Eidetic";
import Phonetic from "./Phonetic";


export default (
    <Router>
        <Fragment>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/register' element={<Register/>}/>
                <Route exact path='/instructions' element={<Instructions/>}/>
                <Route exact path='/privacy_policy' element={<PrivacyPolicy/>}/>

                <Route exact path='/eidetic' element={<Eidetic/>}/>
                <Route exact path='/phonetic' element={<Phonetic/>}/>
            </Routes>
        </Fragment>
    </Router>
);
