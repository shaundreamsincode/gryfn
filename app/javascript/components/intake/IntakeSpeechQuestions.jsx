import React, { useState, useEffect } from 'react'
import ApiService from "../../services/ApiService";
import {CardContent} from "@material-ui/core";
import IntakeSpeechQuestion from "./IntakeSpeechQuestion";

const IntakeSpeechQuestions = () => {
    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[4];

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        ApiService.getIntakeSpeechQuestions(assessmentToken).then((response) => {
            console.log('success')
            console.log(response)

            setQuestions(response.data)
        }).catch((error) => {
            console.log('error')
            console.log(error)
        })
    }, [assessmentToken])

    if (questions.length === 0) {
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
