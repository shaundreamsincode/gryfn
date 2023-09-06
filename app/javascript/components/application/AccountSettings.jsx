import React, { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";
import {Typography} from "@material-ui/core";

const AccountSettings = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        ApiService.getCurrentAccount().then((response) => {
            setFirstName(response.first_name)
            setLastName(response.last_name)
            setEmail(response.last_name)
            setLoading(false)
        })

    }, [''])

    if (loading) {
        return(<></>)
    }

    return(<>
        <Typography>Account Settings</Typography>

    </>)
    // return(<div>Account Settings</div>)
}

export default AccountSettings
