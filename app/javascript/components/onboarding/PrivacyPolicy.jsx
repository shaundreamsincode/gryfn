import React, { useState } from "react";
import {Button, CardContent, Checkbox, FormControlLabel, FormGroup, Typography} from "@material-ui/core";
import {useNavigate} from "react-router-dom";

const PrivacyPolicy = () => {
    const navigate = useNavigate()
    const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false)

    return(<CardContent>
        <Typography>
            Privacy policy will go here...
        </Typography>
        <div>

            <FormGroup>
                <FormControlLabel control={<Checkbox onChange={() =>setPrivacyPolicyAccepted(!privacyPolicyAccepted)} />} label="I accept the privacy policy" />
            </FormGroup>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <Button variant="contained" color="primary" disabled={!privacyPolicyAccepted} onClick={() => {navigate('/register')}}>
                Next
            </Button>
        </div>
    </CardContent>)
}

export default PrivacyPolicy
