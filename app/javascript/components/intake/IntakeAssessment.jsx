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

    const onQuestionSave = () => {
        ApiService.getIntakeAssessment(assessmentToken).then((response) => {
            setAssessment(response.data);
        });
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
    const questionsToDisplay = assessment.questions.slice(startIndex, endIndex);

    const hasUnansweredQuestion = questionsToDisplay.some((question) => !question.answer);

    return (
        <CardContent>
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
                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={endIndex >= assessment.questions.length}
                >
                    Next Page
                </Button>
            </div>

            <Button onClick={handleFinishButtonClick} disabled={hasUnansweredQuestion}>Finish</Button>
        </CardContent>
    );
};

export default IntakeAssessment;
