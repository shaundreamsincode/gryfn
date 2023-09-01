import React from "react"
import {Button, CardContent} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Contact = () => {
    const navigate = useNavigate()

    return(<CardContent>
        Contact page goes here

        <div style={{ 'display': 'flex', 'justifyContent': 'flex-start', 'margin-top': '1rem' }}>
            <Button variant="contained" color="primary" onClick={() => { navigate('/') }}>Home</Button>
        </div>
    </CardContent>)
}

export default Contact
