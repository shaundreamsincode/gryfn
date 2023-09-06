import axios from "axios";

class ApiService {
    static login(params) {
        // fetch('/api/sessions', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json', "X-CSRF-Token": csrfToken },
        //     body: JSON.stringify({ email, password }),
        // })
        return axios.post('/api/sessions', params)
    }

    static getAccountSettings() {

    }

    static createIntakeAssessment(params) {
        return axios.post('/registrations', params)
    }

    static getIntakeAssessment(token) {
        return axios.get(`/api/intake_assessments/${token}.json`)
    }

    static getIntakeEideticQuestions(token) {
        return axios.get(`/api/intake_assessments/${token}/eidetic_questions`)
    }

    static upsertIntakeEideticQuestionResponse(question, answer) {
        return axios.put(`/api/intake_assessments/${question.assessment_token}/eidetic_questions/${question.token}`, { answer: answer })
    }

    static getIntakeAssessmentSummary(token) {
        return axios.get(`/api/intake_assessments/${token}/summary`)
    }

    static sendIntakeAssessmentSummaryEmail(token) {
        return axios.get(`/api/intake_assessments/${token}/send_summary_email`)
    }

    static getCurrentIntakeSpeechQuestion = (token) => {
        return axios.get(`/api/intake_assessments/${token}/current_speech_question`)
    }

    static getIntakeSpeechQuestions = (token) => {
        return axios.get(`/api/intake_assessments/${token}/speech_questions`)
    }

    static upsertSpeechQuestionResponse(question, wavFromBlob) {
        return axios.put(
            `/api/intake_assessments/${question.assessment_token}/speech_questions/${question.token}`,
            wavFromBlob,
            {
                headers: { "content-type": "audio/mpeg"}
        })
    }

    static resetSpeechQuestionResponse(question) {
        return axios.delete(`/api/intake_assessments/${question.assessment_token}/speech_questions/${question.token}`)
    }

    static getIntakePhoneticQuestions(token) {
        return axios.get(`/api/intake_assessments/${token}/phonetic_questions`)
    }

    static upsertIntakePhoneticQuestionResponse(question, answer) {
        return axios.put(`/api/intake_assessments/${question.assessment_token}/phonetic_questions/${question.token}`, { answer: answer })
    }

    // static upsertIntakePhoneticQuestionResponse(token, answer) {
    //     return axios.post(`/api/intake_phonetic_questions/${token}/upsert_response`, { answer: answer })
    // }

    // TODO ---- CHANGE THIS TO A POST
    static moveIntakeAssessmentToNextStep(token) {
        return axios.post(`/api/intake_assessments/${token}/move_to_next_step`)
    }

    static moveIntakeSpeechAssessmentToNextLevel(assessmentToken) {
        return axios.post(`/api/intake_assessments/${assessmentToken}/move_speech_assessment_to_next_level`)
    }
    // static get(url) {
    //     return axios.get(url, { headers: { Authorization: `Bearer ${this._fetchJwtToken()}` } })
    // }
    //
    // static post(url, data={}, headers={}) {
    //     const requestHeaders = { ...headers, ...{ Authorization: `Bearer ${this._fetchJwtToken()}` } }
    //     return axios.post(url, data, { headers: requestHeaders })
    // }
    //
    // static _fetchJwtToken () {
    //     return localStorage.getItem('token')
    // }
}

export default ApiService