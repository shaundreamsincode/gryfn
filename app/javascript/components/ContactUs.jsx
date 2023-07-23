import React from "react";
import {Button, CardContent, Typography} from "@material-ui/core";
import LanguageService from "../services/LanguageService";

const ContactUs = (props) => {
    const { lang } = props
    return(
        <CardContent>
            <Typography variant="caption" color="text.secondary" align="center">
                <p>DocBot was built by <a href="https://www.linkedin.com/in/corinne-carland">Corinne</a> and <a href="https://shauncarland.com">Shaun Carland</a>.</p>

                <p>You can contact us by emailing <b>teamdocbot@gmail.com</b>.</p>
            </Typography>

            <Button style={{ float: 'right', 'marginBottom': '10px'}}>
                <a href="https://docbot.tech" style={{ 'textDecoration': 'none' }}>Home</a>
            </Button>
        </CardContent>
    )
}

export default ContactUs
