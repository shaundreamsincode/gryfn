import React, { useState, useEffect } from "react";
import { CardContent, Button } from "@material-ui/core";
import ApiService from "../../services/ApiService";
import IntakeQuestion from "./IntakeQuestion";
import { useNavigate } from "react-router-dom";

const IntakeAssessment = () => {
    const navigate = useNavigate();

    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[4];

    const [currentPage, setCurrentPage] = useState(0);
    const [questions, setQuestions] = useState(null)

    const onQuestionSave = (updatedQuestion) => {
        const newQuestions = questions.slice(0)

        const indexOfUpdatedQuestion = newQuestions.findIndex((question) => {
            return question.token === updatedQuestion.token
        })

        newQuestions[indexOfUpdatedQuestion] = updatedQuestion
        setQuestions(newQuestions)
    };

    const handleFinishButtonClick = () => {
        navigate(`/intake_assessments/${assessmentToken}/summary`)
    }


    useEffect(() => {
        ApiService.getIntakeAssessment(assessmentToken).then((response) => {
            setQuestions(response.data.questions);
        });
    }, [assessmentToken]);

    if (!questions) {
        return (
            <CardContent>
                Loading...
            </CardContent>
        );
    }

    const sortedQuestions = questions.sort(function(a, b) {
        var textA = a.file_name;
        var textB = b.file_name;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    const hasUnansweredQuestions = questions.some((q) => !q.answer)

    return (
        <CardContent>

            <div>
                {
                    sortedQuestions.map((question) => (
                        <IntakeQuestion key={question.token} question={question} onSave={onQuestionSave} />
                    ))
                }
            </div>
            <div style={{ 'display': 'flex', 'justify-content': 'flex-end', 'margin-top': '1rem' }}>
                 <Button variant="contained" color="primary" onClick={handleFinishButtonClick} disabled={hasUnansweredQuestions}>Finish</Button>
            </div>

            {/*<div>*/}
            {/*    <Button*/}
            {/*        onClick={() => handlePageChange(currentPage - 1)}*/}
            {/*        disabled={currentPage === 0}*/}
            {/*    >*/}
            {/*        Previous Page*/}
            {/*    </Button>*/}
            {/*    {*/}
            {/*        // todo - recalc hasUnansweredQuestion*/}
            {/*        showFinishButton && <Button onClick={handleFinishButtonClick} disabled={hasUnansweredQuestions}>Finish</Button>*/}
            {/*    }*/}

            {/*    {*/}
            {/*        !showFinishButton && <Button*/}
            {/*            onClick={() => handlePageChange(currentPage + 1)}*/}
            {/*            disabled={(endIndex >= questions.length)}*/}
            {/*        >*/}
            {/*            Next Page*/}
            {/*        </Button>*/}
            {/*    }*/}
            {/*</div>*/}

        </CardContent>
    );
};

export default IntakeAssessment;
