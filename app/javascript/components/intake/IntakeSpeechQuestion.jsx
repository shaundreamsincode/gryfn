import React, { useState } from 'react'
import ApiService from "../../services/ApiService";

import {Button, CardContent} from "@material-ui/core";
import { AudioRecorder } from 'react-audio-voice-recorder';
import axios from "axios";

const IntakeSpeechQuestion = (props) => {
    const { question, onUpdate } = props
    const [answer, setAnswer] = useState(question.answer)
    const [answerFilePath, setAnswerFilePath] = useState(null)
    const [blob, setBlob] = useState(null)
    const [recordingComplete, setRecordingComplete] = useState(false)
    const [questionHasBeenAnswered, setQuestionHasBeenAnswered] = useState(!!question.answer)
    const [recordingUnsuccessful, setRecordingUnsuccessful] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = () => {
        setIsSaving(true)
        setRecordingUnsuccessful(false)
        const wavFromBlob = new File([blob], "test.wav")

        ApiService.upsertSpeechQuestionResponse(question, wavFromBlob).then((response) => {
            setAnswer(response.data.answer)
            setQuestionHasBeenAnswered(true)
            setRecordingComplete(false)
            setRecordingUnsuccessful(false)
            setIsSaving(false)

            onUpdate(question, response.data.answer)
        }).catch((error) => {
            setRecordingComplete(false)
            setIsSaving(false)

            const errorResponseCode = error.response.data

            if (errorResponseCode === "decode_error") {
                setRecordingUnsuccessful(true)
            }

        })
    }

    const handleUndo = () => {
        setIsSaving(true)

        ApiService.resetSpeechQuestionResponse(question).then((response) => {
            setQuestionHasBeenAnswered(false)
            setRecordingComplete(false)
            setAnswer(null)
            setIsSaving(false)
            onUpdate(question, null)
        })
    }

    const handleRecordingComplete = (blob) => {
        setBlob(blob)
        const url = URL.createObjectURL(blob);
        setAnswerFilePath(url)
        setRecordingComplete(true)
    }

    return(<CardContent>
        <span>
            <div>
                {
                    !questionHasBeenAnswered && <AudioRecorder
                        onRecordingComplete={handleRecordingComplete}
                        audioTrackConstraints={{
                            noiseSuppression: true,
                            echoCancellation: true,
                        }}
                        downloadFileExtension="webm"
                    />
                }

                { question.correct_answer }
            </div>


            {
                isSaving && <div>Saving...</div>
            }

            {
                recordingUnsuccessful && <div>Recording unsucessful. Please try again.</div>
            }
        </span>

        <Button disabled={questionHasBeenAnswered || !recordingComplete} onClick={handleSave}>Save</Button>
        {
            questionHasBeenAnswered && <Button onClick={handleUndo}>Undo</Button>
        }
    </CardContent>)
}
export default IntakeSpeechQuestion
