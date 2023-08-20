import React, { useState } from "react";
import ReactAudioPlayer from 'react-audio-player';
import AudioPlayer from "./AudioPlayer";
import {CardContent, TextField, Button} from "@material-ui/core";

const IntakeQuestion = (props) => {
    const [response, setResponse] = useState('')
    console.log('wow')
    const question = props.question

    const audioUrl = `https://shauncarlandcom.files.wordpress.com/2023/08/${question.file_name}`
    debugger
    // const audioPath = require('./above.mp3')
    // const audioPath = require(`../assets/audio/${question.file_name}`)

    return(<CardContent style={{'border': '1px solid'}}>
            <AudioPlayer src={audioUrl}/>

            <span>
                <TextField value={response} label="Response" onChange={(e) => setResponse(e.target.value)} />
                <Button>Save</Button>
            </span>
        </CardContent>
    )
}

export default IntakeQuestion
