import React, { useState, useRef } from "react";
import ApiService from "../services/ApiService";
import { Button, Typography, Snackbar } from "@material-ui/core";

const ClosedChat = (props) => {
    const { chat } = props;
    const [summary, setSummary] = useState(null);
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const summaryContentRef = useRef(null);

    const onGenerateSummary = () => {
        setSummaryLoading(true);

        ApiService.post(`/api/v1/chats/${chat.token}/summaries`).then(
            (response) => {
                setSummary(response.data);
                setSummaryLoading(false);
            }
        );
    };

    const getGenerateSummaryButtonText = () => {
        if (summaryLoading) {
            return "Loading";
        } else if (summary) {
            return "Summary Generated";
        } else {
            return "Generate Summary";
        }
    };

    const onCopySummary = () => {
        const summaryContent = summaryContentRef.current.innerText;
        navigator.clipboard.writeText(summaryContent).then(() => {
            console.log("Summary content copied to clipboard!");
        });

        setSnackbarOpen(true)
    };

    return (
        <>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Chat has been closed by the user.
            </Typography>

            <Typography
                color="text.secondary"
                align="center"
                component="h1"
                variant="h4"
                gutterBottom
            >
                <Button
                    onClick={onGenerateSummary}
                    disabled={summaryLoading || summary}
                    color="primary"
                >
                    {getGenerateSummaryButtonText()}
                </Button>
            </Typography>

            {summary && (
                <>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        <div id="summaryContent" ref={summaryContentRef}>
                            {summary.split("\n").map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </div>
                    </Typography>

                    <Button onClick={onCopySummary} style={{ marginTop: '10px' }} align="right" color="primary">
                        Copy Summary
                    </Button>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={() => setSnackbarOpen(false)}
                        message="Text Copied to Clipboard!"
                    />
                </>
            )}
        </>
    );
};

export default ClosedChat;
