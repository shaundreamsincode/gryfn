import React, { useState, useEffect }  from "react";
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    MenuItem,
    InputLabel,
    Select, TextField, Checkbox, Button
} from "@material-ui/core";

const IntakeSurvey = (props) => {
    const assessment = props.assessment
    console.log(assessment)
    const [previouslyDiagnosed, setPreviouslyDiagnosed] = useState(null)
    const [levelOfEducation, setLevelOfEducation] = useState(null)
    const [lastEyeExamAt, setLastEyeExamAt] = useState(null) // TODO - RENAME VARIABLE
    const [doesntRememberLastEyeExamAt, setDoesntRememberLastEyeExamAt] = useState(false)


    const handleDoesNotRememberLastEyeExamAtToggle = () => {
        debugger
        setDoesntRememberLastEyeExamAt(!doesntRememberLastEyeExamAt)
        // setLastEyeExamAt(null)
    }

    const handleSubmit = () => {
        // api/intake_assessments/token/survey_responses
    }

    return (
        <>
            <div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Have you been diagnosed with a learning disorder?</FormLabel>
                    <RadioGroup
                        aria-label="options"
                        name="options"
                        value={previouslyDiagnosed}
                        onChange={(e) => { setPreviouslyDiagnosed(e.target.value) }}
                    >
                        <FormControlLabel value="option1" control={<Radio />} label="Yes" />
                        <FormControlLabel value="option2" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </div>

            <div style={{'marginTop' : '20px' }}>
                <FormControl>
                    <FormLabel component="legend">What is your highest level of education?</FormLabel>
                    <InputLabel style={{'marginTop' : '20px' }}>Select an option</InputLabel>
                    <Select
                        value={levelOfEducation}
                        onChange={(e) => { setLevelOfEducation(e.target.value) }}
                        label="Select an option"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="option1">Option 1</MenuItem>
                        <MenuItem value="option2">Option 2</MenuItem>
                        <MenuItem value="option3">Option 3</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{'marginTop' : '20px' }}>
                <FormControl>
                    <div>
                        <FormLabel component="legend">When was your last eye examination?</FormLabel>

                        <TextField
                            id="last-eye-exam-at"
                            type="date"
                            disabled={doesntRememberLastEyeExamAt}
                            onChange={(e) => setLastEyeExamAt(e.target.value)}
                        />
                    </div>
                    <div>
                        <Checkbox onChange={() => handleDoesNotRememberLastEyeExamAtToggle()}/>
                        I do not remember
                    </div>
                </FormControl>
            </div>
            <div style={{'marginTop' : '20px' }}>
                <Button disabled={
                    !previouslyDiagnosed || !levelOfEducation || (!lastEyeExamAt && !doesntRememberLastEyeExamAt)
                } onClick={handleSubmit}>Next</Button>
            </div>
            </>
    )
}

export default IntakeSurvey