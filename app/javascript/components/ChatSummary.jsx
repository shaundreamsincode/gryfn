import React, { useState, useEffect, useRef } from "react";
import ApiService from "../services/ApiService";
import LanguageService from "../services/LanguageService";
import {Button, Typography, Snackbar, Toolbar, Divider} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Disclaimer from "./Disclaimer";

const ChatSummary = (props) => {
    const { chat } = props;

    const [summary, setSummary] = useState(null);
    const [summaryPrompt, setSummaryPrompt] = useState(null)
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const summaryContentRef = useRef(null);
    const navigate = useNavigate()

    const generateSummary = () => {
        setSummaryLoading(true);

        ApiService.post(`/api/v1/chats/${chat.token}/summaries`).then(
            (response) => {
                setSummary(response.data.summary);
                setSummaryPrompt(response.data.summary_prompt)
                setSummaryLoading(false);
            }
        );
    };

    useEffect(() => { generateSummary() }, [])

    const onCopySummary = () => {
        const summaryContent = summaryContentRef.current.innerText;
        navigator.clipboard.writeText(summaryContent).then(() => {
            console.log(`${LanguageService.translate('summaryCopied')}`);
        });

        setSnackbarOpen(true)
    };

    return (
        <>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                { LanguageService.translate('chatClosed') }
            </Typography>

            {
                !summary && <Typography variant="body2" color="text.secondary" gutterBottom>
                    { LanguageService.translate('summaryLoading') }
                </Typography>
            }

            {summary && (
                <>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        <div id="summaryContent" ref={summaryContentRef}>
                            {summary.split("\n").map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </div>
                    </Typography>
                    <Divider/>
                    <br/>
                    {
                        summaryPrompt &&  <Typography variant="body2" color="text.secondary" gutterBottom>
                            <div id="summaryContent" ref={summaryContentRef}>
                                {summaryPrompt.split("\n").map((item, index) => (
                                    <div key={index}>{item}</div>
                                ))}
                            </div>
                        </Typography>

                    }
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={() => setSnackbarOpen(false)}
                        message={ LanguageService.translate('summaryCopied') }
                    />
                </>
            )}
            <Toolbar>
                <Button onClick={() => navigate('/')} style={{ marginTop: '10px' }} align="right" color="primary">
                    { LanguageService.translate('homeButton') }
                </Button>
                {
                    summary && <Button onClick={onCopySummary} style={{ marginTop: '10px' }} color="primary">
                        { LanguageService.translate('copySummaryButton') }
                    </Button>
                }
            </Toolbar>
            <Disclaimer lang={chat.language}/>
        </>
    );
};

export default ChatSummary;
