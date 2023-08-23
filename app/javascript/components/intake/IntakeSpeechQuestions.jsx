import React, { useState, useEffect } from 'react'
import ApiService from "../../services/ApiService";
import {CardContent} from "@material-ui/core";
import IntakeSpeechQuestion from "./IntakeSpeechQuestion";

const IntakeSpeechQuestions = () => {
    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[4];

    const [questions, setQuestions] = useState(null)

    useEffect(() => {
        ApiService.getIntakeSpeechQuestions(assessmentToken).then((response) => {
            setQuestions(response.data)
        })
    }, [assessmentToken])

    if (!questions) {
        return(<CardContent>Loading...</CardContent>)
    }

    return(<CardContent>
        {
            questions.map((question) => {
                return(<IntakeSpeechQuestion question={question} />)
            })
        }
    </CardContent>) }

export default IntakeSpeechQuestions
