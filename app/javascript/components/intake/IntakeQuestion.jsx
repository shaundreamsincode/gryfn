import React, { useState } from "react";
import ReactAudioPlayer from 'react-audio-player';
import AudioPlayer from "./AudioPlayer";

const IntakeQuestion = (props) => {
    console.log('wow')
    const question = props.question
    debugger
    // const audioPath = require('./above.mp3')
    // const audioPath = require(`../assets/audio/${question.file_name}`)

    return(<div>
            <AudioPlayer src="https://s9.imslp.org/files/imglnks/usimg/7/7d/IMSLP473852-PMLP02374-Waltz_Op._69_no._1_in_A_flat_major.mp3"/>
        </div>
    )
}

export default IntakeQuestion
