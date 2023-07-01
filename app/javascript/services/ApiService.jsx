import axios from "axios";

class ApiService {
    static get(url) {
        return axios.get(url, { headers: { Authorization: `Bearer ${this._fetchJwtToken()}` } })
    }

    static _fetchJwtToken () {
        return localStorage.getItem('token')
    }
}

export default ApiService
