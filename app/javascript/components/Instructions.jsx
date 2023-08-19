import React from "react";
import {CardContent, Button} from "@material-ui/core";
import {useNavigate} from "react-router-dom";

const Instructions = () => {
    const navigate = useNavigate()

    return(<CardContent>
        <div>Instructions will go here...</div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/privacy_policy')}>
                Next
            </Button>
        </div>
    </CardContent>)
}

export default Instructions