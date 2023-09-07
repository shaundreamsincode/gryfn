import React from "react";
import Dashboard from "./dashboard/Dashboard";
import ApplicationNavbar from "./ApplicationNavbar";
import {Card, CardContent} from "@material-ui/core";
import AccountSettings from "./account_settings/AccountSettings";
import IntakeAssessment from "./intake_assessments/IntakeAssessment";

const Application = () => {
    const currentUrl = window.location.href;
    const component = currentUrl.split('/')[4]

    const buildComponent = () => {
        if (component === 'dashboard') {
            return(<Dashboard/>)
        }

        if (component === 'account_settings') {
            return(<AccountSettings/>)
        }

        if (component === 'intake_assessments') {
            return(<IntakeAssessment/>)
        }

        return(<></>)
        // <Dashboard/>


    }

    return(<>
        <Card>
            <CardContent>
                <ApplicationNavbar/>
                { buildComponent() }
            </CardContent>
        </Card>
    </>)
}

export default Application
