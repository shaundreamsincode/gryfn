import axios from "axios";

class IntakeService {
    constructor() {
        this._beforeEach();
    }

    _beforeEach() {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('[name=csrf-token]').content;
    }

    registerPatient(assessmentToken, params) {
        return axios.post(`/unauthenticated/intake_assessments/${assessmentToken}/registrations`, params);
    }

    getIntakeAssessment(token) {
        return axios.get(`/unauthenticated/intake_assessments/${token}.json`);
    }

    practiceSpeechQuestions(token, wavFromBlob) {
        return axios.post(
            `/unauthenticated/intake_assessments/${token}/practice_speech_questions`,
            wavFromBlob,
            {
                headers: { "content-type": "audio/mpeg" }
            }
        );
    }

    getIntakeEideticQuestions(token) {
        return axios.get(`/unauthenticated/intake_assessments/${token}/eidetic_questions`);
    }

    upsertIntakeEideticQuestionResponse(question, answer) {
        return axios.put(`/unauthenticated/intake_assessments/${question.assessment_token}/eidetic_questions/${question.token}`, { answer: answer });
    }

    getIntakeAssessmentSummary(token) {
        return axios.get(`/unauthenticated/intake_assessments/${token}/summary`);
    }

    sendIntakeAssessmentSummaryEmail(token) {
        return axios.get(`/unauthenticated/intake_assessments/${token}/send_summary_email`);
    }

    getCurrentIntakeSpeechQuestion(token) {
        return axios.get(`/unauthenticated/intake_assessments/${token}/current_speech_question`);
    }

    getIntakeSpeechQuestions(token) {
        return axios.get(`/unauthenticated/intake_assessments/${token}/speech_questions`);
    }

    upsertSpeechQuestionResponse(question, wavFromBlob) {
        return axios.put(
            `/unauthenticated/intake_assessments/${question.assessment_token}/speech_questions/${question.token}`,
            wavFromBlob,
            {
                headers: { "content-type": "audio/mpeg" }
            }
        );
    }

    resetSpeechQuestionResponse(question) {
        return axios.delete(`/unauthenticated/intake_assessments/${question.assessment_token}/speech_questions/${question.token}`);
    }

    getIntakePhoneticQuestions(token) {
        return axios.get(`/unauthenticated/intake_assessments/${token}/phonetic_questions`);
    }

    upsertIntakePhoneticQuestionResponse(question, answer) {
        return axios.put(`/unauthenticated/intake_assessments/${question.assessment_token}/phonetic_questions/${question.token}`, { answer: answer });
    }

    // TODO ---- CHANGE THIS TO A POST
    moveIntakeAssessmentToNextStep(token) {
        return axios.post(`/unauthenticated/intake_assessments/${token}/move_to_next_step`);
    }

    moveIntakeSpeechAssessmentToNextLevel(assessmentToken) {
        return axios.post(`/unauthenticated/intake_assessments/${assessmentToken}/move_speech_assessment_to_next_level`);
    }
}

export default new IntakeService();
