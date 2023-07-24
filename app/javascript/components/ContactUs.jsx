import React from "react";
import {Button, CardContent, Typography} from "@material-ui/core";
import LanguageService from "../services/LanguageService";

import { useNavigate } from "react-router-dom";const ContactUs = (props) => {
    const { lang } = props
    const navigate = useNavigate()

    const onHomeClick = () => {
        navigate('/')
    }

    return(
        <CardContent>
            <Typography variant="caption" color="text.secondary" align="center">
                {
                    LanguageService.currentLanguage() === 'en' && <>
                        <p>DocBot was built by <a href="https://www.linkedin.com/in/corinne-carland">Corinne</a> and <a href="https://shauncarland.com">Shaun Carland</a>.</p>

                        <p>You can contact us by emailing <b>teamdocbot@gmail.com</b>.</p>
                    </>
                }
                {
                    LanguageService.currentLanguage() === 'es' && <>
                        <p>DocBot fue construido por <a href="https://www.linkedin.com/in/corinne-carland">Corinne</a> y <a href="https://shauncarland.com">Shaun Carland</a>.</p>

                        <p>Puede ponerse en contacto con nosotros enviando un correo electrónico <b>teamdocbot@gmail.com</b>.</p>
                    </>
                }
            </Typography>

            <Button style={{ float: 'right', 'marginBottom': '10px'}}>
                <a onClick={() => onHomeClick()} style={{ 'textDecoration': 'none' }}>{ LanguageService.translate('homeButton') }</a>
            </Button>
        </CardContent>
    )
}

export default ContactUs
