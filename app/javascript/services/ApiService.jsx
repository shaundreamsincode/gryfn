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

    ///// TODO - pull back into API
    static cancelIntakeAssessment(token) {
        // const jwtToken = localStorage.getItem('jwtToken')
        return axios.post(`/api/intake_assessments/${token}/cancel`)
        // return axios.post(`/api/current_account_create_intake_assessment`,  data, { headers: { Authorization: `Bearer ${jwtToken}` } })
    }

    static createIntakeAssessmentForCurrentAccount(data) {
        const jwtToken = localStorage.getItem('jwtToken')
        return axios.post(`/api/current_account_create_intake_assessment`,  data, { headers: { Authorization: `Bearer ${jwtToken}` } })
    }

    static getCurrentAccountIntakeAssessments() {
        const jwtToken = localStorage.getItem('jwtToken')
        return axios.get(`/api/current_account_intake_assessments`,  { headers: { Authorization: `Bearer ${jwtToken}` } })
    }

    static getCurrentAccount() {
        const jwtToken = localStorage.getItem('jwtToken')
        return axios.get(`/api/current_account`,  { headers: { Authorization: `Bearer ${jwtToken}` } })
    }

    static updateCurrentAccountBasicInfo(data) {
        const jwtToken = localStorage.getItem('jwtToken')
        return axios.put(`/api/current_account_basic_info`,data, { headers: { Authorization: `Bearer ${jwtToken}` } })
    }

    static updateCurrentAccountPassword(data) {
        const jwtToken = localStorage.getItem('jwtToken')
        return axios.put(`/api/current_account_password`,data, { headers: { Authorization: `Bearer ${jwtToken}` } })
    }
}

export default ApiService
