import React, { useState } from "react";
import ReactAudioPlayer from 'react-audio-player';
import AudioPlayer from "./AudioPlayer";
import {CardContent, TextField, Button} from "@material-ui/core";
import ApiService from "../../services/ApiService";

const IntakeQuestion = (props) => {
    const question = props.question
    const onSave = props.onSave

    const [answer, setAnswer] = useState('')
    const [answerSaved, setAnswerSaved] = useState(!!question.answer)

    const audioUrl = `https://shauncarlandcom.files.wordpress.com/2023/08/${question.file_name}`

    const buttonText = answerSaved ? 'Saved' : 'Save'

    const handleSave = () => {
        ApiService.upsertIntakeQuestionResponse(question.token, answer).then((response) => {
            setAnswerSaved(true)
            onSave()
        })
    }

    return(<CardContent style={{'border': '1px solid'}}>
            <AudioPlayer src={audioUrl}/>

            <span>
                <TextField value={answer} label="Answer" onChange={(e) => setAnswer(e.target.value)} />
                <Button onClick={handleSave} disabled={answerSaved}>{ buttonText }</Button>
            </span>
        </CardContent>
    )
}

export default IntakeQuestion
