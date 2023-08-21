import React, { useState, useEffect } from "react";
import { CardContent, TextField, Button } from "@material-ui/core";
import ApiService from "../../services/ApiService";
import AudioPlayer from "./AudioPlayer";

const IntakeQuestion = (props) => {
    const question = props.question;
    // debugger
    const onSave = props.onSave;

    const [answer, setAnswer] = useState(question.answer); // Set initial value to question's answer
    const [answerSaved, setAnswerSaved] = useState(!!question.answer);

    const audioUrl = `https://shauncarlandcom.files.wordpress.com/2023/08/${question.file_name}`;

    const buttonText = answerSaved ? 'Saved' : 'Save';

    const handleSave = () => {
        ApiService.upsertIntakeQuestionResponse(question.token, answer).then((response) => {
            setAnswerSaved(true);
            onSave(response.data);
        });
    };

    const handleUndoButtonClick = () => {
        ApiService.upsertIntakeQuestionResponse(question.token, null).then((response) => {
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
                        <Button onClick={handleSave} disabled={answerSaved || !answer}>{buttonText}</Button>
                                {
                                    answerSaved && <Button onClick={handleUndoButtonClick}>Undo</Button>
                                }
                </span>
        </CardContent>
    );
};

export default IntakeQuestion;
