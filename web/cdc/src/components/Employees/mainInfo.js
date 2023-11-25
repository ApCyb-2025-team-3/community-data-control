import classes from './employees.module.css';
import arrow from '../../icons/down-arrow-icon.svg';
import dot from '../../icons/dot-icon.svg';
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Groups from "./groups";
import Mentorships from "./mentorships";
import { localiseGrade, localiseRole } from "./localise";

const MainInfo = ({ userId }) => {

    const [state, setState] = useState({
        userId: userId,
        userInfo: undefined,
        oldUserInfo: undefined,
        isGroupsVisible: false,
        isMentorshipVisible: false,
        isChanging: false
    })
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
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
                        oldUserInfo: { ...userInfo },
                        isGroupsVisible: false,
                        isMentorshipVisible: false,
                        isChanging: false
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
            ...state,
            isGroupsVisible: !state.isGroupsVisible,
        })
    }

    function handleMentorshipsVisibilityChange() {
        setState({
            ...state,
            isMentorshipVisible: !state.isMentorshipVisible,
        })
    }


    //TODO 400 (BadRequest)
    async function changePersonalDataRequest(userDto, reason) {
        try {
            const url = process.env.REACT_APP_BACKEND_URL + "/api/user/changeUsersPersonalData"
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:3000'
                },
                body: JSON.stringify({
                    reason: reason,
                    modifiedData: userDto
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка запроса');
            }

            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }
    async function changeUserGradeRequest(newGrade, reason) {
        try {
            const url = process.env.REACT_APP_BACKEND_URL + `/api/user/${state.userId}/changeGrade?grade=${newGrade}&reason=${reason}`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:3000'
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка запроса');
            }

            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }
    //TODO 500 (Internal Server Error)
    async function changeUserRoleRequest(newRole, reason) {
        try {
            const url = process.env.REACT_APP_BACKEND_URL + `/api/user/${state.userId}/changeRole?role=${newRole}&reason=${reason}`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:3000'
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка запроса');
            }

            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }

    async function changeProjectData(newData) {
        try {
            const url = process.env.REACT_APP_BACKEND_URL + `/api/user/changeUserProject`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:3000'
                },
                body: JSON.stringify(newData)
            });

            if (!response.ok) {
                throw new Error('Ошибка запроса');
            }

            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }

    function changeUserInfo(reason) {

            let userDTO = {
                userId: state.userId,
                name: state.userInfo.name,
                dob: state.userInfo.dob,
                email: state.userInfo.email,
                phoneNumber: state.userInfo.phoneNumber
            }
            let oldPD = {
                id: state.userId,
                name: state.oldUserInfo.name,
                dob: state.oldUserInfo.dob,
                email: state.oldUserInfo.email,
                phoneNumber: state.oldUserInfo.phoneNumber
            }
            let newProjData = {
                userId: state.userId,
                project: state.userInfo.project,
                supervisor: state.userInfo.supervisor === null ? null : state.userInfo.supervisor.name,
                department: state.userInfo.department,
                productOwners: state.userInfo.productOwners
            }
            let oldProjData = {
                userId: state.userId,
                project: state.oldUserInfo.project,
                supervisor: state.oldUserInfo.supervisor === null ? null : state.oldUserInfo.supervisor.name,
                department: state.oldUserInfo.department,
                productOwners: state.oldUserInfo.productOwners
            }


            if (userDTO !== oldPD) changePersonalDataRequest(userDTO, reason)


            if (state.userInfo.grade !== state.oldUserInfo.grade) changeUserGradeRequest(state.userInfo.grade, reason)


            if (state.userInfo.role !== state.oldUserInfo.role) changeUserRoleRequest(state.userInfo.role, reason)

            if (newProjData !== oldProjData)changeProjectData(newProjData, reason)

            setState({...state, oldUserInfo: {...state.userInfo}})



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
                    ...state,
                    userInfo: newUserInfo,
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
                            style={{ background: isActive ? `#00CA4E` : `#FF605C` }} />
                    </div>
                    <div className={`${classes.rPartInfoConnected}`}>
                        <p>Присоединился:</p>
                        <div className={`${classes.connectedDate}`}>{formatLocalDate(state.userInfo.invitedAt)}</div>
                    </div>
                    <div className={`${classes.rPartInfoFired}`} style={{ display: isActive ? "none" : "" }}>
                        <p>Уволен:</p>
                        <div className={`${classes.firedDate}`} >{formatLocalDate(dismissDate)}</div>
                    </div>
                    <div className={`${classes.rPartInfoReason}`} style={{ display: isActive ? "none" : "" }}>
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
                    <button className={`${classes.buttonEdit}`} style={{ display: isActive ? "" : "none" }} onClick={() => {
                            setState({...state, isChanging: !state.isChanging})
                        }}>
                            Внести изменения
                        </button>
                    <Popup open={!state.isChanging && (JSON.stringify(state.userInfo) !== JSON.stringify(state.oldUserInfo))}
                        modal nested>
                        {
                            close => (
                                <div className={`${classes.popUpMask}`}>
                                    <div className={`${classes.popUp}`}>
                                        <div className={`${classes.popUpContent}`}>
                                            Введите причину изменения данных
                                            <form action="">
                                                <input id={"changingReason"} placeholder="Причина" />
                                            </form>
                                            <div className={`${classes.popUpButtons}`}>
                                                <button onClick={(event) => {
                                                    changeUserInfo(
                                                        document.getElementById("changingReason").value
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
                                                <input id={"dismissalReason"} placeholder="Причина" />
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
        return date === null ? "Не указано" : date.split("-").reverse().join(".")
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
                        <img src={dot} alt="dot" />
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
                    <p style={{ width: 400 + 'px', height: 400 + 'px' }}>Загрузка...</p>
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
                        {state.isChanging ?
                            <div className={`${classes.lPartInfoCol1Data}`}>
                                <input type='email' onChange={(event) => { setState({ ...state, userInfo: { ...state.userInfo, email: event.target.value } }) }} value={state.userInfo.email} className={`${classes.lPartInfoCol1DataEmail}`}></input>
                                <input type='tel' onChange={(event) => { setState({ ...state, userInfo: { ...state.userInfo, phoneNumber: event.target.value } }) }} value={state.userInfo.phoneNumber} className={`${classes.lPartInfoCol1Project}`} />
                                <input type='date' onChange={(event) => { setState({ ...state, userInfo: { ...state.userInfo, dob: event.target.value } }) }} value={state.userInfo.dob} className={`${classes.lPartInfoCol2DataDoB}`}></input>
                                <input type='text' onChange={(event) => { setState({ ...state, userInfo: { ...state.userInfo, department: event.target.value } }) }} value={state.userInfo.department} className={`${classes.lPartInfoCol1DataDep}`}></input>
                                <select onChange={(event) => { setState({ ...state, userInfo: { ...state.userInfo, grade: event.target.value } }) }} value={state.userInfo.grade} className={`${classes.lPartInfoCol1DataGrade}`}>
                                    <option value='Junior'>Junior</option>
                                    <option value='Middle'>Middle</option>
                                    <option value='Senior'>Senior</option>
                                    <option value='Team Lead'>Team Lead</option>
                                    <option value='Unspecified'>Не указано</option>
                                </select>
                                <select onChange={(event) => { setState({ ...state, userInfo: { ...state.userInfo, role: event.target.value } }) }} value={state.userInfo.role} className={`${classes.lPartInfoCol1DataRole}`}>
                                    <option value='Member'>Участник</option>
                                    <option value='Data Engineer'>Дата инженер</option>
                                    <option value='Developer'>Разработчик</option>
                                    <option value='Team Lead'>Team Lead</option>
                                    <option value='Product Owner'>Product Owner</option>
                                    <option value='Supervisor'>Руководитель</option>
                                    <option value='Non Member'>Гость</option>
                                </select>
                            </div>
                            :
                            <div className={`${classes.lPartInfoCol1Data}`}>
                                <input readOnly value={state.userInfo.email} className={`${classes.lPartInfoCol1DataEmail}`}></input>
                                <input readOnly value={state.userInfo.phoneNumber} className={`${classes.lPartInfoCol1Project}`} />
                                <input readOnly value={formatLocalDate(state.userInfo.dob)} className={`${classes.lPartInfoCol2DataDoB}`}></input>
                                <input readOnly value={state.userInfo.department} className={`${classes.lPartInfoCol1DataDep}`}></input>
                                <input readOnly value={localiseGrade(state.userInfo.grade)} className={`${classes.lPartInfoCol1DataGrade}`}></input>
                                <input readOnly value={localiseRole(state.userInfo.role)} className={`${classes.lPartInfoCol1DataRole}`}></input>
                            </div>
                        }
                        <div className={`${classes.lPartInfoCol2Title}`}>
                            <p>Проект:</p>
                            <p>Назначен:</p>
                            <p>Руководитель:</p>
                            <div className={`${classes.lPartInfoCol2TitlePrOwn}`}>Product<br></br>Owners:</div>
                        </div>
                        {state.isChanging ?
                            <div className={`${classes.lPartInfoCol2Data}`}>
                                <input onChange={(event) => setState({...state, userInfo : {...state.userInfo, project : event.target.value}})} value={state.userInfo.project} className={`${classes.lPartInfoCol2DataPhoneNum}`}/>
                                <input onChange={(event) => setState({...state, userInfo : {...state.userInfo, projectChangeAt : event.target.value}})} type="date" value={state.userInfo.projectChangedAt === null ? state.userInfo.invitedAt : state.userInfo.projectChangedAt} className={`${classes.lPartInfoCol2DataDoB}`}></input>
                                <input onChange={(event) => setState({...state, userInfo : {...state.userInfo, supervisor : event.target.value}})} className={`${classes.lPartInfoCol2DataConnected}`}
                                    value={state.userInfo.supervisor !== null ? state.userInfo.supervisor.name : ""}
                                />
                                <ul className={`${classes.lPartInfoCol2DataProdOwners}`}>
                                    {renderProductOwners(state.userInfo.productOwners)}
                                </ul>
                            </div>
                            :
                            <div className={`${classes.lPartInfoCol2Data}`}>
                                <div className={`${classes.lPartInfoCol2DataPhoneNum}`}>
                                    {state.userInfo.project !== null ? state.userInfo.project : "Нет"}
                                </div>
                                <div className={`${classes.lPartInfoCol2DataSeprvisor}`}>{formatLocalDate(projectChangeDate)}</div>
                                <input readOnly className={`${classes.lPartInfoCol2DataConnected}`}
                                    value={state.userInfo.supervisor !== null ? state.userInfo.supervisor.name : "Не назначен"}
                                />
                                <ul className={`${classes.lPartInfoCol2DataProdOwners}`}>
                                    {renderProductOwners(state.userInfo.productOwners)}
                                </ul>
                            </div>}
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