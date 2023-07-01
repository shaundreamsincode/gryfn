import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const navigate = useNavigate();

    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const jwtToken = localStorage.getItem('token');

    const checkTokenValidity = () => {
        fetch('/api/v1/verify_token', {
            headers: { Authorization: `Bearer ${jwtToken}` },
        }).then((response) => {
            if (response.ok) {
                navigate('/')
            }
        })
    };

    useEffect(() => {
        checkTokenValidity()
    }, [jwtToken])

    const handleSubmit = () => {
        fetch('/api/v1/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "X-CSRF-Token": csrfToken, Authorization: `Bearer ${jwtToken}` },
            body: JSON.stringify({ firstName, lastName, email, password, passwordConfirmation }),
        }).then((response) => {
            // debugger
            if (response.ok) {
                // todo - auth immediatly after...
                navigate('/')
                response.json()
                // localStorage.setItem('token', response.data.token);
                // navigate('/')
            }

            // todo - handle errors...
        }).then((data) => {
            // debugger
            // localStorage.setItem('token', data.token);
            // navigate('/')
        })
    }

    return(
        <div>
            <input
                type="first_name"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <input
                type="last_name"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input
                type="password_confirmation"
                placeholder="Password Confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
            />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default SignUp