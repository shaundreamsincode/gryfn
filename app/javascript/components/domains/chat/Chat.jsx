import React, { useState, useEffect } from "react";
import ApiService from "../../../services/ApiService";
import LanguageService from "../../../services/LanguageService";
import { useNavigate } from "react-router-dom";
import Messages from "./components/Messages";
import ChatSummary from "./components/ChatSummary";
import Disclaimer from "../../Disclaimer";
import {Typography, Divider, Button, CardContent} from "@material-ui/core";

const Chat = () => {
    const [chat, setChat] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [userClosedChat, setUserClosedChat] = useState(null)
    const [sendMessageLoading, setSendMessageLoading] = useState(false)

    const navigate = useNavigate()
    const currentUrl = window.location.href
    const urlToken = currentUrl.split("/")[4]

    if (!urlToken) {
        // we are on "/chats/". To avoid confusion, let's redirect to the home page.
        navigate('/')
    }
    const chatIsNew = urlToken === 'new'


    const onSendMessage = (messageContent) => {
        setSendMessageLoading(true)

        const chatWithPendingMessage = { ...chat }
        chatWithPendingMessage.messages.push({ role: 'user', content: messageContent })
        // chatWithPendingMessage.messages.push({ role: 'assistant', content: '...' })

        ApiService.post(`/api/v1/chats/${chat.token}/messages`, { content:  messageContent }).then((response) => {
            const updatedChat = { ...chat }

            // add in the assistant message hydrated from the FE
            updatedChat.messages.push(response.data.assistant_message)

            // update state
            setChat(updatedChat)
            setSendMessageLoading(false)
        });
    };

    const onClearChatMessages = () => {
        ApiService.post(`/api/v1/chats/${chat.token}/clear_messages`).then((response) => {
            setChat(response.data)
        })
    }

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
                if (error.response.data.error === 'chatClosed') { // todo - make a non hardcoded string...
                    navigate(`/`)
                } else {
                    setErrorMessage(error.response.data.error)
                }
            })
        }
    }, [])

    if (errorMessage) {
        return (
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    { LanguageService.translate(errorMessage) }
                </Typography>

                <Button onClick={() => navigate('/')} style={{ marginTop: '10px' }} align="right" color="primary">
                    { LanguageService.translate('homeButton') }
                </Button>
            </CardContent>
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
                chat && <CardContent>
                    <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
                        {
                            LanguageService.translate('chatInstructions')
                        }
                    </Typography>
                    <Divider/>
                    <Messages chat={chat}
                              sendMessageLoading={sendMessageLoading}
                              sendMessage={onSendMessage}
                              clearChatMessages={onClearChatMessages}
                              closeChat={onCloseChat}
                    />
                    <Divider/>
                    <Disclaimer lang={chat.lang}/>

                    <Button style={{ float: 'right', 'marginBottom': '10px'}}>
                        <a href="https://docbot.tech/contact" style={{ 'textDecoration': 'none' }}>Contact</a>
                    </Button>
                </CardContent>
            }
        </>
    )
}

export default Chat
