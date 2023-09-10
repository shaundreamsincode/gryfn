import React, { useState } from "react";
import {Button, CardContent, Checkbox, FormControlLabel, FormGroup, Link, Typography} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const SurveyAcceptTerms = (props) => {
    const { moveToNextStepProp } = props
    const navigate = useNavigate()
    const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false)

    return(<CardContent>
        <div>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox onChange={() => setPrivacyPolicyAccepted(!privacyPolicyAccepted)} />}
                    label={
                        <span>
                            I have read and I accept the <Link onClick={() => navigate('/terms_of_service')}>Terms of Service</Link> and
                            the <Link onClick={() => navigate('/privacy_policy')}>Privacy Policy</Link>.
                    </span>
                    }
                />
            </FormGroup>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <Button variant="contained" color="primary" disabled={!privacyPolicyAccepted} onClick={moveToNextStepProp}>
                Next
            </Button>
        </div>
    </div>
    </CardContent>)
}

export default SurveyAcceptTerms
