import classes from "./employees.module.css";
import dot from "../../icons/dot-icon.svg";
import React, {useEffect, useState} from "react";

const Groups = ({userId}) => {

    const [groupListState, setGroupListState] = useState([])

    const [workingGroupState, setWorkingGroupState] = useState({
        groupName: "",
        teamLeadName: "",
    })

    const [isWorkingGroupLoading, setWorkingGroupLoading] = useState(true)
    const [isGroupListLoading, setGroupListLoading] = useState(true)

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

    // useEffect(() => {
    //     async function getUserWorkingGroup() {
    //
    //         const url = process.env.REACT_APP_BACKEND_URL
    //             + "/api/group/getUserGroupsByType?userId=" + encodeURIComponent(userId) +
    //             "&groupType=" + encodeURIComponent("WORKING_TEAM")
    //
    //         const groupList = await performGetRequest(url);
    //
    //         if (groupList === undefined || groupList.length === 0) {
    //             setWorkingGroupState({
    //                 groupName: "Нет",
    //                 teamLeadName: "Не указан"
    //             })
    //             return
    //         }
    //
    //         const getTeamLeadNameUrl = process.env.REACT_APP_BACKEND_URL
    //             + "/api/" + encodeURIComponent(userId)
    //
    //         const teamLead = await performGetRequest(getTeamLeadNameUrl)
    //
    //         setWorkingGroupState({
    //             groupName: groupList[0].name,
    //             teamLeadName: teamLead.name,
    //         })
    //     }
    //
    //     getUserWorkingGroup()
    //     setWorkingGroupLoading(false)
    //
    // }, [userId, workingGroupState, setWorkingGroupLoading])
    //
    // useEffect( () => {
    //
    //     async function getUserGroupList() {
    //
    //         const url = process.env.REACT_APP_BACKEND_URL
    //             + "/api/group/getUserGroups?userId=" + encodeURIComponent(userId)
    //
    //         const groupList = await performGetRequest(url);
    //
    //         setGroupListState(groupList)
    //     }
    //
    //     getUserGroupList()
    //     setGroupListLoading(false)
    // }, [userId, groupListState, setGroupListLoading])

    if (isGroupListLoading || isWorkingGroupLoading) {

        return (
            <div className={`${classes.teamGroupsBlock}`}>
                <div className={`${classes.teamGroupsBlockTitles}`}>
                    <div>Загрузка...</div>
                </div>
            </div>
        )
    }

    function renderGroupList(groupDtoList) {

        const renderedGroupList = []

        if (groupDtoList === undefined || groupDtoList.length === 0) {
            return (
                <div className={`${classes.dataGroupsName}`}>Нет групп</div>
            )
        }

        groupDtoList.sort((a, b) => a.name.localeCompare(b.name)).forEach((groupDto) => {
            renderedGroupList.push(
                <li>
                    <img src={dot} alt="dot"/>
                    <div
                        className={`${classes.dataGroupsName}`}>{groupDto.name}</div>
                </li>
            )
        })

        return renderedGroupList
    }

    return (
        <div className={`${classes.teamGroupsBlock}`}>
            <div className={`${classes.teamGroupsBlockTitles}`}>
                <p>Команда:</p>
                <div>Лидер:</div>
                <p>Группы:</p>
            </div>
            <div className={`${classes.teamGroupsBlockData}`}>
                <div className={`${classes.teamGroupsBlockDataTeam}`}>{workingGroupState.groupName}</div>
                <div className={`${classes.teamGroupsBlockDataLeader}`}>{workingGroupState.teamLeadName}</div>
                <ul className={`${classes.teamGroupsBlockDataGroups}`}>
                    {renderGroupList(groupListState)}
                </ul>
            </div>
        </div>
    )
}

export default Groups;