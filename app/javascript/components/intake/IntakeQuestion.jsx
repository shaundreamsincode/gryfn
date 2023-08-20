import React, { useState } from "react";
import ReactAudioPlayer from 'react-audio-player';
import AudioPlayer from "./AudioPlayer";

const IntakeQuestion = (props) => {
    console.log('wow')
    const question = props.question

    const audioUrl = `https://shauncarlandcom.files.wordpress.com/2023/08/${question.file_name}`
    debugger
    // const audioPath = require('./above.mp3')
    // const audioPath = require(`../assets/audio/${question.file_name}`)

    return(<div>
            <AudioPlayer src={audioUrl}/>
        </div>
    )
}

export default IntakeQuestion
