import axios from "axios";

class ApiService {
    static createIntakeAssessment(params) {
        return axios.post('/registrations', params)
    }

    static getIntakeAssessment(token) {
        return axios.get(`/api/intake_assessments/${token}.json`)
    }

    static upsertIntakeQuestionResponse(token, answer) {
        return axios.post(`/api/intake_spelling_questions/${token}/upsert_response`, { answer: answer })
    }

    static getIntakeAssessmentSummary(token) {
        return axios.get(`/api/intake_assessments/${token}/summary.json`)
    }

    static sendIntakeAssessmentSummaryEmail(token) {
        return axios.get(`/api/intake_assessments/${token}/send_summary_email.json`)
    }

    static getIntakeSpeechQuestions = (token) => {
        return axios.get(`/api/intake_assessments/${token}/speech_questions`)
    }

    static upsertSpeechQuestionResponse(token, answer) {
        return axios.post(
            `/api/intake_speech_questions/${token}/upsert_response`,
            { answer: answer },
            {
                headers: { "content-type": "audio/mpeg"}
            }
        )
    }

    static resetSpeechQuestionResponse(token) {
        return axios.post(`/api/intake_speech_questions/${token}/reset_response`)
    }

    static moveIntakeAssessmentToNextStep(token) {
        return axios.get(`/api/intake_assessments/${token}/move_to_next_step`)
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