import React, { useState } from "react";
import ApiService from "../services/ApiService";

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
        <div>
            Chat has been closed by the user. <br/>
            <button onClick={onGenerateSummary} disabled={summaryLoading || summary}>
                {
                    getGenerateSummaryButtonText()
                }
            </button> <br/> <br/>

            {
                summary && (
                    <div>
                        {summary.split('\n').map((item, index) => (
                            <div key={index}>
                                {item}
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default ClosedChat