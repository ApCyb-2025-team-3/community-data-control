import classes from './employees.module.css';
import arrow from '../../icons/down-arrow-icon.svg';
import dot from '../../icons/dot-icon.svg';
import React, {useEffect, useState} from "react";
import Popup from "reactjs-popup";
import Groups from "./groups";
import Mentorships from "./mentorships";
import {localiseGrade, localiseRole} from "./localise";

const MainInfo = ({userId}) => {

    const [state, setState] = useState({
        userId: userId,
        userInfo: undefined,
        isGroupsVisible: false,
        isMentorshipVisible: false,
    })

    const [isLoading, setLoading] = useState(true)

    useEffect( () => {
        async function getUserInfo() {
            try {
                const url = process.env.REACT_APP_BACKEND_URL
                    + "/api/user/" + state.userId + "/fullInfo"
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Origin": "http://localhost:3000",
                    },
                });

                if (response.ok) {
                    const userInfo = await response.json()

                    setState({
                        userId: state.userId,
                        userInfo: userInfo,
                        isGroupsVisible: false,
                        isMentorshipVisible: false,
                    })

                    setLoading(false)

                } else {
                    console.error("HTTP error:" + response.status + "\n" + response.statusText)
                }

            } catch (error) {
                console.error(error)
            }
        }

        getUserInfo()
    }, [state.userId])

    function handleGroupsVisibilityChange() {
        setState({
            userId: state.userId,
            userInfo: state.userInfo,
            isGroupsVisible: !state.isGroupsVisible,
            isMentorshipVisible: state.isMentorshipVisible,
        })
    }

    function handleMentorshipsVisibilityChange() {
        setState({
            userId: state.userId,
            userInfo: state.userInfo,
            isGroupsVisible: state.isGroupsVisible,
            isMentorshipVisible: !state.isMentorshipVisible,
        })
    }

    async function handleUserDismissal(reason) {

        try {

            const url = process.env.REACT_APP_BACKEND_URL
                + "/api/user/" + state.userId + "/dismiss?description=" + encodeURIComponent(reason)
            console.log(url)
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Origin": "http://localhost:3000",
                },
            });

            if (response.ok) {
                const newUserInfo = state.userInfo
                newUserInfo.isActive = false
                newUserInfo.dismissReason = reason
                setState({
                    userId: state.userId,
                    userInfo: newUserInfo,
                    isGroupsVisible: state.isGroupsVisible,
                    isMentorshipVisible: state.isMentorshipVisible,
                })

            } else {
                console.error("HTTP error:" + response.status + "\n" + response.statusText)
            }

        } catch (error) {
            console.error(error)
        }
    }

    function renderUserActiveness() {

        const isActive = state.userInfo.isActive
        const dismissDate = state.userInfo.dismissedAt !== null ? state.userInfo.dismissedAt : "10"

        return (
            <div className={`${classes.mainBlockRPart}`}>
                <div className={`${classes.rPartInfo}`}>
                    <div className={`${classes.rPartInfoActivity}`}>
                        <p>Активность:</p>
                        <div className={`${classes.activityStatus}`}
                             style={{background: isActive ? `#00CA4E` : `#FF605C`}}/>
                    </div>
                    <div className={`${classes.rPartInfoConnected}`}>
                        <p>Присоединился:</p>
                        <div className={`${classes.connectedDate}`}>{formatLocalDate(state.userInfo.invitedAt)}</div>
                    </div>
                    <div className={`${classes.rPartInfoFired}`} style={{display: isActive ? "none" : ""}}>
                        <p>Уволен:</p>
                        <div className={`${classes.firedDate}`} >{formatLocalDate(dismissDate)}</div>
                    </div>
                    <div className={`${classes.rPartInfoReason}`} style={{display: isActive ? "none" : ""}}>
                        <p>Причина:</p>
                        <div className={`${classes.reason}`} >{state.userInfo.dismissReason}</div>
                    </div>
                </div>
                <div className={`${classes.rPartButtons}`}>
                    <button className={`${classes.buttonTeamsGroups}`}
                            onClick={handleGroupsVisibilityChange}>
                        <img src={arrow} alt="arrow" />
                        <p>Команды / Группы</p>
                    </button>
                    <button className={`${classes.buttonMentorship}`}
                            onClick={handleMentorshipsVisibilityChange}>
                        <img src={arrow} alt="arrow" />
                        <p>Менторство</p>
                    </button>
                    <button className={`${classes.buttonEdit}`} style={{ display: isActive ? "" : "none" }}>
                        Внести изменения
                    </button>
                    <Popup trigger=
                               {<button className={`${classes.buttonEdit}`} style={{ display: isActive ? "" : "none" }}>
                                   Уволить
                               </button>}
                           modal nested>
                        {
                            close => (
                                <div className={`${classes.popUpMask}`}>
                                    <div className={`${classes.popUp}`}>
                                        <div className={`${classes.popUpContent}`}>
                                            Введите причину увольнения
                                            <form action="">
                                                <input id={"dismissalReason"} placeholder="Причина"/>
                                            </form>
                                            <div className={`${classes.popUpButtons}`}>
                                                <button onClick={(event) => {
                                                    handleUserDismissal(
                                                        document.getElementById("dismissalReason").value
                                                    )
                                                    close()
                                                }}>
                                                    Подтвердить
                                                </button>
                                                <button onClick=
                                                            {() => close()}>
                                                    Отменить
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </Popup>
                </div>
            </div>
        )
    }

    function renderGroupsAndMentorships() {

        let visibleBlocks = []

        if (state.isGroupsVisible) {
            visibleBlocks.push(
                <Groups></Groups>
            )
        }

        if (state.isMentorshipVisible) {
            visibleBlocks.push(
                <Mentorships></Mentorships>
            )
        }

        return visibleBlocks
    }

    function formatLocalDate(date) {
        return date.split("-").reverse().join(".")
    }

    function renderProductOwners(productOwnersList) {

        if (productOwnersList.length === 0) {
            return (
                <li>
                    <div className={`${classes.liProdOwnersName}`}>Не указаны</div>
                </li>
            )
        }

        const productOwners = []

        productOwnersList.sort((a, b) => a.value.localeCompare(b.value)).forEach(
            (user) => {
                productOwners.push(
                    <li>
                        <img src={dot} alt="dot"/>
                        <div
                            className={`${classes.liProdOwnersName}`}>{user.value}</div>
                    </li>
                )
            }
        )

        return productOwners
    }

    if (isLoading) {

        return (
            <div className={`${classes.infoBlocks}`}>
                <div className={`${classes.mainBlock}`}>
                    <p style={{width: 400 + 'px', height: 400 + 'px'}}>Загрузка...</p>
                </div>
            </div>
        )
    }

    const projectChangeDate = state.userInfo.projectChangedAt !== null
        ? state.userInfo.projectChangedAt : state.userInfo.invitedAt

    return (
        <div className={`${classes.infoBlocks}`}>
            <div className={`${classes.mainBlock}`}>
                <div className={`${classes.mainBlockLPart}`}>
                    <div className={`${classes.lPartHeading}`}>
                        <p>Сотрудник:</p>
                        <div className={`${classes.lPartHeadingName}`}>{state.userInfo.name}</div>
                    </div>
                    <div className={`${classes.lPartInfo}`}>
                        <div className={`${classes.lPartInfoCol1Title}`}>
                            <p>Email:</p>
                            <p>Телефон:</p>
                            <p>Дата рождения:</p>
                            <p>Отдел:</p>
                            <p>Позиция:</p>
                            <p>Роль:</p>
                        </div>
                        <div className={`${classes.lPartInfoCol1Data}`}>
                            <div className={`${classes.lPartInfoCol1DataEmail}`}>{state.userInfo.email}</div>
                            <div className={`${classes.lPartInfoCol1Project}`}>
                                {state.userInfo.phoneNumber}
                            </div>
                            <div className={`${classes.lPartInfoCol2DataDoB}`}>{formatLocalDate(state.userInfo.dob)}</div>
                            <div className={`${classes.lPartInfoCol1DataDep}`}>{state.userInfo.department}</div>
                            <div className={`${classes.lPartInfoCol1DataGrade}`}>{localiseGrade(state.userInfo.grade)}</div>
                            <div className={`${classes.lPartInfoCol1DataRole}`}>{localiseRole(state.userInfo.role)}</div>
                        </div>
                        <div className={`${classes.lPartInfoCol2Title}`}>
                            <p>Проект:</p>
                            <p>Назначен:</p>
                            <p>Руководитель:</p>
                            <div className={`${classes.lPartInfoCol2TitlePrOwn}`}>Product<br></br>Owners:</div>
                        </div>
                        <div className={`${classes.lPartInfoCol2Data}`}>
                            <div className={`${classes.lPartInfoCol2DataPhoneNum}`}>
                                {state.userInfo.project !== null ? state.userInfo.project : "Нет"}
                            </div>
                            <div className={`${classes.lPartInfoCol2DataSeprvisor}`}>{formatLocalDate(projectChangeDate)}</div>
                            <div className={`${classes.lPartInfoCol2DataConnected}`}>
                                {state.userInfo.supervisor !== null ? state.userInfo.supervisor.value : "Не назначен"}
                            </div>
                            <ul className={`${classes.lPartInfoCol2DataProdOwners}`}>
                                {renderProductOwners(state.userInfo.productOwners)}
                            </ul>
                        </div>
                    </div>
                </div>
                {renderUserActiveness()}
            </div>
            <div className={`${classes.lowerBlocks}`}>
                {renderGroupsAndMentorships()}
            </div>
        </div>
    )
}

export default MainInfo;