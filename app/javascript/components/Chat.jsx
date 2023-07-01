import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";

const Chat = () => {
    const [chat, setChat] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const currentUrl = window.location.href
    const urlToken = currentUrl.split("/")[4]
    const chatIsNew = urlToken === 'new'

    const navigate = useNavigate()

    useEffect(() => {
        if (chatIsNew) {
            ApiService.post('/api/v1/chats').then((response) => {
                setChat(response.data)
            })
        } else {
            ApiService.get(`/api/v1/chats/${urlToken}`).then((response) => {
                setChat(response.data)
            }).catch((error) => {
                setErrorMessage(error.response.data.error)
            })
        }
    }, [])

    if (chat && chatIsNew) {
        navigate(`/chats/${chat.token}`)
    }

    if (errorMessage) {
        return (<div>{ errorMessage }</div>)
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
