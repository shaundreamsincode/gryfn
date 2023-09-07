import React, {useState} from "react";
import IntakeService from "../../../services/IntakeService";
import {AudioRecorder} from "react-audio-voice-recorder";
import {Button, Card, CardContent} from "@material-ui/core";

const IntakeSpeechPracticeQuestion = (props) => {
    const { onSolveProp } = props
    // const [practiceQuestionSolved, setPracticeQuestionSolved] = useState(false)

    const [isRecording, setIsRecording] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [blob, setBlob] = useState(null)
    const [questionAnswered, setQuestionAnswered] = useState(false)

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
        setIsRecording(false)
        setIsSaving(true)
        setBlob(blog)
        const wavFromBlob = new File([blob], "test.wav")
        IntakeService.getPracticeSpeechQuestions(wavFromBlob).then((response) => {

        })

        // IntakeService.upsertSpeechQuestionResponse(question, wavFromBlob).then((response) => {
        //     setQuestionAnswered(true)
        //     setIsSaving(false)
        // }).catch((error) => {
        //     console.log(error)
        //     setQuestionAnswered(true)
        //     setIsSaving(false)
        // })
    }

    return(<Card>
        <CardContent>
            Say the word "cat".
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

            <div style={{ 'display': 'flex', 'justify-content': 'flex-end', 'margin-top': '40px' }}>
                <Button color="primary" variant="contained">Next</Button>
            </div>
        </CardContent>
    </Card>)

}

export default IntakeSpeechPracticeQuestion
