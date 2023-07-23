import React from "react";
import {CardContent, Typography} from "@material-ui/core";
import LanguageService from "../services/LanguageService";

const ContactUs= (props) => {
    const { lang } = props
    return(
        <CardContent>
            <Typography variant="caption" color="text.secondary" align="center">
                <p>DocBot was built by <a href="https://www.linkedin.com/in/corinne-carland">Corinne</a> and <a href="https://shauncarland.com">Shaun Carland</a>.</p>

                <p>You can contact us by emailing <b>teamdocbot@gmail.com</b>.</p>
            </Typography>
        </CardContent>
    )
}

export default ContactUs
