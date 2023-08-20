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
    const [assessment, setAssessment] = useState(null);
    const [questions, setQuestions] = useState(assessment?.questions)

    // onSave(updatedQuestionToken, updatedQuestionAnswer);

    const onQuestionSave = (updatedQuestionToken, updatedQuestionAnswer) => {
        // debugger
        const newQuestions = Object.assign({}, questions)

        const updatedQuestion = newQuestions.find((question) => {
                return question.token === updatedQuestionToken
            }
        )

        updatedQuestion.answer = updatedQuestionAnswer
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
            setAssessment(response.data);
        });
    }, [assessmentToken]);

    if (!assessment) {
        return (
            <CardContent>
                Loading...
            </CardContent>
        );
    }

    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;

    const sortedQuestions = assessment.questions.sort(function(a, b) {
        var textA = a.file_name;
        var textB = b.file_name;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    const questionsToDisplay = sortedQuestions.slice(startIndex, endIndex);

    const hasUnansweredQuestion = questionsToDisplay.some((question) => !question.answer);

    const numberOfPages = Math.ceil(assessment.questions.length / questionsPerPage)

    const showFinishButton = (currentPage + 1 === numberOfPages)

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
                    showFinishButton && <Button onClick={handleFinishButtonClick} disabled={hasUnansweredQuestion}>Finish</Button>
                }

                {
                    !showFinishButton && <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={(endIndex >= assessment.questions.length) || hasUnansweredQuestion}
                    >
                        Next Page
                    </Button>
                }
            </div>

        </CardContent>
    );
};

export default IntakeAssessment;
