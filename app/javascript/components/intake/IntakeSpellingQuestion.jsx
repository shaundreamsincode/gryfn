import React, { useState, useEffect } from "react";
import { CardContent, TextField, Button } from "@material-ui/core";
import AudioPlayer from "./AudioPlayer";

const IntakeSpellingQuestion = (props) => {
    const { question, questionSaveEndpoint, onSave } = props

    const [answer, setAnswer] = useState(question.answer); // Set initial value to question's answer
    const [answerSaved, setAnswerSaved] = useState(!!question.answer);

    const audioUrl = `https://shauncarlandcom.files.wordpress.com/2023/08/${question.file_name}`;

    const buttonText = answerSaved ? 'Saved' : 'Save';

    const handleSave = () => {
        questionSaveEndpoint(question, answer).then((response) => {
            setAnswerSaved(true);
            onSave(response.data);
        });
    };

    const handleUndoButtonClick = () => {
        questionSaveEndpoint(question, null).then((response) => {
            console.log('foo')
            console.log(response)

            setAnswerSaved(false);
            setAnswer(null)
            onSave(response.data);
        });
    }

    // Update the answer state when the question changes
    useEffect(() => {
        setAnswer(question.answer);
        setAnswerSaved(!!question.answer);
    }, [question]);

    return (
        <CardContent style={{ 'display': 'flex' }}>
            <AudioPlayer src={audioUrl} />
            <span style={{'float': 'right'}}>
                    <TextField disabled={answerSaved} value={answer} onChange={(e) => setAnswer(e.target.value)} />
                        <Button color="primary" onClick={handleSave} disabled={answerSaved || !answer}>{buttonText}</Button>
                {
                    answerSaved && <Button color="primary" onClick={handleUndoButtonClick}>Redo</Button>
                }
                </span>
        </CardContent>
    );
};

export default IntakeSpellingQuestion;
