import React, { useState } from "react";
import Disclaimer from "./domains/footer/Disclaimer";
import { useNavigate } from "react-router-dom";
import LanguageService from "../services/LanguageService";
import {Button, CardContent, Typography} from '@material-ui/core';
import TranslateService from "../services/LanguageService";
import Footer from "./domains/footer/Footer";

const Home = () => {
    const initialLanguage = localStorage.getItem('lang') || 'en'
    const [language, setLanguage] = useState(initialLanguage)
    const navigate = useNavigate()

    const onLanguageChange = () => {
        const newLanguage = language === 'en' ? 'es' : 'en'
        localStorage.setItem('lang', newLanguage)
        setLanguage(newLanguage)
    }

    const languageChangeButtonText = language === 'en' ? 'Español' : 'English'

    return(
        <>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                {
                    LanguageService.translate('about')
                }
            </Typography>

            <Typography color="text.secondary" align="center" component="h1" variant="h4" gutterBottom>
                <Button onClick={() => navigate('/chats/new')} color="primary">
                    { LanguageService.translate('createChatButton', language) }
                </Button>
            </Typography>

            <Button onClick={onLanguageChange} color="primary">{ languageChangeButtonText }</Button>
            <Footer lang={language}/>
        </>
    )
};

export default Home
