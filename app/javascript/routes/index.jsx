import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../components/Home";

export default (
    <Router>
        <Fragment>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
            </Routes>
        </Fragment>
    </Router>
);
