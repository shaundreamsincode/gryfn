import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";

const Chat = () => {
    const [chat, setChat] = useState(null)

    const currentUrl = window.location.href
    const urlId = currentUrl.split("/")[4]
    const chatIsNew = urlId === 'new'

    const navigate = useNavigate()

    useEffect(() => {
        if (chatIsNew) {
            ApiService.post('/api/v1/chats').then((response) => {
                setChat(response.data)
            })
        } else {
            ApiService.get(`/api/v1/chat/${urlId}`).then((response) => {
                setChat(response.data)
            })
        }
    }, [''])
    // todo - use token instead...?

    if (chat && chatIsNew) {
        navigate(`/chats/${chat.id}`)
    }

    return(
        <div>
            <h2>Chat</h2>
            {
                !chat && <p>Loading...</p>
            }

            {
                chat && <p>ID { chat.id }</p>
            }
        </div>
    )
}

export default Chat
