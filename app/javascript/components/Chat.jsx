import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";
import Messages from "./Messages";
import ClosedChat from "./ClosedChat";

const Chat = () => {
    const [chat, setChat] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [userClosedChat, setUserClosedChat] = useState(null)
    const [sendMessageLoading, setSendMessageLoading] = useState(false)

    const currentUrl = window.location.href
    const urlToken = currentUrl.split("/")[4]
    const chatIsNew = urlToken === 'new'

    const navigate = useNavigate()

    const onSendMessage = (messageContent) => {
        setSendMessageLoading(true)
        ApiService.post(`/api/v1/chats/${chat.token}/messages`, { content:  messageContent }).then((response) => {
            const updatedChat = { ...chat }

            updatedChat.messages.push(response.data.user_message)
            updatedChat.messages.push(response.data.assistant_message)

            setChat(updatedChat)
            setSendMessageLoading(false)
        });
    };

    const onCloseChat = () => {
        ApiService.post(`/api/v1/chats/${chat.token}/close`).then((response) => {
            setUserClosedChat(true)
        })
    }

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

    if (errorMessage) {
        return (<div>{ errorMessage }</div>)
    }

    if (chat && chatIsNew) {
        navigate(`/chats/${chat.token}`)
    }

    if (chat && userClosedChat) {
        return(<ClosedChat chat={chat}/>)
    }

    return(
        <div>
            <h2>Chat</h2>
            {
                !chat && <p>Loading...</p>
            }

            {
                chat && <div>
                    <Messages chat={chat} sendMessageLoading={sendMessageLoading} sendMessage={onSendMessage} closeChat={onCloseChat}/>
                </div>
            }
        </div>
    )
}

export default Chat
