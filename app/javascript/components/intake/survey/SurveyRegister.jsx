import React, { useState } from "react";
import {
    Typography,
    Button,
    Grid,
    CardContent,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import IntakeService from "../../../services/IntakeService";

const SurveyRegister = (props) => {
    const { assessmentToken, moveToNextStepProp } = props
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [previouslyDiagnosed, setPreviouslyDiagnosed] = useState(null);
    const [levelOfEducation, setLevelOfEducation] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleSubmit = () => {
        setSaving(true);

        const params = {
            date_of_birth: dateOfBirth,
            country: country,
            zip_code: zipCode,
            previously_diagnosed: previouslyDiagnosed,
            level_of_education: levelOfEducation,
        };


        IntakeService.registerPatient(assessmentToken, params).then((response) => {
            moveToNextStepProp()
        });
    };

    const nextButtonDisabled = () => {
        if (saving) {
            return true;
        }

        return !(dateOfBirth);
    };

    return (
        <CardContent>
            <div>
                <TextField
                    required
                    id="date"
                    label="Birthday"
                    type="date"
                    inputFormat="MM-DD-YYYY"
                    onChange={(e) => { setDateOfBirth(e.target.value) }}
                    value={dateOfBirth}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div>
                <TextField
                    value={country}
                    label="Country"
                    onChange={(e) => setCountry(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    value={zipCode}
                    label="Zip Code"
                    onChange={(e) => setZipCode(e.target.value)}
                />
            </div>
            <Typography variant="subtitle2" gutterBottom style={{ color: 'grey' }}>
                * indicates a required field
            </Typography>

            <div style={{ marginTop: "40px" }}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        Have you been diagnosed with a learning disorder?
                    </FormLabel>
                    <RadioGroup
                        aria-label="options"
                        name="options"
                        value={previouslyDiagnosed}
                        onChange={(e) => {
                            setPreviouslyDiagnosed(e.target.value);
                        }}
                    >
                        <FormControlLabel value="option1" control={<Radio />} label="Yes" />
                        <FormControlLabel value="option2" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </div>

            <div style={{ marginTop: "20px" }}>
                <FormControl>
                    <FormLabel component="legend">
                        What is your highest level of education?
                    </FormLabel>
                    <InputLabel style={{ marginTop: "20px" }}>
                        Select an option
                    </InputLabel>
                    <Select
                        value={levelOfEducation}
                        onChange={(e) => {
                            setLevelOfEducation(e.target.value);
                        }}
                        label="Select an option"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="elementary_school">Elementary School</MenuItem>
                        <MenuItem value="middle_school">Middle School</MenuItem>
                        <MenuItem value="high_school">High School</MenuItem>
                        <MenuItem value="associates">Associates</MenuItem>
                        <MenuItem value="bachelors">Bachelors</MenuItem>
                        <MenuItem value="masters">Masters</MenuItem>
                        <MenuItem value="phd">PhD</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div
                style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={nextButtonDisabled()}
                >
                    Next
                </Button>
            </div>
        </CardContent>
    );
};

export default SurveyRegister;
