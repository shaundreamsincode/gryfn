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
    const [birthday, setBirthday] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);

    const { open, closeDialog, dialogConfirmation } = props;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const onDoctorEmailChange = (newEmail) => {
        setDoctorEmail(newEmail);
        setIsInvalid(false);
    };

    const onDialogClose = () => {
        setIsInvalid(false);
        closeDialog();
    };

    const onSubmit = () => {
        setIsInvalid(false);
        const emailIsValid = emailRegex.test(doctorEmail);

        if (emailIsValid) {
            dialogConfirmation({
                doctorEmail: doctorEmail,
                name: name,
                birthday: birthday,
                patientEmail: patientEmail
            });
        } else {
            setIsInvalid(true);
        }
    };

    return (
        <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>{LanguageService.translate('sendSummaryTitle')}</DialogTitle>
            <DialogContent>
                <DialogContentText>{LanguageService.translate('emailSummaryInstructions')}</DialogContentText>
                {isInvalid && (
                    <DialogContentText variant="caption" align="center" style={{ color: 'red' }}>
                        {LanguageService.translate('emailIsInvalidError')}
                    </DialogContentText>
                )}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField label={LanguageService.translate('name')} style={{ width: '75%' }} onChange={(event) => setName(event.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField label={ LanguageService.translate('birthday') } style={{ width: '75%' }} onChange={(event) => setBirthday(event.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField label={LanguageService.translate('yourEmail')} style={{ width: '75%' }} onChange={(event) => setPatientEmail(event.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField label={LanguageService.translate('doctorEmail')} style={{ width: '75%' }} onChange={(event) => onDoctorEmailChange(event.target.value)} />
                </div>
            </DialogContent>
            <DialogActions style={{'marginTop': '10px', 'marginRight': '10px' }}>
                <Button onClick={onDialogClose} color="primary">
                    {LanguageService.translate('cancelButton')}
                </Button>
                <Button onClick={onSubmit} autoFocus color="primary" disabled={doctorEmail.length === 0 || name.length === 0 || patientEmail.length === 0 || birthday.length === 0}>
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
