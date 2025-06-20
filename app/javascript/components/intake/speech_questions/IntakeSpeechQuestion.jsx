import React, {useState, useEffect} from "react"
import IntakeService from "../../../services/IntakeService";
import {Button, Card, CardContent, Typography} from "@material-ui/core";
import { useAudioRecorder } from 'react-audio-voice-recorder';

import { useNavigate } from "react-router-dom";
import IntakeSpeechPracticeQuestion from "./IntakeSpeechPracticeQuestion";
import IntakeQuestionInstructions from "../IntakeQuestionInstructions";

const IntakeSpeechQuestion = () => {
    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[5];

    const { startRecording, stopRecording, recordingBlob } = useAudioRecorder()

    const [recordingInProgress, setRecordingInProgress] = useState(false)

    const [questionAnswered, setQuestionAnswered] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [question, setQuestion] = useState(null)
    const [recordButtonText, setRecordButtonText] = useState('Start')
    const [disableRecordButton, setDisableRecordButton] = useState(false)

    const [practiceQuestionSolved, setPracticeQuestionSolved] = useState(localStorage.getItem('speechPracticeQuestionSolved'))
    const [instructionsRead, setInstructionsRead] = useState(localStorage.getItem('speechInstructionsRead'))

    const [countdown, setCountdown] = useState(3)
    const navigate = useNavigate()

    useEffect(() => {
        IntakeService.getCurrentIntakeSpeechQuestion(assessmentToken).then((response) => {
            setQuestion(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [assessmentToken])


    const timeoutStatus  = setTimeout( function(){
        handleStopRecording();
    }  , 3000);

    const handleStartRecording = () => {
        setRecordingInProgress(true)
        setDisableRecordButton(true)
        setRecordButtonText("Talk Now")
        startRecording()

        setTimeout(() => {
                setCountdown(2)
        }, 1000)

        setTimeout(() => {
                setCountdown(1)
        }, 2000)
    }

    const handleStopRecording = () => {
        window.clearTimeout(timeoutStatus);
        stopRecording()
    }

    useEffect(() => {
        if (!recordingBlob) return;
        const wavFromBlob = new File([recordingBlob], "speech.wav");

        setRecordButtonText("Decoding Speech...")

        IntakeService.upsertSpeechQuestionResponse(question, wavFromBlob).then((response) => {
            setQuestionAnswered(true)
            setIsSaving(false)
            setRecordButtonText("Answer Saved!")
        }).catch((error) => {
            console.log(error)
            setQuestionAnswered(true)
            setIsSaving(false)
        })

        setRecordingInProgress(false)
    }, [recordingBlob])

    const handleInstructionsRead = () => {
        localStorage.setItem('speechInstructionsRead', true)
        setInstructionsRead(true)
    }

    const handlePracticeProblemSolved = () => {
        localStorage.setItem('speechPracticeQuestionSolved', true)
        setPracticeQuestionSolved(true)
    }

    if (!question) {
        return(<></>)
    }

    if (!instructionsRead) {
        return(
            <IntakeQuestionInstructions
                questionType="speech"
                onContinue={handleInstructionsRead}
            />
        )
    }

    if (!practiceQuestionSolved) {
        return(<IntakeSpeechPracticeQuestion assessmentToken={assessmentToken} onSolveProp={handlePracticeProblemSolved}/>)
    }

    if (isSaving) {
        return(<Card><CardContent>Saving...</CardContent></Card>)
    }


    return(<Card>
        <CardContent>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    questionAnswered && <Typography style={{ color: 'green' }}>Question Answered!</Typography>
                }
                {
                    !questionAnswered && <div>
                        <div>
                            {
                                recordingInProgress && <Typography style={{ textAlign: 'center' }} variant="h4">{ question.correct_answer }</Typography>
                            }
                        </div>
                        <div>
                            <div>
                                <Button style={{ marginTop: "20px" }} variant="contained" color="primary" disabled={disableRecordButton} onClick={handleStartRecording}>
                                    {recordButtonText}
                                </Button>
                            </div>
                            {
                                recordingInProgress && <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                    <Typography variant="h3">
                                        {countdown}
                                    </Typography>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
            <div style={{ 'display': 'flex', 'justify-content': 'flex-end', 'margin-top': '40px' }}>
                <Button style={{'margin-top': '30px'}} onClick={() => navigate(`/intake/intake_assessments/${assessmentToken}`)} disabled={!questionAnswered}>Next Question</Button>
            </div>
        </CardContent>
    </Card>)
}

export default IntakeSpeechQuestion
