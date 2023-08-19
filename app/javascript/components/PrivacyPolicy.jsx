import React, { useState } from "react";
import {Button, CardContent, Checkbox} from "@material-ui/core";
import {useNavigate} from "react-router-dom";

const PrivacyPolicy = () => {
    const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false)

    return(<CardContent>
        <div>
            Privacy policy will go here...
        </div>
        <div>
            <Checkbox onChange={() =>setPrivacyPolicyAccepted(!privacyPolicyAccepted) }/> I accept the privacy policy
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <Button variant="contained" color="primary" disabled={!privacyPolicyAccepted}>
                Next
            </Button>
        </div>
    </CardContent>)
}

export default PrivacyPolicy
