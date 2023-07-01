import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";
import Messages from "./Messages";

const Chat = () => {
    const [chat, setChat] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const currentUrl = window.location.href
    const urlToken = currentUrl.split("/")[4]
    const chatIsNew = urlToken === 'new'

    const navigate = useNavigate()

    const onSendMessage = (messageContent) => {
        ApiService.post(`/api/v1/chats/${chat.token}/messages`, { content:  messageContent }).then((response) => {
            const updatedChat = { ...chat }
            updatedChat.messages.push(response.data)
            setChat(updatedChat)
        });
    };

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
                chat && <div>
                    <Messages chat={chat} sendMessage={onSendMessage}/>
                </div>
            }
        </div>
    )
}

export default Chat
