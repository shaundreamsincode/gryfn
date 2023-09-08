import React, {useEffect, useState} from "react";
import ApiService from "../../../services/ApiService";
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

    const [isSaving, setIsSaving] = useState(false);
    const { startRecording, stopRecording, recordingBlob, isRecording  } = useAudioRecorder()

    const [questionAnswered, setQuestionAnswered] = useState(false);
    const [recordingFailed, setRecordingFailed] = useState(false);
    const [recordingFailedCount, setRecordingFailedCount] = useState(0);
    const [incorrectAnswer, setIncorrectAnswer] = useState(null);
    const [disableRecordButton, setDisableRecordButton] = useState(false)
    const [recordButtonText, setRecordButtonText] = useState('Start Recording')

    const [showRecordingSuccessMessage, setShowRecordingSuccessMessage] = useState(
        false
    );

    const timeoutStatus  = setTimeout( function(){
        console.log("3 seconds timeout");
        handleStopRecording();
    }  , 3000);

    const handleStartRecording = () => {
        setDisableRecordButton(true)
        setRecordButtonText("Recording...")
        startRecording()
    }

    const handleStopRecording = () => {
        window.clearTimeout(timeoutStatus);
        stopRecording()
    }

    useEffect(() => {
        if (!recordingBlob) return;
        const wavFromBlob = new File([recordingBlob], "test.wav");

        setRecordButtonText("Decoding Speech...")
        ApiService.practiceSpeechQuestions(assessmentToken, wavFromBlob).then((response) => {
            setIsSaving(false);
            setQuestionAnswered(true);
            setShowRecordingSuccessMessage(true);
            setRecordButtonText("Success")

        }).catch((error) => {
            setIsSaving(false);
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
        })
    }, [recordingBlob])

    return (
        <Card>
            <CardContent>
                <Typography variant="h4">Practice Question</Typography>
                <Typography>Say the word "map".</Typography>

                {recordingFailedCount > 4 && (
                    <Typography style={{ color: "red" }}>
                        Your microphone has failed quite a few times in a row. Perhaps you
                        should check it?
                    </Typography>
                )}
                {questionAnswered && (
                    <Typography style={{ color: "green" }}>Question Answered!</Typography>
                )}
                {isSaving && <Typography>Saving...</Typography>}

                {!isSaving && !questionAnswered && (
                    <div>
                        <Card style={{ backgroundColor: "pink" }}>

                            <Button variant="contained" color="primary" disabled={disableRecordButton} onClick={handleStartRecording}>
                                { recordButtonText }
                            {/*<Button variant="contained" color="primary" disabled={isSaving || !questionAnswered} onClick={handleStartRecording}>*/}
                            {/*    {*/}
                            {/*        !isSaving && !questionAnswered && <>Start Recording</>*/}
                            {/*    }*/}

                            {/*    {*/}
                            {/*        isSaving && <>Saving...</>*/}
                            {/*    }*/}

                            {/*    {*/}
                            {/*        questionAnswered && <>Answer Saved!</>*/}
                            {/*    }*/}
                            </Button>
                        </Card>
                        {/*<SpeechRecorder assessmentToken={assessmentToken}/>*/}
                    {/*<div onClick={handleStartRecording}>*/}
                    {/*    <AudioRecorder*/}
                    {/*        onRecordingComplete={onRecordingComplete}*/}
                    {/*        audioTrackConstraints={{*/}
                    {/*            noiseSuppression: true,*/}
                    {/*            echoCancellation: true,*/}
                    {/*        }}*/}
                    {/*        downloadFileExtension="webm"*/}
                    {/*        recorderControls={recorderControls}*/}
                    {/*    />*/}

                        {/*<Button onClick={handleStartRecording}>Start Recording</Button>*/}
                    </div>
                )}

                <div style={{ marginTop: '40px' }}>
                    <Button
                        onClick={() => onSolveProp()}
                        disabled={!questionAnswered}
                        color="primary"
                        variant="contained"
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
