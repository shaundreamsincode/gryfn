import React from "react";
import {Button, Typography} from "@material-ui/core";

const AppToolbar = () => {
    return(
        <div style={{ 'marginTop': '20px' }}>
            <Typography align="center" >
                <Button color="primary" onClick={() => {window.location.href = "/"} }>
                    Home
                </Button>
                <Button color="primary" onClick={() => {window.location.href = "/about"} }>
                    About Us
                </Button>
                <Button color="primary" onClick={() => {window.location.href = "/contact"} }>
                    Contact Us
                </Button>

                <Button color="primary" onClick={() => {window.location.href = "/faq"} }>
                    FAQ
                </Button>

                <Button color="primary" onClick={() => {window.location.href = "/dyslexia_resources"} }>
                    Resources
                </Button>

            </Typography>

            <Typography align="center">
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Button
                        color="primary"
                        style={{ fontSize: '12px', padding: '5px 10px' }}
                        onClick={() => {
                            window.location.href = "/terms_of_service";
                        }}
                    >
                        Terms of Service
                    </Button>

                    <Button
                        color="primary"
                        style={{ fontSize: '12px', padding: '5px 10px' }}
                        onClick={() => {
                            window.location.href = "/privacy_policy";
                        }}
                    >
                        Privacy Policy
                    </Button>
                </div>
            </Typography>
        </div>
    )
}

export default AppToolbar
