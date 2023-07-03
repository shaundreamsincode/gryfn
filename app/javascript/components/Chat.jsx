import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";
import LanguageService from "../services/LanguageService";
import { useNavigate } from "react-router-dom";
import Messages from "./Messages";
import ChatSummary from "./ChatSummary";
import {Typography, Divider, Button} from "@material-ui/core";

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

        const chatWithPendingMessage = { ...chat }
        chatWithPendingMessage.messages.push({ role: 'user', content: messageContent })
        chatWithPendingMessage.messages.push({ role: 'assistant', content: '...' })

        ApiService.post(`/api/v1/chats/${chat.token}/messages`, { content:  messageContent }).then((response) => {
            const updatedChat = { ...chat }

            // remove the pending chat items
            updatedChat.messages = updatedChat.messages.slice(0, updatedChat.messages.length - 2)

            // add in the messages hydrated from the FE
            updatedChat.messages.push(response.data.user_message)
            updatedChat.messages.push(response.data.assistant_message)

            // update state
            setChat(updatedChat)
            setSendMessageLoading(false)
        });
    };

    const onCloseChat = () => {
        ApiService.post(`/api/v1/chats/${chat.token}/close`).then((response) => {
            setUserClosedChat(true)
        })
    }

    const updateChat = (chat) => {
        localStorage.setItem('lang', chat.language)
        setChat(chat)
    }

    useEffect(() => {
        if (chatIsNew) {
            const language = localStorage.getItem('lang') || 'en';

            ApiService.post('/api/v1/chats', { chat: { language: language } }).then((response) => {
                updateChat(response.data)
            })
        } else {
            ApiService.get(`/api/v1/chats/${urlToken}`).then((response) => {
                updateChat(response.data)
            }).catch((error) => {
                setErrorMessage(error.response.data.error)
            })
        }
    }, [])

    if (errorMessage) {
        return (
            <>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    { LanguageService.translate(errorMessage) }
                </Typography>

                <Button onClick={() => navigate('/')} style={{ marginTop: '10px' }} align="right" color="primary">
                    { LanguageService.translate('homeButton') }
                </Button>
            </>
        )
    }

    if (chat && chatIsNew) {
        navigate(`/chats/${chat.token}`)
    }

    if (chat && userClosedChat) {
        return(<ChatSummary chat={chat}/>)
    }

    return(
        <>
            {
                !chat && <Typography component="h1" variant="h4" align="center">
                    ...
                </Typography>
            }

            {
                chat && <div>
                    <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
                        {
                            LanguageService.translate('chatInstructions')
                        }
                    </Typography>
                    <Divider/>
                    <Messages chat={chat} sendMessageLoading={sendMessageLoading} sendMessage={onSendMessage} closeChat={onCloseChat}/>
                </div>
            }
        </>
    )
}

export default Chat
