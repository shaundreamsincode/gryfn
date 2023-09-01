import React, { useState } from 'react'
import ApiService from "../../services/ApiService";

import {Button, Typography} from "@material-ui/core";
import { AudioRecorder } from 'react-audio-voice-recorder';

const IntakeSpeechQuestion = (props) => {
    const { question, onUpdate } = props
    const [blob, setBlob] = useState(null)
    const [recordingComplete, setRecordingComplete] = useState(false)
    const [questionHasBeenAnswered, setQuestionHasBeenAnswered] = useState(!!question.answer)
    const [recordingMessage, setRecordingMessage] = useState(null)

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between', // This aligns the components with space between them
        alignItems: 'center', // This vertically aligns the components
    };

    const handleSave = () => {
        setRecordingMessage(null)
        setRecordingMessage('Saving...')
        const wavFromBlob = new File([blob], "test.wav")

        ApiService.upsertSpeechQuestionResponse(question, wavFromBlob).then((response) => {
            setQuestionHasBeenAnswered(true)
            setRecordingComplete(false)
            setRecordingMessage(null)

            onUpdate(question, response.data.answer)
        }).catch(() => {
            setRecordingComplete(false)
            setRecordingMessage('Recording Unsuccessful - please try again.')
        })
    }

    const handleUndo = () => {
        setRecordingMessage('Saving...')

        ApiService.resetSpeechQuestionResponse(question).then((response) => {
            setQuestionHasBeenAnswered(false)
            setRecordingComplete(false)
            setRecordingMessage(null)
            onUpdate(question, null)
        })
    }

    const handleRecordingBegin = () => {
        setRecordingMessage(null)
    }

    const handleRecordingComplete = (blob) => {
        setBlob(blob)
        setRecordingComplete(true)
    }

    return(<div style={containerStyle}>
        <div>
            <div style={{ display: 'flex' }}>
                <div>
                    {
                        !questionHasBeenAnswered &&
                        <div onClick={handleRecordingBegin}>
                            <AudioRecorder
                                onRecordingComplete={handleRecordingComplete}
                                audioTrackConstraints={{
                                    noiseSuppression: true,
                                    echoCancellation: true,
                                }}
                                downloadFileExtension="webm"
                            />
                        </div>
                    }
                </div>

                <div>
                    {
                        recordingMessage && <Typography> { recordingMessage } </Typography>
                    }
                </div>
            </div>

            <div>
                <Typography>{ question.correct_answer }</Typography>
            </div>

            {
                question.answer_viewable && question.answer && <Typography>Your answer: { question.answer }</Typography>
            }
        </div>

        <div>
            <Button
                disabled={questionHasBeenAnswered || !recordingComplete}
                onClick={handleSave}
                variant="contained"
                color="primary">
                Save
            </Button>
                {
                    questionHasBeenAnswered && <Button onClick={handleUndo}>Redo</Button>
                }
        </div>
    </div>)
}
export default IntakeSpeechQuestion
