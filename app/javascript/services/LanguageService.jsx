class LanguageService {
    static currentLanguage() {
        return localStorage.getItem('lang') || 'en'
    }

    static translate(string, lang = null) {
        return this._locales()[this.currentLanguage()][string]
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
                name: 'Name',
                birthday: 'Date of Birth',
                doctorEmail: 'Doctor Email',
                yourEmail: 'Your Email',
                chatTextboxPlaceholder: 'Type Something',
                loading: 'Loading',
                summaryLoading: 'Summary Loading...',
                summaryCopied: 'Summary Copied to Clipboard!',
                summaryEmailSent: 'Summary was successfully emailed! If you do not see it in a few minutes, try checking in your spam email.',
                // buttons
                sendButton: 'Send',
                finishButton: 'Finish',
                clearMessagesButton: 'Clear Messages',
                homeButton: 'Home',
                contactButton: 'Contact',
                copySummaryButton: 'Copy Summary',
                emailSummaryButton: 'Email Summary',
                cancelButton: 'Cancel',
                confirmButton: 'Confirm',
                //
                chatClosed: 'Chat has been closed by the user.',
                chatNotFound: 'Chat not found.',
                noUserMessages: 'Patient did not interact with the chatbot.',
                emailSummaryInstructions: 'Please enter the email you want to send the summary to.',
                sendSummaryTitle: 'Send Summary',
                doctorEmailIsInvalidError: 'Doctor email is invalid',
                patientEmailIsInvalidError: 'Patient email is invalid',
                confirmProceed: 'Are you sure you want to proceed?',
                clearMessagesDialogTitle: 'Clear Messages',
                emailDisclaimer: "DocBot will NEVER store your name, birthday, email, or doctors email."
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
                summaryLoading: 'Resumen Cargando...',
                summaryCopied: '¡Resumen Copiado al Portapapeles!',
                summaryEmailSent: "¡El resumen se ha enviado por correo electrónico correctamente! Si no lo ves en unos minutos, intenta revisar tu correo electrónico de spam.",
                name: 'Nombre',
                birthday: 'Fecha de nacimiento',
                doctorEmail: 'Correo electrónico del médico',
                yourEmail: 'Su Correo Electrónico',
                // buttons
                sendButton: 'Enviar',
                finishButton: 'Finalizar',
                clearMessagesButton: 'Borrar Mesajes',
                homeButton: 'Hogar',
                contactButton: 'Contactanos',
                copySummaryButton: 'Copiar Resumen',
                emailSummaryButton: 'Resumen de Correo Electrónico',
                cancelButton: 'Cancelar',
                confirmButton: 'Confirmar',
                //
                chatClosed: 'El chat ha sido cerrado por el usuario.',
                chatNotFound: 'Chat no encontrado.',
                noUserMessages: 'El paciente no interactuó con el chatbot.',
                emailSummaryInstructions: 'Por favor, introduzca el correo electrónico al que desea enviar el resumen.',
                sendSummaryTitle: 'Enviar Resumen',
                doctorEmailIsInvalidError: 'El correo electrónico del medico es invalido',
                patientEmailIsInvalidError: 'El correo electrónico del paciente es invalido',
                confirmProceed: '¿Estas seguro que deseas continuar?',
                clearMessagesDialogTitle: 'Borrar Mensajes',
                emailDisclaimer: "DocBot NUNCA almacenará su nombre, cumpleaños, correo electrónico o correo electrónico del médico."
            }
        }
    }
}

export default LanguageService
