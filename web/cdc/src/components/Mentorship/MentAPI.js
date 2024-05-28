import axios from "axios";

export class MentAPI {
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

    static async deletePair(id) {
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + `/api/mentorship/disbandMentorship?mentorshipId=${id}`
        await axios.delete(url, {withCredentials: true})
    }

    static async getPairs() {
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + "/api/mentorship/getAllMentorships"
        return this.#getRequestLogic(url)
    }

    static async getFreeMentors() {
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + "/api/mentorship/getFreeMentors"
        return this.#getRequestLogic(url)
    }

    static async getFreeMentees() {
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + "/api/mentorship/getFreeMentees"
        return this.#getRequestLogic(url)
    }

    static async becomeMentor(id) {
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + `/api/mentorship/becomeMentor?userId=${id}`
        await axios.patch(url)
        .catch( function(error) {
            console.error('Ошибка при отправке запроса:', error);
            alert(error.response.data)
        });
    }

    static async becomeMentee(id) {
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + `/api/mentorship/becomeMentee?userId=${id}`
        await axios.patch(url)
        .catch( function(error) {
            console.error('Ошибка при отправке запроса:', error);
            alert(error.response.data)
        });
    }

    static async removeFromProgram(id) {
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + `/api/mentorship/exitFromTheMentoringProgram?userId=${id}`
        await axios.patch(url)
        .catch( function(error) {
            console.error('Ошибка при отправке запроса:', error);
            alert(error.response.data)
        });
    }

    static async createPair(mentorId, menteeId, creationDate, disbandmentDate) {
        const url = process.env.REACT_APP_BACKEND_URL_GROUP + `/api/mentorship/create?mentorId=${mentorId}&menteeId=${menteeId}&creationDate=${encodeURIComponent(creationDate)}&disbandmentDate=${encodeURIComponent(disbandmentDate)}`
        await axios.post(url)
        .catch( function(error) {
            console.error('Ошибка при отправке запроса:', error);
            alert(error.response.data)
        });
    }
}