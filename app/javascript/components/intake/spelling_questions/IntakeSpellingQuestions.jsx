import React from 'react'
import {Button} from "@material-ui/core";
import IntakeSpellingQuestion from "./IntakeSpellingQuestion";

const IntakeSpellingQuestions = (props) => {
    const { questions, onSave, onFinish, questionSaveEndpoint, title, finishButtonText } = props
    const currentUrl = window.location.href

    const sortedQuestions = questions.sort(function(a, b) {
        var textA = a.file_name;
        var textB = b.file_name;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    const hasUnansweredQuestions = questions.some((q) => !q.answer)

    const onQuestionSave = (updatedQuestion) => {
        const newQuestions = questions.slice(0)

        const indexOfUpdatedQuestion = newQuestions.findIndex((question) => {
            return question.token === updatedQuestion.token
        })

        newQuestions[indexOfUpdatedQuestion] = updatedQuestion
        onSave(newQuestions)
    };

    return (
        <>
            <h2> { title } Questions </h2>
            <div>
                {
                    sortedQuestions.map((question) => (
                        <IntakeSpellingQuestion
                            key={question.token}
                            question={question}
                            onSave={onQuestionSave}
                            questionSaveEndpoint={questionSaveEndpoint}
                        />
                    ))
                }
            </div>
            <div style={{ 'display': 'flex', 'justify-content': 'flex-end', 'margin-top': '1rem' }}>
                <Button variant="contained" color="primary" onClick={onFinish} disabled={hasUnansweredQuestions}>{ finishButtonText }</Button>
            </div>
        </>
    );
}

export default IntakeSpellingQuestions