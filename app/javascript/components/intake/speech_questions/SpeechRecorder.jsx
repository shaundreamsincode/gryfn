import { useAudioRecorder } from 'react-audio-voice-recorder';
import React, {useState, useEffect} from "react";
import {Button, Card} from "@material-ui/core";
import ApiService from "../../../services/ApiService";

const SpeechRecorder = (props) => {
    const { assessmentToken } = props

    const timeoutStatus  = setTimeout( function(){
        console.log("3 seconds timeout");
        handleStopRecording();
    }  , 3000);

    const handleStartRecording = () => {
        startRecording()
    }

    const handleStopRecording = () => {
        window.clearTimeout(timeoutStatus);
        stopRecording()
    }

    const {
        startRecording,
        stopRecording,
        togglePauseResume,
        recordingBlob,
        isRecording,
        isPaused,
        recordingTime,
        mediaRecorder
    } = useAudioRecorder();

    useEffect(() => {
        if (!recordingBlob) return;
        debugger
        const wavFromBlob = new File([recordingBlob], "test.wav");

        ApiService.practiceSpeechQuestions(assessmentToken, wavFromBlob).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })

    }, [recordingBlob])

    return(<Card>
        {
            !isRecording && <Button onClick={handleStartRecording}>Start</Button>
        }

        <Button onClick={handleStopRecording}>Stop</Button>

        {
            isRecording ? <div>Is Recording</div> : <div>Is not recording</div>
        }
    </Card>)
}

export default SpeechRecorder
