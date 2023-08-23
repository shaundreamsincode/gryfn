import React, { useState } from 'react'
import ApiService from "../../services/ApiService";

import {Button, CardContent} from "@material-ui/core";
import { AudioRecorder } from 'react-audio-voice-recorder';

const IntakeSpeechQuestion = (props) => {
    const { question } = props
    const [answerFilePath, setAnswerFilePath] = useState(null)
    const [questionHasBeenAnswered, setQuestionHasBeenAnswered] = useState(!!question.answer)

    const handleSave = () => {
        ApiService.upsertSpeechQuestionResponse(question.token, answerFilePath).then((response) => {
            debugger
            setQuestionHasBeenAnswered(true)
        })
    }

    const handleUndo = () => {
        ApiService.upsertSpeechQuestionResponse(question.token, null).then((response) => {
            debugger
            setQuestionHasBeenAnswered(false)
        })
    }

    const handleRecordingComplete = (blob) => {
        const url = URL.createObjectURL(blob);
        setAnswerFilePath(url)
        console.log(answerFilePath)
    }

    return(<CardContent>
        <AudioRecorder
            onRecordingComplete={handleRecordingComplete}
            audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
            }}
            downloadOnSavePress={true}
            downloadFileExtension="webm"
        />

        { question.file_name }
        <Button disabled={questionHasBeenAnswered || !answerFilePath} onClick={handleSave}>Save</Button>
        {
            questionHasBeenAnswered && <Button onClick={handleUndo}>Undo</Button>

        }
    </CardContent>)
}

export default IntakeSpeechQuestion
