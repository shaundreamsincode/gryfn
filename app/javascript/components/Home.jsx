import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Typography } from '@material-ui/core';


const Home = () => {
    const navigate = useNavigate()

    const onNewChatClick = () => {
        navigate('/chats/new')
    }

    return(
        <>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                Welcome!
            </Typography>

            <Button onClick={onNewChatClick} color="primary">Create a New Chat</Button>
        </>
    )
};

export default Home