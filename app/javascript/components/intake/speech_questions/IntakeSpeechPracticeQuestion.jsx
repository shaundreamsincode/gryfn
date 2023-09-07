import React, {useState} from "react";
import ApiService from "../../../services/ApiService";
import {AudioRecorder} from "react-audio-voice-recorder";
import {Button, Card, CardContent, Typography, Snackbar} from "@material-ui/core";
import {Alert, Container} from "@mui/material";

const IntakeSpeechPracticeQuestion = (props) => {
    const { onSolveProp, assessmentToken } = props
    // const [practiceQuestionSolved, setPracticeQuestionSolved] = useState(false)

    const [isSaving, setIsSaving] = useState(false)
    const [blob, setBlob] = useState(null)
    const [questionAnswered, setQuestionAnswered] = useState(false)

    const [recordingFailed, setRecordingFailed] = useState(false)
    const [recordingFailedCount, setRecordingFailedCount] = useState(0)
    const [incorrectAnswer, setIncorrectAnswer] = useState(null)

    const [showRecordingSuccessMessage, setShowRecordingSuccessMessage] = useState(false)

    const microphoneStyle = () => {
        const disabledMicrophoneStyle = {
            "pointer-events": "none",
            "opacity": "0.5"
        }

        if (questionAnswered) {
            return disabledMicrophoneStyle
        } else {
            return {}
        }
    }

    const onRecordingComplete = (blob) => {
        setIsSaving(true)
        setBlob(blob)
        const wavFromBlob = new File([blob], "test.wav")
        ApiService.practiceSpeechQuestions(assessmentToken, wavFromBlob).then((response) => {
            setIsSaving(false)

            setQuestionAnswered(true)
            setShowRecordingSuccessMessage(true)
        }).catch((error) => {
            setIsSaving(false)

            const errorData = error.response.data
            const errorCode = errorData.error

            if (errorCode === 'incorrect_answer') {
                setIncorrectAnswer(errorData.decoded_answer)
            }

            if (errorCode === 'decode_failed') {
                setRecordingFailed(true)
                setRecordingFailedCount(recordingFailedCount + 1)
            }
        })
    }

    return(<Card>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Typography variant="h4">
                    Practice Question
                </Typography>

                <Typography>
                    Say the word "map".
                </Typography>

                {
                    recordingFailedCount > 4 && <Typography style={{ color: 'red' }}>Your microphone has failed quite a few times in a row. Perhaps you should check it?</Typography>

                }
                {
                    questionAnswered && <Typography style={{ color: 'g' }}>Question Answered!</Typography>
                }
                {
                    isSaving && <Typography>Saving...</Typography>
                }

                {
                    !isSaving && !questionAnswered && <div onClick={() => { setIsRecording(true) }} style={microphoneStyle()}>
                        <AudioRecorder
                            onRecordingComplete={onRecordingComplete}
                            audioTrackConstraints={{
                                noiseSuppression: true,
                                echoCancellation: true,
                            }}
                            downloadFileExtension="webm"
                        />
                    </div>
                }

                <div style={{ marginTop: '40px' }}>
                    <Button onClick={() => { onSolveProp() }} disabled={!questionAnswered} color="primary" variant="contained">Start Assessment</Button>
                </div>
            </CardContent>
            <Snackbar
                open={showRecordingSuccessMessage}
                autoHideDuration={6000}
                onClose={() => setShowRecordingSuccessMessage(false)}
            >
                <Alert severity="success">
                    Recording was successful!
                </Alert>
            </Snackbar>

            <Snackbar
                open={recordingFailed}
                autoHideDuration={6000}
                onClose={() => setRecordingFailed(false)}
            >
                <Alert severity="error">
                    Recording failed! Please try again!
                </Alert>
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
    )

}

export default IntakeSpeechPracticeQuestion
