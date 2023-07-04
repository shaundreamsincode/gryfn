import React, { useState,useEffect, useRef, KeyboardEvent } from "react";
import { Grid, List, ListItem, Divider, TextField, Paper, Button, Typography } from '@material-ui/core';
import LanguageService from "../services/LanguageService";

const Messages = (props) => {
    const { chat, sendMessageLoading, sendMessage, closeChat } = props;
    const [content, setContent] = useState('')

    const paperRef = useRef(null);
    const textFieldRef = useRef(null);
    const autoScrollEnabled = useRef(true);

    const viewableMessages = (chat.messages).filter(message => message.role !== "system");

    useEffect(() => {
        if (paperRef.current) {
            paperRef.current.scrollTop = paperRef.current.scrollHeight;
        }
    }, [(viewableMessages.length)]);

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(content);
        setContent('')
    };

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    }

    return(<Grid container>
        <Grid item xs={12}>
            <Paper ref={paperRef} style={{maxHeight: 600, width: '100%', overflow: 'auto'}}>
                <List className='messageArea'>
                    {
                        viewableMessages.map((message) => {
                            const displayedRoleTranslation = message.role === 'user' ? 'patient' : 'doctor'
                            const displayedContent = `${LanguageService.translate(displayedRoleTranslation)}: ${message.content}`
                            const backgroundColor = message.role === 'user' ? '#ffffff' : '#dbdbd9'
                            return(
                                <ListItem key={message.id}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="body1"
                                                style={
                                                    {
                                                        whiteSpace: 'pre-line',
                                                        backgroundColor: backgroundColor,
                                                        borderRadius: '5px',
                                                        padding: '10px'
                                                    }
                                                }
                                            >
                                                { displayedContent }
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            )
                        })
                    }
                    {
                        sendMessageLoading && <ListItem key='loading'>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body1"
                                        style={
                                            {
                                                whiteSpace: 'pre-line',
                                                backgroundColor: '#dbdbd9',
                                                borderRadius: '5px',
                                                padding: '10px'
                                            }
                                        }
                                    >
                                        Loading...
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    }
                </List>
            </Paper>
            <Divider />
            <Grid container style={{padding: '20px'}}>
                <Grid item xs={11}>
                    <TextField
                        ref={textFieldRef}
                        multiline
                        fullWidth
                        value={content}
                        rows={4}
                        maxRows={4}
                        onChange={(event) => { setContent(event.target.value) }}
                        label={LanguageService.translate('chatTextboxPlaceholder')}
                        onKeyDown={onKeyDown}
                    />
                </Grid>
                <Grid xs={1} align="right">
                    <Button onClick={handleSubmit} disabled={ sendMessageLoading || content.length === 0 } color="primary">
                        { LanguageService.translate('sendButton') }
                    </Button>
                </Grid>
                <Grid xs={11} style={ { marginTop: "30px" } } align="left">
                    <Button onClick={closeChat} color="primary"> { LanguageService.translate('finishButton') }</Button>
                </Grid>
            </Grid>
        </Grid>
    </Grid>)
}

export default Messages
