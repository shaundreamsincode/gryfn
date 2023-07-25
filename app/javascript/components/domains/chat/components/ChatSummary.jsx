import React, { useState, useEffect, useRef } from "react";
import ApiService from "../../../../services/ApiService";
import LanguageService from "../../../../services/LanguageService";
import { Button, Typography, Snackbar, Toolbar } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Disclaimer from "../../../Disclaimer";
import EmailSummaryDialog from "./EmailSummaryDialog";

const ChatSummary = (props) => {
    const { chat } = props;

    const [summary, setSummary] = useState(null);
    const [summaryLoading, setSummaryLoading] = useState(true)
    const [hasNoUserMessages, setHasNoUserMessages] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [emailSummaryDialogOpen, setEmailSummaryDialogOpen] = useState(false)

    const summaryContentRef = useRef(null);
    const navigate = useNavigate()

    const generateSummary = () => {
        ApiService.post(`/api/v1/chats/${chat.token}/summaries`).then(
            (response) => {
                setSummaryLoading(false)
                setSummary(response.data);
            }
        ).catch((error) => {
            if (error.response.data.error === 'no_user_messages') {
                setSummaryLoading(false)
                setHasNoUserMessages(true)
            }
        });
    };

    useEffect(() => { generateSummary() }, [])

    const onCopySummary = () => {
        const summaryContent = summaryContentRef.current.innerText;

        navigator.clipboard.writeText(summaryContent).then(() => {
            console.log(`${LanguageService.translate('summaryCopied')}`);
        });

        setSnackbarMessage(LanguageService.translate('summaryCopied'))
    };

    const onEmailSummary = (props) => {
        console.log(props)
        debugger
        // birthday
        //     :
        //     "asd"
        // doctorEmail
        //     :
        //     "asd@asd.com"
        // name
        //     :
        //     "asdf"
        // patientEmail
        //     :
        //     "asdf"
        // const doctorEmail,, name,
        setEmailSummaryDialogOpen(false)

        ApiService.post(
            `/api/v1/chats/${chat.token}/summaries/${summary.token}/send_email`,
            {
                doctor_email: props.doctorEmail,
                name: props.name,
                date_of_birth: props.dateOfBirth,
                patient_email: props.patientEmail
            }
        ).then(() => {
            setSnackbarMessage(LanguageService.translate('summaryEmailSent'))
        })
    }

    return (
        <>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                { LanguageService.translate('chatClosed') }
            </Typography>

            {
                summaryLoading && <Typography variant="body2" color="text.secondary" gutterBottom>
                    { LanguageService.translate('summaryLoading') }
                </Typography>
            }

            {
                hasNoUserMessages &&  <Typography variant="body2" color="text.secondary" gutterBottom>
                    { LanguageService.translate('noUserMessages') }
                </Typography>
            }

            {summary && (
                <>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        <div id="summaryContent" ref={summaryContentRef}>
                            {summary.content.split("\n").map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </div>
                    </Typography>
                    <Snackbar
                        open={!!snackbarMessage}
                        autoHideDuration={6000}
                        onClose={() => setSnackbarMessage(null)}
                        message={ snackbarMessage }
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

                {
                    summary && <Button onClick={() => setEmailSummaryDialogOpen(true)} style={{ marginTop: '10px' }} color="primary">
                        { LanguageService.translate('emailSummaryButton') }
                    </Button>
                }
            </Toolbar>
            <Disclaimer lang={chat.language}/>
            <EmailSummaryDialog open={emailSummaryDialogOpen}
                                closeDialog={() => { setEmailSummaryDialogOpen(false) } }
                                    dialogConfirmation={onEmailSummary}
                                />
        </>
    );
};

export default ChatSummary;
