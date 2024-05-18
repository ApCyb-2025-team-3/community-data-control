import axios from "axios"


const clientId = 'Ov23ctQnsqB3lpRUyEJf';
const clientSecret = '902ad4e7133fd188e0420d54fb45b52de8a34648';
const tokenUrl = 'http://localhost:5002/login/oauth2/code/github';


export class UserAPI {


    
    static async getAccessToken() {
        try {
            const response = await axios.post(tokenUrl, {
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret
            });
            return response.data.access_token;
        } catch (error) {
            console.error('Error fetching access token', error);
            throw error;
        }
    }
    accessToken;


    static async initialize() {
        this.accessToken = await this.getAccessToken();

        axios.interceptors.request.use(
            config => {
                config.headers.Authorization = `Bearer ${this.accessToken}`;
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        axios.interceptors.response.use(
            response => response,
            async error => {
                if (error.response.status === 401 && !error.config._retry) {
                    error.config._retry = true;
                    this.accessToken = await this.getAccessToken();
                    axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
                    return axios(error.config);
                }
                return Promise.reject(error);
            }
        );
    }


    static async #getRequestLogic(url) {
        const result = await axios.get(url, { withCredentials: true})
            .catch(function (error) {
                if (error.response) {
                    console.log(error)
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    return error.response.status
                }
                else {
                    console.log(error)
                }
            });
            if (result?.request.responseURL !== url) {
                    localStorage.clear()
                    document.location = result.request.responseURL;
                    console.log(result)
                    window.location.href = result.request?.responseURL 
                } 
            return result.data
    }

    static async getUserByRole(role) {
        const url = process.env.REACT_APP_BACKEND_URL
            + "/api/user/getUsersByRole?role=" + encodeURIComponent(role)
        return this.#getRequestLogic(url)
    } 

    static async getFullInfo(userId) {
        const url = process.env.REACT_APP_BACKEND_URL
        + "/api/user/" + userId + "/fullInfo";
        return this.#getRequestLogic(url)
    } 

    static async getAuthUser() {
        const url = process.env.REACT_APP_BACKEND_URL + '/api/auth/getAuthUser';
        return this.#getRequestLogic(url)
    } 

    static async getUserByGrade(grade) {
        const url = process.env.REACT_APP_BACKEND_URL
            + "/api/user/getUsersByGrade?grade=" + encodeURIComponent(grade)
        return this.#getRequestLogic(url)
    } 

    static async getDismissedUsers() {
        const url = process.env.REACT_APP_BACKEND_URL + "/api/user/getDismissedUsers"
        return this.#getRequestLogic(url)
    } 

    static async getUsersByName(name) {
        const url = process.env.REACT_APP_BACKEND_URL
        + "/api/user/getUsersByPartialName?partialName=" + encodeURIComponent(name)
        return this.#getRequestLogic(url)
    } 

    static async getUsersByProject(project) {
        const url = process.env.REACT_APP_BACKEND_URL + "/api/user/getUsersByProject?project=" + encodeURIComponent(project)
        return this.#getRequestLogic(url)
    }

    static async getUsersByDepartment(department) {
        const url = process.env.REACT_APP_BACKEND_URL
            + "/api/user/getUsersByDepartment?department=" + encodeURIComponent(department)
        return this.#getRequestLogic(url)
    }

    static async getUsersBySupervisorName(name) {
        const url = process.env.REACT_APP_BACKEND_URL
            + "/api/user/getUsersBySupervisor?partialName=" + encodeURIComponent(name)
        return this.#getRequestLogic(url)
    }

    static async changePersonalDataRequest(userDto, reason) {
        await this.initialize()
        try {
            const url = process.env.REACT_APP_BACKEND_URL + "/api/user/changeUsersPersonalData?reason=" + reason
            const response = await axios.post(url, userDto)
            if (response.status !== 200) alert("Failed to change user's personal data")
            return response.status
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }
    
    static async changeUserGradeRequest(newGrade, reason, userId) {
        await this.initialize()
        try {
            const url = process.env.REACT_APP_BACKEND_URL + `/api/user/${userId}/changeGrade?grade=${newGrade}&reason=${reason}`
            const response = await axios.post(url)
            if (response.status !== 200) alert("Failed to change user's grade")
            return response.status;
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }
    
    static async changeUserRoleRequest(newRole, reason, userId) {
        await this.initialize()
        try {
            const url = process.env.REACT_APP_BACKEND_URL + `/api/user/${encodeURIComponent(userId)}/changeRole?role=${encodeURIComponent(newRole)}&reason=${encodeURIComponent(reason)}`
            const response = await axios.post(url)
            if (response.status !== 200) alert("Failed to change user's role")
            return response.status;
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }
    
    static async changeProjectData(newData) {
        await this.initialize()
        try {
            const url = process.env.REACT_APP_BACKEND_URL + '/api/user/changeUserProject'
            const response = await axios.post(url, newData)
            if (response.status !== 200) alert("Failed to change user's project data")
            return response.status;
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }

    static async addUserRequest(data) {
        await this.initialize()

        const url = process.env.REACT_APP_BACKEND_URL + "/api/user/add"
        const response = await axios.post(url, data, { withCredentials: true })
        .catch(function (error) {
            console.error('Ошибка при отправке запроса:', error)
        });
        return response
    }
}