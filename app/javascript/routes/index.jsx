import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../components/Home";
import Chat from "../components/Chat";

export default (
    <Router>
        <Fragment>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path='/chats/:token' element={<Chat/>}/>

                {/*<Route exact path='/' element={<PrivateRoute/>}>*/}
                {/*    <Route exact path='/' element={<Home/>}/>*/}
                {/*</Route>*/}
                {/*<Route exact path='/chats' element={<PrivateRoute/>}>*/}
                {/*    <Route exact path='/chats' element={<Chats/>}/>*/}
                {/*</Route>*/}
                {/*<Route exact path='/chats/:id' element={<PrivateRoute/>}>*/}
                {/*    <Route exact path='/chats/:id' element={<Chat/>}/>*/}
                {/*</Route>*/}
                {/*<Route exact path='/signup' element={<SignUp/>}/>*/}
                {/*<Route exact path='/login' element={<Login/>}/>*/}
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
