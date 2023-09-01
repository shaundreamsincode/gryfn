import React from "react"
import {Button, CardContent, Typography} from "@material-ui/core";

const Contact = () => {
    return(<CardContent>
        <Typography>
            Contact page info goes here
        </Typography>

        <div style={{ 'display': 'flex', 'justifyContent': 'flex-start', 'margin-top': '1rem' }}>
            <Button variant="contained" color="primary" onClick={() => {window.location.href = "https://gryfn.onrender.com"}}>Home</Button>
        </div>
    </CardContent>)
}

export default Contact
