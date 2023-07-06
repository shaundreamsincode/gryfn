import React, { useState,useEffect, useRef, KeyboardEvent } from "react";
import {
    Grid,
    List,
    ListItem,
    Divider,
    TextField,
    Paper,
    Button,
    Typography,
    CardContent,
    Toolbar, Box
} from '@material-ui/core';
import LanguageService from "../../../../services/LanguageService";
import Message from "./Message";
import ClearMessagesDialog from "./ClearMessagesDialog";

const Messages = (props) => {
    const { chat, sendMessageLoading, sendMessage, clearChatMessages, closeChat } = props;
    const [content, setContent] = useState('')

    const paperRef = useRef(null);
    const textFieldRef = useRef(null);
    const autoScrollEnabled = useRef(true);
    const [clearMessagesDialogOpen, setClearMessagesDialogOpen] = useState(false)

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

    const handleClearMessagesConfirmation = () => {
        setClearMessagesDialogOpen(false)
        clearChatMessages()
    }

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
                            return(
                                <Message messageType={message.role}
                                         messageContent={message.content}
                                         messageId={message.id}
                                />
                            )
                        })
                    }
                    {
                        sendMessageLoading && <Message messageType='loading'/>
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
                <Toolbar style={{display:'flex', justifyContent:"space-between", width:'100%'}}>
                    <Box display='flex' flexGrow={1}>
                        <Grid xs={11} style={ { marginTop: "30px" } } align="left">
                            <Button onClick={closeChat} color="primary"> { LanguageService.translate('finishButton') }</Button>
                        </Grid>

                        <Grid xs={11} style={ { marginTop: "30px" } } align="left">
                            <Button onClick={() => setClearMessagesDialogOpen(true)} color="primary"> { LanguageService.translate('clearMessagesButton') }</Button>
                        </Grid>
                    </Box>
                </Toolbar>

                <ClearMessagesDialog
                    open={clearMessagesDialogOpen}
                    closeDialog={() => setClearMessagesDialogOpen(false)}
                    dialogConfirmation={handleClearMessagesConfirmation}
                />
            </Grid>
        </Grid>
    </Grid>)
}

export default Messages
