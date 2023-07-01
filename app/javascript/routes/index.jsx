import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Chats from "../components/Chats";

export default (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chats" element={<Chats />} />
        </Routes>
    </Router>
);
