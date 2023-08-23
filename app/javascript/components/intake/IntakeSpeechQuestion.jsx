import React, { useState } from 'react'
import ApiService from "../../services/ApiService";

import {Button, CardContent} from "@material-ui/core";
import { AudioRecorder } from 'react-audio-voice-recorder';

const IntakeSpeechQuestion = (props) => {
    const { question } = props
    const [answerFilePath, setAnswerFilePath] = useState(null)
    const [questionHasBeenAnswered, setQuestionHasBeenAnswered] = useState(!!question.answer)

    const addAudioElement = (blob) => {
        console.log('recording complete')
        const url = URL.createObjectURL(blob);
        setAnswerFilePath(url)
    };

    const handleSave = () => {
        // debugger
        console.log('save')
        console.log(answerFilePath)

        ApiService.upsertSpeechQuestionResponse(question.token, answerFilePath).then((response) => {
            setQuestionHasBeenAnswered(true)
        })
    }

    return(<CardContent>
        <AudioRecorder
            onRecordingComplete={addAudioElement}
            audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
            }}
            downloadOnSavePress={true}
            downloadFileExtension="webm"
        />

        { question.file_name }
        <Button onClick={handleSave}>Save</Button>
    </CardContent>)
}

export default IntakeSpeechQuestion
