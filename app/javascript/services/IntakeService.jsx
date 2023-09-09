import axios from "axios";

class IntakeService {

    static createIntakeAssessment(params) {
        return axios.post('/registrations', params)
    }

    static getIntakeAssessment(token) {
        return axios.get(`/unauthenticated/intake_assessments/${token}.json`)
    }

    static practiceSpeechQuestions(token, wavFromBlob) {
        return axios.post(
            `/unauthenticated/intake_assessments/${token}/practice_speech_questions`,
            wavFromBlob,
            {
                headers: { "content-type": "audio/mpeg"}
            }
        )
    }

    static getIntakeEideticQuestions(token) {
        return axios.get(`/unauthenticated/intake_assessments/${token}/eidetic_questions`)
    }

    static upsertIntakeEideticQuestionResponse(question, answer) {
        return axios.put(`/unauthenticated/intake_assessments/${question.assessment_token}/eidetic_questions/${question.token}`, { answer: answer })
    }

    static getIntakeAssessmentSummary(token) {
        return axios.get(`/unauthenticated/intake_assessments/${token}/summary`)
    }

    static sendIntakeAssessmentSummaryEmail(token) {
        return axios.get(`/unauthenticated/intake_assessments/${token}/send_summary_email`)
    }

    static getCurrentIntakeSpeechQuestion = (token) => {
        return axios.get(`/unauthenticated/intake_assessments/${token}/current_speech_question`)
    }

    static getIntakeSpeechQuestions = (token) => {
        return axios.get(`/unauthenticated/intake_assessments/${token}/speech_questions`)
    }

    static upsertSpeechQuestionResponse(question, wavFromBlob) {
        return axios.put(
            `/unauthenticated/intake_assessments/${question.assessment_token}/speech_questions/${question.token}`,
            wavFromBlob,
            {
                headers: { "content-type": "audio/mpeg"}
            })
    }

    static resetSpeechQuestionResponse(question) {
        return axios.delete(`/unauthenticated/intake_assessments/${question.assessment_token}/speech_questions/${question.token}`)
    }

    static getIntakePhoneticQuestions(token) {
        return axios.get(`/unauthenticated/intake_assessments/${token}/phonetic_questions`)
    }

    static upsertIntakePhoneticQuestionResponse(question, answer) {
        return axios.put(`/unauthenticated/intake_assessments/${question.assessment_token}/phonetic_questions/${question.token}`, { answer: answer })
    }

    // TODO ---- CHANGE THIS TO A POST
    static moveIntakeAssessmentToNextStep(token) {
        return axios.post(`/unauthenticated/intake_assessments/${token}/move_to_next_step`)
    }

    static moveIntakeSpeechAssessmentToNextLevel(assessmentToken) {
        return axios.post(`/unauthenticated/intake_assessments/${assessmentToken}/move_speech_assessment_to_next_level`)
    }
}

export default IntakeService