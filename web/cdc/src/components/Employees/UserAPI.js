import axios from "axios"

export class UserAPI {

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
        
        try {
            const url = process.env.REACT_APP_BACKEND_URL + "/api/user/changeUsersPersonalData?reason=" + reason
            const response = await axios.post(url, userDto, { withCredentials: true })
            if (response.status !== 200) alert("Failed to change user's personal data")
            return response.status
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }
    
    static async changeUserGradeRequest(newGrade, reason, userId) {
        
        try {
            const url = process.env.REACT_APP_BACKEND_URL + `/api/user/${encodeURIComponent(userId)}/changeGrade?grade=${encodeURIComponent(newGrade)}&reason=${encodeURIComponent(reason)}`
            const response = await axios.post(url, "", { withCredentials: true })
            if (response.status !== 200) alert("Failed to change user's grade")
            return response.status;
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }
    
    static async changeUserRoleRequest(newRole, reason, userId) {
        
        try {
            const url = process.env.REACT_APP_BACKEND_URL + `/api/user/${encodeURIComponent(userId)}/changeRole?role=${encodeURIComponent(newRole)}&reason=${encodeURIComponent(reason)}`
            const response = await axios.post(url, "", { withCredentials: true })
            if (response.status !== 200) alert("Failed to change user's role")
            return response.status;
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }
    
    static async changeProjectData(newData) {
        
        try {
            const url = process.env.REACT_APP_BACKEND_URL + '/api/user/changeUserProject'
            const response = await axios.post(url, newData, { withCredentials: true })
            if (response.status !== 200) alert("Failed to change user's project data")
            return response.status;
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }

    static async dismissUser(userId, dismissedAt, reason) {
        
        try {
            const url = process.env.REACT_APP_BACKEND_URL + "/api/user/" + userId
                + "/dismiss?date=" + dismissedAt
                + "&description=" + encodeURIComponent(reason)
            const response = await axios.post(url, "", { withCredentials: true })
            if (response.status !== 200) alert("Failed to dismiss user")
            return response;
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }

    static async addUserRequest(data) {
        

        const url = process.env.REACT_APP_BACKEND_URL + "/api/user/add"
        const response = await axios.post(url, data, { withCredentials: true })
        .catch(function (error) {
            console.error('Ошибка при отправке запроса:', error)
        });
        return response
    }
}