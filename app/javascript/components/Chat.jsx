import React, { useState, useEffect } from "react";
import axios from 'axios'

const Chat = () => {
    debugger
    // todo - use token instead...?
    const currentUrl = window.location.href
    const chatId = currentUrl.split("/")[4]

    return(
        <div>
            <h2>Chat</h2>
            <p>ID { chatId }</p>
        </div>
    )
}

export default Chat
