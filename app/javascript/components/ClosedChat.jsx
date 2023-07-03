import React, { useState } from "react";
import ApiService from "../services/ApiService";
import {Button, Typography} from "@material-ui/core";

const ClosedChat = (props) => {
    const { chat } = props;
    const [summary, setSummary] = useState(null)
    const [summaryLoading, setSummaryLoading] = useState(false)

    const onGenerateSummary = () => {
        setSummaryLoading(true)

        ApiService.post(`/api/v1/chats/${chat.token}/summaries`).then((response) => {
            setSummary(response.data)
            setSummaryLoading(false)
        })
    }

    const getGenerateSummaryButtonText = () => {
        if (summaryLoading) {
            return 'Loading'
        } else if (summary) {
            return 'Summary Generated'
        } else {
            return 'Generate Summary'
        }
    }

    return(
        <>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                Chat has been closed by the user.
            </Typography>

            <Typography color="text.secondary" align="center" component="h1" variant="h4" gutterBottom>
                <Button onClick={onGenerateSummary} disabled={summaryLoading || summary} color="primary">
                    { getGenerateSummaryButtonText() }
                </Button>
            </Typography>

            {
                summary && <>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        <div id="summaryContent">
                            {summary.split('\n').map((item, index) => (
                                <div key={index}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </Typography>
                </>
            }
        </>
    )
}

export default ClosedChat