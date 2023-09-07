import React from "react";
import Dashboard from "./Dashboard";
import ApplicationNavbar from "./ApplicationNavbar";
import {Card, CardContent} from "@material-ui/core";
import AccountSettings from "./account_settings/AccountSettings";

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
