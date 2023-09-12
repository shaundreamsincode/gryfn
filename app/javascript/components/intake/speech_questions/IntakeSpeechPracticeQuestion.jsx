import React, {useEffect, useState} from "react";
import IntakeService from "../../../services/IntakeService";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import {
    Button,
    Card,
    CardContent,
    Typography,
    Snackbar, Grid,
} from "@material-ui/core";
import { Alert } from "@mui/material";

const IntakeSpeechPracticeQuestion = (props) => {
    const { onSolveProp, assessmentToken } = props;

    const { startRecording, stopRecording, recordingBlob } = useAudioRecorder()

    const [questionAnswered, setQuestionAnswered] = useState(false);
    const [recordingFailed, setRecordingFailed] = useState(false);
    const [recordingFailedCount, setRecordingFailedCount] = useState(0);
    const [incorrectAnswer, setIncorrectAnswer] = useState(null);
    const [disableRecordButton, setDisableRecordButton] = useState(false)
    const [recordButtonText, setRecordButtonText] = useState('Start')

    const [recordingInProgress, setRecordingInProgress] = useState(false)
    const [countdown, setCountdown] = useState(3)

    const [showRecordingSuccessMessage, setShowRecordingSuccessMessage] = useState(
        false
    );

    const timeoutStatus  = setTimeout( function(){
        handleStopRecording();
    }  , 3000);

    const handleStartRecording = () => {
        setDisableRecordButton(true)
        setRecordingInProgress(true)
        setRecordButtonText("Talk now")
        startRecording()

        setTimeout(() => {
            setCountdown(2)
        }, 1000)

        setTimeout(() => {
            setCountdown(1)
        }, 2000)
    }

    const handleStopRecording = () => {
        window.clearTimeout(timeoutStatus);
        stopRecording()
        setRecordingInProgress(false)
    }

    useEffect(() => {
        if (!recordingBlob) return;
        const wavFromBlob = new File([recordingBlob], "speech.wav");

        setRecordButtonText("Decoding Speech...")
        IntakeService.practiceSpeechQuestions(assessmentToken, wavFromBlob).then((response) => {
            setQuestionAnswered(true);
            setShowRecordingSuccessMessage(true);
            setRecordButtonText("Success")
            setRecordingFailedCount(0) // hack to get rid of the error message

        }).catch((error) => {
            setRecordButtonText("Start Recording")
            setDisableRecordButton(false)

            const errorData = error.response.data;
            const errorCode = errorData.error;

            if (errorCode === "incorrect_answer") {
                setIncorrectAnswer(errorData.decoded_answer);
            }

            if (errorCode === "decode_failed") {
                setRecordingFailed(true);
                setRecordingFailedCount(recordingFailedCount + 1);
            }

            setCountdown(3)
        })
    }, [recordingBlob])

    return (
        <Card>
            <CardContent>
                <Typography variant="h4">Practice Question</Typography>
                {recordingFailedCount > 4 && (
                    <Typography style={{ color: "red", textAlign: 'center' }}>
                        Your microphone has failed quite a few times in a row. Perhaps you
                        should check it?
                    </Typography>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ order: -1, marginTop: "20px" }}>
                        {
                            questionAnswered && <Typography style={{ color: "green" }}>Success!</Typography>
                        }
                        {
                            !questionAnswered && <Typography>Say the word "<b>map</b>".</Typography>
                        }
                    </div>

                    <div>
                        {
                            !questionAnswered &&
                                <div>
                                    <div>
                                        <Button style={{ marginTop: "20px" }} variant="contained" color="primary" disabled={disableRecordButton} onClick={handleStartRecording}>
                                            {recordButtonText}
                                        </Button>
                                    </div>
                                    {
                                        recordingInProgress && <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                            <Typography variant="h3">
                                                {countdown}
                                            </Typography>
                                        </div>
                                    }
                                </div>
                        }
                    </div>
                </div>

                <div style={{ 'display': 'flex', 'justify-content': 'flex-end', 'margin-top': '40px' }}>
                    <Button
                        onClick={() => onSolveProp()}
                        disabled={!questionAnswered}
                    >
                        Start Assessment
                    </Button>
                </div>
            </CardContent>

            <Snackbar
                open={showRecordingSuccessMessage}
                autoHideDuration={6000}
                onClose={() => setShowRecordingSuccessMessage(false)}
            >
                <Alert severity="success">Recording was successful!</Alert>
            </Snackbar>

            <Snackbar
                open={recordingFailed}
                autoHideDuration={6000}
                onClose={() => setRecordingFailed(false)}
            >
                <Alert severity="error">Recording failed! Please try again!</Alert>
            </Snackbar>

            <Snackbar
                open={!!incorrectAnswer}
                autoHideDuration={6000}
                onClose={() => setIncorrectAnswer(null)}
            >
                <Alert severity="error">
                    Recording was successful, but detected your answer as "{ incorrectAnswer }".
                    Please try again!
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default IntakeSpeechPracticeQuestion;
