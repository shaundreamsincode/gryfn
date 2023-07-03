import React from "react";
import {CardContent, Typography} from "@material-ui/core";
import LanguageService from "../services/LanguageService";

const Disclaimer = (props) => {
    const { lang } = props
    return(
        <CardContent>
            <Typography variant="caption" color="text.secondary" align="center">
                { LanguageService.translate('disclaimer', lang) }
            </Typography>
        </CardContent>
    )
}

export default Disclaimer
