import React from "react";
import {CardContent, Button, Typography} from "@material-ui/core";
import {useNavigate} from "react-router-dom";

const Instructions = () => {
    const navigate = useNavigate()

    return(<CardContent>
        <Typography>Instructions will go here...</Typography>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/accept_tos_and_privacy_policy')}>
                Next
            </Button>
        </div>
    </CardContent>)
}

export default Instructions