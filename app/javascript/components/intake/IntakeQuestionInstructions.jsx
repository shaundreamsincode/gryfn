import React from "react"
import {Button, Typography} from "@material-ui/core";

const IntakeQuestionInstructions = (props) => {
    const { questionType, onContinue } = props

    const calculateContent = () => {
        if (questionType === 'speech') {
            return "Click the microphone icon to speak the words you see, and then click \"save\" to keep your answer saved."
        } else if (questionType === 'eidetic') {
            return "Click on the `Play` button to hear a word, then write it down as it is spelt."
        } else { // questionType === 'phonetic
            return "Click on the `Play` button to hear a word, then write it down as how you think it should be spelt."
        }
    }

    return(<>
        <Typography>
            { calculateContent() }
            <div style={{ 'display': 'flex', 'justify-content': 'flex-end', 'margin-top': '1rem' }}>
                <Button color="primary" variant="contained" onClick={onContinue}>Continue</Button>
            </div>
        </Typography>
    </>)
}

export default IntakeQuestionInstructions
