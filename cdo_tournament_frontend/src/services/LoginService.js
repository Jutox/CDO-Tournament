import axios from 'axios';

const LOGIN_API_BASE_URL = "http://localhost:8080/auth";

class LoginService {

    login(user) {
        const url = `${LOGIN_API_BASE_URL}/auth`;
        return axios.post(url, user);
    }

    register(user) {
        const url = `${LOGIN_API_BASE_URL}/register`;
        return axios.post(url, user);
    }

    updateUser(userId, user) {
        const url = `${LOGIN_API_BASE_URL}/users/${userId}`;
        return axios.put(url, user);
    }
}

export default new LoginService();