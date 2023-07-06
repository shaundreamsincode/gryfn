import React from 'react'
import {Grid, ListItem, Typography} from "@material-ui/core";
import LanguageService from "../../../../services/LanguageService";

const Message = (props) => {
    const { messageType, messageContent, messageId } = props

    const getBackgroundColor = () => {
        if (messageType === 'assistant' || 'loading') {
            return '#dbdbd9'
        } else {
            return '#ffffff'
        }
    }

    const getMessageContent = () => {
        if (messageType === 'user') {
            const displayedRoleTranslation = LanguageService.translate('patient')
            return `${displayedRoleTranslation}: ${messageContent}`
        } else if (messageType === 'assistant') {
            const displayedRoleTranslation = LanguageService.translate('doctor')
            return `${displayedRoleTranslation}: ${messageContent}`
        } else {
            return `${LanguageService.translate('loading')}...`
        }
    }

    return(
        <ListItem key={messageId || 'loading'}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography
                        variant="body1"
                        style={
                            {
                                whiteSpace: 'pre-line',
                                backgroundColor: getBackgroundColor(),
                                borderRadius: '5px',
                                padding: '10px'
                            }
                        }
                    >
                        { getMessageContent() }
                    </Typography>
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default Message