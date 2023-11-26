import classes from "./employees.module.css";
import dot from "../../icons/dot-icon.svg";
import React, {useEffect, useState} from "react";

const Mentorships = ({userId, mentorStatus}) => {

    const [state, setState] = useState({
        userId: userId,
        userMentorshipInfo: undefined
    })

    const [isLoading, setLoading] = useState(true)

    async function performGetRequest(url) {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Origin": "http://localhost:3000",
                },
            });

            if (response.ok) {
                return await response.json()

            } else {
                console.error("HTTP error:" + response.status + "\n" + response.statusText)
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect( () => {
        async function getMentor(id) {

            const url = process.env.REACT_APP_BACKEND_URL
                + "/api/mentorship/getMentorByMentee?menteeId=" + id

            const result = performGetRequest(url)
            setState(s => s.userMentorshipInfo = result)
        }

        async function getMentees(id) {

            const url = process.env.REACT_APP_BACKEND_URL
                + "/api/mentorship/getMenteesByMentor?mentorId=" + id

            const result = performGetRequest(url)
            setState(s => s.userMentorshipInfo = result)
        }

        if (mentorStatus === "MENTOR") {
            getMentees(userId)
        } else if (mentorStatus === "MENTEE") {
            getMentor(userId)
        }

        setLoading(false)

    }, [userId, mentorStatus])

    if (isLoading) {
        return (
            <div className={`${classes.mentorshipBlock}`}>
                <p className={`${classes.teamGroupsBlockHeading}`}>Загрузка...</p>
            </div>
        )
    }


    if (mentorStatus === "NOT_PARTICIPATING") {

        return (
            <div className={`${classes.mentorshipBlock}`}>
                <p className={`${classes.teamGroupsBlockHeading}`}>Менторство</p>
                <div className={`${classes.teamGroupsBlockInfo}`}>
                    <div className={`${classes.teamGroupsBlockInfoTitles}`}>
                        <p className={`${classes.classMentor}`}>
                            Не участвует
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    function renderMenteesList(menteeDtoList) {

        if (menteeDtoList === undefined || menteeDtoList.length === 0) {
            return (
                <li>
                    <div className={`${classes.menteeName}`}>Нет менти</div>
                </li>
            )
        }

        let renderedMenteeList = []

        menteeDtoList.sort((a, b) => a.name.localeCompare(b.name)).forEach((userDto) => {
            renderedMenteeList.push(
                <li>
                    <img src={dot} alt="dot" />
                    <div className={`${classes.menteeName}`}>{userDto.name}</div>
                </li>
            )
        })
        return renderedMenteeList
    }

    if (mentorStatus === "MENTOR") {

        return (
            <div className={`${classes.mentorshipBlock}`}>
                <p className={`${classes.teamGroupsBlockHeading}`}>Менторство</p>
                <div className={`${classes.teamGroupsBlockInfo}`}>
                    <div className={`${classes.teamGroupsBlockInfoTitles}`}>
                        <p>Роль:</p>
                        <p className={`${classes.classMentee}`}>Менти:</p>
                    </div>
                    <div className={`${classes.teamGroupsBlockInfoData}`}>
                        <div className={`${classes.roleMentee}`}>
                            Ментор
                        </div>
                        <ul className={`${classes.menteeList}`}>
                            {renderMenteesList(state.userMentorshipInfo)}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`${classes.mentorshipBlock}`}>
            <p className={`${classes.teamGroupsBlockHeading}`}>Менторство</p>
            <div className={`${classes.teamGroupsBlockInfo}`}>
                <div className={`${classes.teamGroupsBlockInfoTitles}`}>
                    <p>Роль:</p>
                    <p className={`${classes.classMentor}`}>
                        Ментор:
                    </p>
                </div>
                <div className={`${classes.teamGroupsBlockInfoData}`}>
                    <div className={`${classes.roleMentee}`}>
                        Менти
                    </div>
                    <div className={`${classes.mentorName}`}>
                        {state.userMentorshipInfo.name}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mentorships;