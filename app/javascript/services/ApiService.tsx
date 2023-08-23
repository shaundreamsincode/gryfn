import axios from "axios";

class ApiService {
    static createIntakeAssessment(params) {
        return axios.post('/registrations', params)
    }

    static getIntakeAssessment(intakeAssessmentToken) {
        return axios.get(`/api/intake_assessments/${intakeAssessmentToken}.json`)
    }

    static upsertIntakeQuestionResponse(intakeQuestionToken, answer) {
        return axios.post(`/api/intake_questions/${intakeQuestionToken}/upsert_response`, { answer: answer })
    }

    static getIntakeAssessmentSummary(intakeAssessmentToken) {
        return axios.get(`/api/intake_assessments/${intakeAssessmentToken}/summary.json`)
    }

    static sendIntakeAssessmentSummaryEmail(intakeAssessmentToken) {
        return axios.get(`/api/intake_assessments/${intakeAssessmentToken}/send_summary_email.json`)
    }

    static getIntakeSpeechQuestions = (intakeAssessmentToken) => {
        return axios.get(`/api/intake_assessments/${intakeAssessmentToken}/speech_questions.json`)
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