class LanguageService {
    static translate(string, lang = null) {
        debugger
        const language = lang || localStorage.getItem('lang') || 'en'
        return this._locales()[language][string]
    }

    static _locales() {
        return {
            en: {
                about: "Welcome! DocBot is an AI powered chatbot designed to help your doctor better care for you. DocBot will ask you a series of questions about the symptoms you are experiencing. Please answer with as much detail as you are able to. At the end of the chat, DocBot will generate a summary that you can provide to your doctor. Your doctor will be able to review this summary and they may ask further clarifying questions. Then, your doctor will talk to you about any possible recommended tests and make a treatment plan.",
                disclaimer: "DocBot is NOT a substitute for professional medical advice, diagnosis or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. If you are having a medical emergency, call 911 or your local emergency services number.",
                createChatButton: 'Create a new chat',
                chatInstructions: 'Please describe your symptoms to DocBot. At the end of your chat, click “finish” and a summary of your conversation will be generated. You can send this information to your doctor for them to review.',
                patient: 'PATIENT',
                doctor: 'DOCBOT',
                chatTextboxPlaceholder: 'Type Something',
                loading: 'Loading',
                summaryGenerated: 'Summary Generated',
                generateSummary: 'Generate Summary',
                summaryCopied: 'Summary Copied to Clipboard!',
                // buttons
                sendButton: 'Send',
                finishButton: 'Finish',
                homeButton: 'Hogar',
                copySummaryButton: 'Copy Summary',
                chatClosed: 'Chat has been closed by the user.',
                chatNotFound: 'Chat not found.'
            },

            es: {
                about: "¡Bienvenido! DocBot es un chatbot impulsado por IA diseñado para ayudar a su médico a brindarle una mejor atención. DocBot le hará una serie de preguntas sobre los síntomas que está experimentando. Por favor responda con tanto detalle como pueda. Al final del chat, DocBot generará un resumen que puede proporcionar a su médico. Su médico podrá revisar este resumen y es posible que le haga más preguntas aclaratorias. Luego, su médico hablará con usted sobre las posibles pruebas recomendadas y elaborará un plan de tratamiento.",
                disclaimer: "DocBot NO reemplaza el asesoramiento, diagnóstico o tratamiento médico profesional. Siempre busque el consejo de su médico u otro proveedor de salud calificado con cualquier pregunta que pueda tener con respecto a una condición médica. Si tiene una emergencia médica, llame al 911 o al número local de servicios de emergencia.",
                createChatButton: 'Crear un nuevo chat',
                chatInstructions: 'Describa sus síntomas a DocBot. Al final de su chat, haga clic en "finalizar" y se generará un resumen de su conversación. Puede enviar esta información a su médico para que la revise.',
                patient: 'PACIENTE',
                doctor: 'DOCBOT',
                chatTextboxPlaceholder: 'Escribe algo',
                loading: 'Cargando',
                summaryGenerated: 'Resumen Generado',
                generateSummary: 'Generar Resumen',
                summaryCopied: '¡Resumen Copiado al Portapapeles!',
                // buttons
                sendButton: 'Enviar',
                finishButton: 'Finalizar',
                homeButton: 'Hogar',
                copySummaryButton: 'Copiar Resumen',
                chatClosed: 'El chat ha sido cerrado por el usuario.',
                chatNotFound: 'Chat no encontrado.'
            }
        }
    }
}

export default LanguageService
