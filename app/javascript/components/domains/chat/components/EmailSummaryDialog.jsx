import React, { useState } from 'react';
import LanguageService from '../../../../services/LanguageService';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Typography, CardContent
} from '@material-ui/core';

function EmailSummaryDialog(props) {
    const [doctorEmail, setDoctorEmail] = useState('');
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [doctorEmailIsInvalid, setDoctorEmailIsInvalid] = useState(false);
    const [patientEmailIsInvalid, setPatientEmailIsInvalid] = useState(false);

    const { open, closeDialog, dialogConfirmation } = props;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const clearErrorsFromForm = () => {
        setDoctorEmailIsInvalid(false)
        setPatientEmailIsInvalid(false)
    }

    const onDialogClose = () => {
        clearErrorsFromForm(false);
        closeDialog();
    };

    const onSubmit = () => {
        clearErrorsFromForm();
        const doctorEmailIsValid = emailRegex.test(doctorEmail);
        const patientEmailIsValid = emailRegex.test(patientEmail)

        if (doctorEmailIsValid && patientEmailIsValid) {
            return dialogConfirmation({
                doctorEmail: doctorEmail,
                name: name,
                dateOfBirth: dateOfBirth,
                patientEmail: patientEmail
            });
        }

        if (!doctorEmailIsValid) {
            setDoctorEmailIsInvalid(true)
        }

        if (!patientEmailIsValid) {
            setPatientEmailIsInvalid(true)
        }
    }
    return (
        <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>{LanguageService.translate('sendSummaryTitle')}</DialogTitle>
            <DialogContent>
                <DialogContentText>{LanguageService.translate('emailSummaryInstructions')}</DialogContentText>
                {doctorEmailIsInvalid && (
                    <DialogContentText variant="caption" align="center" style={{ color: 'red' }}>
                        {LanguageService.translate('doctorEmailIsInvalidError')}
                    </DialogContentText>
                )}
                {
                    patientEmailIsInvalid && <DialogContentText variant="caption" align="center" style={{ color: 'red' }}>
                        {LanguageService.translate('patientEmailIsInvalidError')}
                    </DialogContentText>
                }
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField label={LanguageService.translate('name')} style={{ width: '75%' }} onChange={(event) => setName(event.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField label={ LanguageService.translate('dateOfBirth') } style={{ width: '75%' }} onChange={(event) => setDateOfBirth(event.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField label={LanguageService.translate('yourEmail')} style={{ width: '75%' }} onChange={(event) => setPatientEmail(event.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField label={LanguageService.translate('doctorEmail')} style={{ width: '75%' }} onChange={(event) => setDoctorEmail(event.target.value)} />
                </div>
            </DialogContent>
            <DialogActions style={{'marginTop': '10px', 'marginRight': '10px' }}>
                <Button onClick={onDialogClose} color="primary">
                    {LanguageService.translate('cancelButton')}
                </Button>
                <Button onClick={onSubmit} autoFocus color="primary" disabled={doctorEmail.length === 0 || name.length === 0 || patientEmail.length === 0 || dateOfBirth.length === 0}>
                    {LanguageService.translate('confirmButton')}
                </Button>
            </DialogActions>
            <DialogContent>
                <DialogContentText>{ LanguageService.translate('emailDisclaimer') }</DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default EmailSummaryDialog;
