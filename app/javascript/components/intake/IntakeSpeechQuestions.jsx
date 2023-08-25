import React, { useState, useEffect } from 'react'
import ApiService from "../../services/ApiService";
import {CardContent} from "@material-ui/core";
import IntakeSpeechQuestion from "./IntakeSpeechQuestion";

const IntakeSpeechQuestions = () => {
    const currentUrl = window.location.href;
    const assessmentToken = currentUrl.split("/")[4];

    const [questions, setQuestions] = useState([])

    const sortedQuestions = questions.sort(function(a, b) {
        var textA = a.file_name;
        var textB = b.file_name;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

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

    if (sortedQuestions.length === 0) {
        return(<CardContent>Loading...</CardContent>)
    }

    return(<CardContent>
        {
            sortedQuestions.map((question) => {
                return(<IntakeSpeechQuestion question={question} />)
            })
        }
    </CardContent>) }

export default IntakeSpeechQuestions
