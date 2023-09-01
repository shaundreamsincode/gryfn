import React, { useState } from 'react'
import ApiService from "../../services/ApiService";

import {Button, Typography, Link} from "@material-ui/core";
import { AudioRecorder } from 'react-audio-voice-recorder';

const IntakeSpeechQuestion = (props) => {
    const { question, onUpdate, onError, onRecordingBegin } = props
    const [blob, setBlob] = useState(null)
    const [recordingComplete, setRecordingComplete] = useState(false)
    const [questionHasBeenAnswered, setQuestionHasBeenAnswered] = useState(!!question.answer)
    const [recordingError, setRecordingError] = useState(false)
    const [undoButtonDisabled, setUndoButtonDisabled] = useState(!question.answer)
    const [saving, setSaving] = useState(false)

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
    };

    const microphoneStyle = () => {
        const disabledMicrophoneStyle = {
            // 'background-color': "#f0f0f0",
            // 'color': "#888888",
            "pointer-events": "none",
            "opacity": "0.5"
        }

        if (questionHasBeenAnswered) {
            return disabledMicrophoneStyle
        } else {
            return {}
        }
    }

    const handleSave = () => {
        setSaving(true)
        setRecordingError(null)
        const wavFromBlob = new File([blob], "test.wav")

        ApiService.upsertSpeechQuestionResponse(question, wavFromBlob).then((response) => {
            setQuestionHasBeenAnswered(true)
            setRecordingComplete(false)
            setRecordingError(null)
            setSaving(true)

            onUpdate(question, response.data.answer)
        }).catch(() => {
            setRecordingComplete(false)
            setRecordingError(true)
            setUndoButtonDisabled(true)
            setSaving(false)

            onError()
        })
    }

    const handleUndo = () => {
        setSaving(true)

        ApiService.resetSpeechQuestionResponse(question).then((response) => {
            setQuestionHasBeenAnswered(false)
            setRecordingComplete(false)
            setRecordingError(null)
            onUpdate(question, null)
            setSaving(false)

            setUndoButtonDisabled(true)
        }).catch(() => {
            setSaving(false)
            onError()
        })
    }

    const handleRecordingBegin = () => {
        setRecordingError(null)
        onRecordingBegin()
    }

    const handleRecordingComplete = (blob) => {
        setBlob(blob)
        setRecordingComplete(true)
        setUndoButtonDisabled(false)
    }

    return(
        <div style={containerStyle}>
        <div style={{ 'display': 'flex', 'alignItems': 'center', 'flexDirection': 'column'}}>
            <div style={{ display: 'flex' }}>
                <div>
                        <div onClick={handleRecordingBegin} style={microphoneStyle()}>
                            <AudioRecorder
                                onRecordingComplete={handleRecordingComplete}
                                audioTrackConstraints={{
                                    noiseSuppression: true,
                                    echoCancellation: true,
                                }}
                                downloadFileExtension="webm"
                            />
                        </div>
                </div>
            </div>
        </div>
            <div>
                <div>
                    <Typography style={{ "marginTop": "10px" }}><b>{ question.correct_answer }</b></Typography>

                    {
                        question.answer_viewable && question.answer && <Typography>Your answer: { question.answer }</Typography>
                    }
                </div>

                <div style={{ 'display': 'flex', 'alignItems': 'center', 'flexDirection': 'column'}}>
                    <div>
                        <Button
                            disabled={saving || questionHasBeenAnswered || !recordingComplete}
                            onClick={handleSave}
                            variant="contained"
                            color="primary">
                            Save
                        </Button>
                    </div>

                    <div style={{ 'marginTop': '20px' }}>
                        {
                            !undoButtonDisabled && <Link
                                onClick={handleUndo}
                                disabled={undoButtonDisabled}>(Redo)
                                {/*disabled={!questionHasBeenAnswered || (questionHasBeenAnswered && recordingComplete)}>Redo*/}
                            </Link>
                        }
                    </div>

                </div>
            </div>
    </div>)
}
export default IntakeSpeechQuestion
