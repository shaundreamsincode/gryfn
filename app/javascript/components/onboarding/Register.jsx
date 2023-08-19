import React, { useState } from "react";
import {Typography, Button, Grid, CardContent, TextField} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import ApiService from "../../services/ApiService";

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [birthYear, setBirthYear] = useState('')
    const [country, setCountry] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const [errorMessages, setErrorMessages] = useState([])

    const navigate = useNavigate();

    const handleSubmit = () => {
        const params = {
            name: name,
            email: email,
            birth_year: birthYear,
            country: country,
            zip_code: zipCode,
            password: password,
            passwordConfirmation: passwordConfirmation
        }

        ApiService.registerAccount(params).then((response) => {
            navigate(`/intake_assessments/${response.data.intakeAssessmentToken}`)
        })
    }

    return(
        <CardContent>
            <div>
                <TextField value={name} label="First Name" onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <TextField value={email} label="Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <TextField
                    label="Birth Year"
                    value={birthYear}
                    onChange={(e) => {
                        const input = e.target.value;
                        if (/^\d*$/.test(input)) {
                            setBirthYear(input);
                        }
                    }}
                />
            </div>
            <div>
                <TextField value={country} label="Country" onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div>
                <TextField value={zipCode} label="Zip Code" onChange={(e) => setZipCode(e.target.value)} />
            </div>
            <div>
                <TextField value={password} label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div>
                <TextField value={passwordConfirmation} label="Confirm Password" type="password" onChange={(e) => setPasswordConfirmation(e.target.value)} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                {/*<Button variant="contained" color="primary" onClick={handleSubmit} disabled={!(name && email && birthYear && country && zipCode && password && passwordConfirmation)}>*/}
                    Next
                </Button>
            </div>
        </CardContent>
    )
}

export default Register
