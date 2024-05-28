import axios from "axios";

export class GroupAPI {
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
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + "/api/group/getActiveGroupsByType?groupType=INTEREST_GROUP"
        return this.#getRequestLogic(url)
    }

    static async getAllTeams() {
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + "/api/group/getGroupsByType?groupType=INTEREST_GROUP"
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
            console.error('Ошибка при загрузке пользователей:', error)
            return [];
        }
    }

    static async createTeam(teamLead, creationDate, data) {

        const url = process.env.REACT_APP_BACKEND_URL_GROUP + `/api/group/create?teamLeadId=${teamLead}&creationDate=${encodeURIComponent(creationDate)}`
        await axios.post(url, data, {withCredentials: true})
        .catch( function(error) {
            console.error('Ошибка при отправке запроса:', error);
            alert(error.response.data)
        });
    }
    
    static async acceptMember(groupId, userId) {
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + `/api/group/accept?groupId=${groupId}&userId=${userId}`
        await axios.patch(url)
        .catch( function(error) {
            console.error('Ошибка при отправке запроса:', error);
            alert(error.response.data)
        });
    }

    static async excludeMember(groupId, userId) {
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + `/api/group/exclude?groupId=${groupId}&userId=${userId}`
        await axios.patch(url)
        .catch( function(error) {
            console.error('Ошибка при отправке запроса:', error);
            alert(error.response.data)
        });
    }

    static async updateTeam(groupId, dto, date) {
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + `/api/group/update?updatedDate=${date}&changedGroupId=${groupId}`
        await axios.patch(url, dto, {withCredentials: true})
        .catch( function(error) {
            console.error('Ошибка при отправке запроса:', error);
            alert(error.response.data)
        });

    }

    static async disbandTeam(id, reason, disbandmentDate) {
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + `/api/group/disband?groupId=${id}&disbandmentReason=${reason}&disbandmentDate=${disbandmentDate}`
        await axios.patch(url)
        .catch( function(error) {
            console.error('Ошибка при отправке запроса:', error.code);
            alert(error.response.data)
        });
    }
}