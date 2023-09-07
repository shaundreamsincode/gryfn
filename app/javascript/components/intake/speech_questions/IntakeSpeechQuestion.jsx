import React, {useState, useEffect} from "react"
import ApiService from "../../../services/ApiService";
import {Button, Card, CardContent, Typography} from "@material-ui/core";
import { AudioRecorder } from 'react-audio-voice-recorder';

import { useNavigate } from "react-router-dom";
import IntakeSpeechPracticeQuestion from "./IntakeSpeechPracticeQuestion";

const IntakeSpeechQuestion = () => {
    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[4];

    const [isRecording, setIsRecording] = useState(false)
    const [questionAnswered, setQuestionAnswered] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [question, setQuestion] = useState(null)
    const [practiceQuestionSolved, setPracticeQuestionSolved] = useState(false)

    const navigate = useNavigate()

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

    useEffect(() => {
        ApiService.getCurrentIntakeSpeechQuestion(assessmentToken).then((response) => {
            setQuestion(response.data)
        }).catch((error) => {
            console.log('error')
            console.log(error)
        })
    }, [assessmentToken])

    const onRecordingComplete = (blob) => {
        setIsRecording(false)
        setIsSaving(true)
        const wavFromBlob = new File([blob], "test.wav")

        ApiService.upsertSpeechQuestionResponse(question, wavFromBlob).then((response) => {
            setQuestionAnswered(true)
            setIsSaving(false)
        }).catch((error) => {
            console.log(error)
            setQuestionAnswered(true)
            setIsSaving(false)
        })
    }

    if (!question) {
        return(<></>)
    }

    if (!practiceQuestionSolved) {
        return(<IntakeSpeechPracticeQuestion onSolveProp={() => setPracticeQuestionSolved(true)}/>)
    }

    if (isSaving) {
        return(<Card><CardContent>Saving...</CardContent></Card>)
    }

    return(<Card>
        <CardContent>
            {
                questionAnswered && <Typography>Question Answered!</Typography>
            }
            {
                !questionAnswered && <>
                    {
                        isRecording && <Typography>{ question.correct_answer }</Typography>
                    }

                    <div onClick={() => { setIsRecording(true) }} style={microphoneStyle()}>
                        <AudioRecorder
                            onRecordingComplete={onRecordingComplete}
                            audioTrackConstraints={{
                                noiseSuppression: true,
                                echoCancellation: true,
                            }}
                            downloadFileExtension="webm"
                        />
                    </div>

                </>
            }
            <div style={{ 'display': 'flex', 'justify-content': 'flex-end', 'margin-top': '40px' }}>
                <Button style={{'margin-top': '30px'}}  color="primary" variant="contained" onClick={() => navigate(`/intake_assessments/${assessmentToken}`)} disabled={!questionAnswered}>Next</Button>
            </div>
        </CardContent>
    </Card>)
}

export default IntakeSpeechQuestion
