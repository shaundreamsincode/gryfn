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
import { useNavigate } from "react-router-dom";
import IntakeService from "../../services/IntakeService";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birthYear, setBirthYear] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [previouslyDiagnosed, setPreviouslyDiagnosed] = useState(null);
    const [levelOfEducation, setLevelOfEducation] = useState(null);
    const [saving, setSaving] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate = useNavigate();

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [isBirthYearValid, setIsBirthYearValid] = useState(true);

    debugger

    const token =
        document.querySelector('[name=csrf-token]').content

    const handleSubmit = () => {
        setSaving(true);

        const params = {
            name: name,
            email: email,
            birth_year: birthYear,
            country: country,
            zip_code: zipCode,
            previously_diagnosed: previouslyDiagnosed,
            level_of_education: levelOfEducation,
        };

        IntakeService.createIntakeAssessment(params).then((response) => {
            setSaving(false);
            navigate(`/intake_assessments/${response.data.intakeAssessmentToken}`);
        });
    };

    const nextButtonDisabled = () => {
        if (saving) {
            return true;
        }

        return !(email && isEmailValid && birthYear && isBirthYearValid);
    };

    return (
        <CardContent>
            <div>
                <TextField
                    value={name}
                    label="First Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    value={email}
                    label="Email"
                    required
                    onChange={(e) => {
                        const input = e.target.value;
                        setEmail(input);
                        if (emailRegex.test(input)) {
                            setIsEmailValid(true);
                            setEmailErrorMessage("");
                        } else {
                            setIsEmailValid(false);
                            setEmailErrorMessage("Invalid email format");
                        }
                    }}
                />
                {!isEmailValid && (
                    <Typography color="error">{emailErrorMessage}</Typography>
                )}
            </div>
            <div>
                <TextField
                    label="Birth Year"
                    value={birthYear}
                    required
                    onChange={(e) => {
                        const input = e.target.value;
                        setBirthYear(input);

                        const birthYearIsInteger = /^\d*$/.test(input)
                        const birthYearIsValid = birthYearIsInteger && Number(input) > 1900 && Number(input) < 2024
                        setIsBirthYearValid(birthYearIsValid)
                    }}
                />
                {
                    !isBirthYearValid && (
                        <Typography color="error">Invalid Birth Year</Typography>
                    )
                }
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

export default Register;
