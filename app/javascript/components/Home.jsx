import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Typography } from '@material-ui/core';


const Home = () => {
    const navigate = useNavigate()

    return(
        <>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                Welcome! DocBot is an AI powered chatbot designed to help your doctor better care for you.
                DocBot will ask you a series of questions about the symptoms you are experiencing.
                Please answer with as much detail as you are able to. At the end of the chat,
                DocBot will generate a summary that you can provide to your doctor. Your doctor will
                be able to review this summary and they may ask further clarifying questions.
                Then, your doctor will talk to you about any possible recommended tests and make a treatment plan.
            </Typography>

            <Typography color="text.secondary" align="center" component="h1" variant="h4" gutterBottom>
                <Button onClick={() => navigate('/chats/new')} color="primary">Create a New Chat</Button>
            </Typography>
        </>
    )
};

export default Home
