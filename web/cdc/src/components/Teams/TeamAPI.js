import axios from "axios";

export class TeamAPI {
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

    static async getActiveTeams() {
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + "/api/group/getActiveGroupsByType?groupType=WORKING_TEAM"
        return this.#getRequestLogic(url)
    }

    static async getAllTeams() {
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + "/api/group/getGroupsByType?groupType=WORKING_TEAM"
        return this.#getRequestLogic(url)
    }

    static async getActiveMembers(id) {
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + "/api/group/getActiveMembers?groupId=" + encodeURIComponent(id)
        return this.#getRequestLogic(url)
    }

    static async getTeamByName(name) {
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + "/api/group/getGroupsByPartialName?partialName=" + encodeURIComponent(name)
        return this.#getRequestLogic(url)
    }

    static async getTeamleads() {
        try {
            const url = process.env.REACT_APP_BACKEND_URL + "/api/user/getUsersByRole?role=Team Lead"
            return this.#getRequestLogic(url)
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
            return [];
        }
    }

    static async createTeam(teamLead, creationDate, data) {

        const url = process.env.REACT_APP_BACKEND_URL_GROUP + `/api/group/create?teamLeadId=${teamLead}&creationDate=${encodeURIComponent(creationDate)}`
        await axios.post(url, data, {withCredentials: true})
        .catch( function(error) {
            console.error('Ошибка при отправке запроса:', error)
        });
    }
}