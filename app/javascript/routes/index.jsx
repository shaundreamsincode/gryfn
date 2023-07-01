import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import PrivateRoute from "../components/PrivateRoute";

import Login from "../components/Login";
import SignUp from "../components/SignUp";

import Home from "../components/Home";
import Chats from "../components/Chats";

export default (
    <Router>
        <Fragment>
            <Routes>
                <Route exact path='/' element={<PrivateRoute/>}>
                    <Route exact path='/' element={<Home/>}/>
                </Route>
                <Route exact path='/chats' element={<PrivateRoute/>}>
                    <Route exact path='/chats' element={<Chats/>}/>
                </Route>
                <Route exact path='/signup' element={<SignUp/>}/>
                <Route exact path='/login' element={<Login/>}/>
            </Routes>
        </Fragment>
    </Router>

    // <Router>
    //     <Routes>
    //         <Fragment>
    //             <Route path="/login" element={<Login />} />
    //
    //             <ProtectedRoute path="/" component={<Home />} />
    //             <ProtectedRoute path="/chats" component={<Chats />} />
    //         </Fragment>
    //     </Routes>
    // </Router>
);
