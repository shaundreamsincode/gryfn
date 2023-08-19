import React, { useState } from "react";
import {Typography, Button, Grid, CardContent, TextField} from "@material-ui/core";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [birthYear, setBirthYear] = useState('')
    const [country, setCountry] = useState('')
    const [zipCode, setZipCode] = useState('')

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/instructions')
    }

    return(
        <CardContent>
            <div>
                <TextField label="First Name" onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
                <TextField label="Email" onChange={(e) => setEmail(e.target.value)} />
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
                <TextField label="Country" onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div>
                <TextField label="Zip Code" onChange={(e) => setZipCode(e.target.value)} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Next
                </Button>
            </div>
        </CardContent>
    )
}

export default Register
