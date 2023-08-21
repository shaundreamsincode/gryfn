import React, { useState, useEffect } from "react";
import { CardContent, Button } from "@material-ui/core";
import ApiService from "../../services/ApiService";
import IntakeQuestion from "./IntakeQuestion";
import { useNavigate } from "react-router-dom";

const IntakeAssessment = () => {
    const navigate = useNavigate();

    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[4];

    const questionsPerPage = 5; // Number of questions per page
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
        navigate(`/intake_assessments/${assessmentToken}/summary`);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

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

    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;

    const sortedQuestions = questions.sort(function(a, b) {
        var textA = a.file_name;
        var textB = b.file_name;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    const questionsToDisplay = sortedQuestions.slice(startIndex, endIndex);

    const hasUnansweredQuestions = sortedQuestions.some((question) => !question.answer);

    const numberOfPages = Math.ceil(questions.length / questionsPerPage)

    const showFinishButton = (currentPage + 1 === numberOfPages)

    //

    // const disableFinishButton = unansweredQuestions.length > 0

    return (
        <CardContent>
            Page { currentPage + 1 } out of { numberOfPages }.

            <div>
                {
                    questionsToDisplay.map((question) => (
                        <IntakeQuestion key={question.token} question={question} onSave={onQuestionSave} />
                    ))
                }
            </div>

            <div>
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Previous Page
                </Button>
                {
                    // todo - recalc hasUnansweredQuestion
                    showFinishButton && <Button onClick={handleFinishButtonClick} disabled={hasUnansweredQuestions}>Finish</Button>
                }

                {
                    !showFinishButton && <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={(endIndex >= questions.length)}
                    >
                        Next Page
                    </Button>
                }
            </div>

        </CardContent>
    );
};

export default IntakeAssessment;
