import React, { useState } from 'react'
import ApiService from "../../services/ApiService";

import {Button, CardContent} from "@material-ui/core";
import { AudioRecorder } from 'react-audio-voice-recorder';
import axios from "axios";

const IntakeSpeechQuestion = (props) => {
    const { question } = props
    const [answerFilePath, setAnswerFilePath] = useState(null)
    const [blob, setBlob] = useState(null)
    const [recordingComplete, setRecordingComplete] = useState(false)
    const [questionHasBeenAnswered, setQuestionHasBeenAnswered] = useState(!!question.answer)

    const handleSave = () => {
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
            setQuestionHasBeenAnswered(true)
            setRecordingComplete(false)
        })
    }

    const handleUndo = () => {
        ApiService.resetSpeechQuestionResponse(question.token).then((response) => {
            setQuestionHasBeenAnswered(false)
            setRecordingComplete(false)
        })
    }

    const handleRecordingComplete = (blob) => {
        setBlob(blob)
        const url = URL.createObjectURL(blob);
        setAnswerFilePath(url)
        setRecordingComplete(true)
        console.log(answerFilePath)
    }

    return(<CardContent>
        <AudioRecorder
            onRecordingComplete={handleRecordingComplete}
            audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
            }}
            downloadFileExtension="webm"
        />

        { question.file_name }
        <Button disabled={questionHasBeenAnswered || !recordingComplete} onClick={handleSave}>Save</Button>
        {
            questionHasBeenAnswered && <Button onClick={handleUndo}>Undo</Button>

        }
    </CardContent>)
}

export default IntakeSpeechQuestion
