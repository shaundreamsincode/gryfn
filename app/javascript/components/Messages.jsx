import React, { useState } from "react";
import { Grid, List, ListItem, ListItemText, Divider, TextField, Paper, Button } from '@material-ui/core';

const Messages = (props) => {
    const { chat, sendMessageLoading, sendMessage, closeChat } = props;
    const [content, setContent] = useState('')

    const viewableMessages = (chat.messages).filter(message => message.role !== "system");

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(content);
        setContent(""); // Clear the input after sending the message
    };

    return(<Grid container>
        <Grid item xs={12}>
            <Paper style={{maxHeight: 600, width: '100%', overflow: 'auto'}}>
                <List className='messageArea'>
                    {
                        viewableMessages.map((message) => {
                            const displayedRole = message.role === 'user' ? 'PATIENT' : 'DOCTOR'
                            const listItemContent = `${displayedRole}: ${message.content}`
                            return(
                                <ListItem key={message.id}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <ListItemText primary={ listItemContent }/>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Paper>
            <Divider />
            <Grid container style={{padding: '20px'}}>
                <Grid item xs={11}>
                    <TextField
                        multiline
                        fullWidth
                        value={content}
                        rows={4}
                        maxRows={4}
                        onChange={(event) => setContent(event.target.value)}
                        label="Type Something"
                    />
                </Grid>
                <Grid xs={1} align="right">
                    <Button onClick={handleSubmit} disabled={ sendMessageLoading || content.length === 0 } color="primary">
                        Send
                    </Button>
                </Grid>
                <Grid xs={11} style={ { marginTop: "30px" } } align="left">
                    <Button onClick={closeChat} color="primary">Close Chat</Button>
                </Grid>
            </Grid>
        </Grid>
    </Grid>)
}

export default Messages
