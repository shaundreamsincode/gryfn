import React, { useState, useEffect } from "react";
import {CardContent, List, ListItem, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import ApiService from "../../services/ApiService";

const IntakeSummary = () => {
    const currentUrl = window.location.href
    const assessmentToken = currentUrl.split("/")[4]
    const [assessment, setAssessment] = useState(null)

    useEffect(() => {
        ApiService.getIntakeAssessmentSummary(assessmentToken).then((response) => {
            setAssessment(response.data)
        })
    }, [assessmentToken])

    if (!assessment) {
        return(<CardContent>Loading...</CardContent>)
    }

    debugger

    return(
        <CardContent>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Your Answer</TableCell>
                        <TableCell>Actual Answer</TableCell>
                        <TableCell>Was Correct?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        assessment.intake_questions.map((question) => {
                            const userAnswerWasCorrect = question.answer.toUpperCase() === question.correct_answer.toUpperCase()
                            return(<TableRow>
                                <TableCell>{ question.answer }</TableCell>
                                <TableCell>{ question.correct_answer }</TableCell>
                                <TableCell>{ userAnswerWasCorrect ? 'Correct' : 'Incorrect' }</TableCell>
                            </TableRow>)
                        })
                    }
                    {/*<TableRow>*/}
                    {/*    <TableCell>Data 1</TableCell>*/}
                    {/*    <TableCell>Data 2</TableCell>*/}
                    {/*    <TableCell>Data 3</TableCell>*/}
                    {/*</TableRow>*/}
                    {/*<TableRow>*/}
                    {/*    <TableCell>Data 4</TableCell>*/}
                    {/*    <TableCell>Data 5</TableCell>*/}
                    {/*    <TableCell>Data 6</TableCell>*/}
                    {/*</TableRow>*/}
                </TableBody>
            </Table>
        </CardContent>
    )
}

export default IntakeSummary
