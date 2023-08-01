import React from "react";
import Disclaimer from "./Disclaimer";
import {Button, CardContent} from "@material-ui/core";
import LanguageService from "../../../services/LanguageService";
import { useNavigate } from "react-router-dom";

const Footer = (props) => {
    const { lang } = props
    const navigate = useNavigate()

    return(<>
        <Disclaimer lang={lang}/>

        <Button style={{ float: 'right', 'marginBottom': '10px'}}>
            <a onClick={() => navigate('/contact')} style={{ 'textDecoration': 'none' }}>{ LanguageService.translate('contactButton') }</a>
        </Button>
    </>)
}

export default Footer