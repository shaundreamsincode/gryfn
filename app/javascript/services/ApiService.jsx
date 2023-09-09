import axios from "axios";

class ApiService {
    constructor() {
        this._beforeEach();
    }

    _beforeEach() {
        const jwtToken = localStorage.getItem('jwtToken')
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
    }

    login(params) {
        return axios.post('/api/sessions', params)
    }

    getIntakeAssessment(token) {
        return axios.get(`/api/intake_assessments/${token}.json`);
    }

    cancelIntakeAssessment(token) {
        return axios.post(`/api/intake_assessments/${token}/cancel`)
    }

    createIntakeAssessmentForCurrentAccount(data) {
        return axios.post(`/api/current_account_create_intake_assessment`,  data)
    }

    getCurrentAccountIntakeAssessments() {
        return axios.get(`/api/current_account_intake_assessments`)
    }

    getCurrentAccount() {
        return axios.get(`/api/current_account`)
    }

    updateCurrentAccountBasicInfo(data) {
        return axios.put(`/api/current_account_basic_info`,data)
    }

    updateCurrentAccountPassword(data) {
        return axios.put(`/api/current_account_password`,data)
    }
}

export default new ApiService()
