import React, { useState } from 'react'
import ApiService from "../../services/ApiService";

import {Button, CardContent} from "@material-ui/core";
import { AudioRecorder } from 'react-audio-voice-recorder';
import axios from "axios";

const IntakeSpeechQuestion = (props) => {
    const { question } = props
    const [answer, setAnswer] = useState(question.answer)
    const [answerFilePath, setAnswerFilePath] = useState(null)
    const [blob, setBlob] = useState(null)
    const [recordingComplete, setRecordingComplete] = useState(false)
    const [questionHasBeenAnswered, setQuestionHasBeenAnswered] = useState(!!question.answer)
    const [recordingUnsuccessful, setRecordingUnsuccessful] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = () => {
        setIsSaving(true)
        const wavFromBlob = new File([blob], "test.wav")
        console.log(wavFromBlob)
        // const wavFromBlob = new File([])

        axios.post(
            `/api/intake_speech_questions/${question.token}/upsert_response`,
            wavFromBlob,
            {
                headers: { "content-type": "audio/mpeg"}
            }
        ).then((response) => {
            setAnswer(response.data.answer)
            setQuestionHasBeenAnswered(true)
            setRecordingComplete(false)
            setRecordingUnsuccessful(false)
            setIsSaving(false)
        }).catch((error)=> {
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

        ApiService.resetSpeechQuestionResponse(question.token).then((response) => {
            setQuestionHasBeenAnswered(false)
            setRecordingComplete(false)
            setAnswer(null)
            setIsSaving(false)
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

            {
                isSaving && <div>Saving...</div>
            }
            {
                answer && <div>{ answer }</div>
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
