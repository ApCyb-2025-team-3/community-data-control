import classes from './employees.module.css';
import arrow from '../../icons/down-arrow-icon.svg';
import dot from '../../icons/dot-icon.svg';
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Groups from "./groups";
import Mentorships from "./mentorships";
import { localiseGrade, localiseRole } from "./localise";
import AsyncSelect from 'react-select/async';
import { UserAPI } from './UserAPI';

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
    const [isAdmin, setIsAdmin] = useState(false)
    const today = new Date()
    const [dismissDateState, setDismissDateState] = useState(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`)

    useEffect(() => {
        async function getUserInfo() {
            try {
                const response = await UserAPI.getFullInfo(userId)
                console.log(response)
                if (response !== null) {
                    const userInfo = response

                    setState({
                        userId: userId,
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
    }, [userId])

    useEffect(() => {
        const authorities = UserAPI.getAuthUser()
        .then(response => {
            JSON.parse(JSON.stringify(response.authorities))
        })
        const isNull = authorities[0] === undefined;
        setIsAdmin(!isNull && authorities[0].authority === "ROLE_ADMIN");

    }, [])

    const [nameIsCorrect, setNameIsCorrect] = useState(true)
    const [emailIsCorrect, setEmailIsCorrect] = useState(true)
    const [phoneIsCorrect, setPhoneIsCorrect] = useState(true)
    const [dobIsCorrect, setDobIsCorrect] = useState(true)
    const [invitedAtIsCorrect, setInvitedAtIsCorrect] = useState(true)

    const handleName = (event) => {
        event.target.value.length > 0 ? setNameIsCorrect(true) : setNameIsCorrect(false)
        setState({...state, userInfo: {...state.userInfo, name : event.target.value}})
    }

    const handleEmail = (event) => {
        event.target.value.match("^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$") ?
            setEmailIsCorrect(true) : setEmailIsCorrect(false)
        setState({...state, userInfo: {...state.userInfo, email : event.target.value}})
    }

    const handlePhone = (event) => {
        const phoneRegex = /^\+\d{10,14}$/;
        phoneRegex.test(event.target.value) ? 
            setPhoneIsCorrect(true) : setPhoneIsCorrect(false)
        setState({...state, userInfo: {...state.userInfo, phoneNumber : event.target.value}})
    }

    const handleDate = (event, ind) => {
        if (!event.target.value) {
            ind === 1 ?
                setDobIsCorrect(false) : setInvitedAtIsCorrect(false)
            return 
        }
        const selectedDate = new Date(event.target.value);
        const minDate = new Date("1900-01-01");
        const today = new Date();
        if (isNaN(selectedDate.getTime()) || selectedDate < minDate || selectedDate > today) {
            ind === 1 ?
                setDobIsCorrect(false) : setInvitedAtIsCorrect(false)
            return
        }
        ind === 1 ?
            setDobIsCorrect(true) : setInvitedAtIsCorrect(true)
        ind === 1 ? 
            setState({...state, userInfo: {...state.userInfo, dob : event.target.value}}) :
            setState({...state, userInfo: {...state.userInfo, invitedAt : event.target.value}})
    }

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '4px',
            color: 'black',
            fontFamily: 'Inter, sans-serif',
            fontSize: '2rem',
            fontStyle: 'normal',
            fontWeight: 300,
            lineHeight: 'normal',
            boxShadow: state.isFocused ? '0 0 0 1px #2684ff' : null,
            '&:hover': {
                borderColor: '#2684ff',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#2684ff' : null,
            color: state.isSelected ? 'white' : 'black',
            fontFamily: 'Inter, sans-serif',
            fontSize: '2rem',
            fontStyle: 'normal',
            fontWeight: 300,
            lineHeight: 'normal',
            width: '100%',
            '&:hover': {
                backgroundColor: '#2684ff',
                color: 'white',
            },
        }),
        // Add more styles for other elements as needed
    };

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


    
    async function changeUserInfo(reason) {

        let userDTO = {
            userId: state.userId,
            name: state.userInfo.name,
            dob: state.userInfo.dob.toString(),
            email: state.userInfo.email,
            phoneNumber: state.userInfo.phoneNumber
        }
        let oldPD = {
            id: state.userId,
            name: state.oldUserInfo.name,
            dob: state.oldUserInfo.dob.toString(),
            email: state.oldUserInfo.email,
            phoneNumber: state.oldUserInfo.phoneNumber
        }
        let newProjData = {
            userId: state.userId,
            project: state.userInfo.project,
            supervisor: state.userInfo.supervisor === null ? '' : state.userInfo.supervisor.value,
            department: state.userInfo.department,
            changedAt: dateToIEEE(state.userInfo.projectChangedAt),
            productOwners: state.userInfo.productOwners.map(item => item.value)
        }
        let oldProjData = {
            userId: state.userId,
            project: state.oldUserInfo.project,
            supervisor: state.oldUserInfo.supervisor === null ? null : state.oldUserInfo.supervisor.value,
            department: state.oldUserInfo.department,
            changedAt: dateToIEEE(state.oldUserInfo.projectChangedAt),
            productOwners: state.oldUserInfo.productOwners.map(item => item.name)
        }

        if (JSON.stringify(userDTO) !== JSON.stringify(oldPD)) await UserAPI.changePersonalDataRequest(userDTO, reason)

        if (state.userInfo.grade !== state.oldUserInfo.grade) await UserAPI.changeUserGradeRequest(state.userInfo.grade, reason, userId)

        if (JSON.stringify(newProjData) !== JSON.stringify(oldProjData)) await UserAPI.changeProjectData(newProjData)

        if (state.userInfo.role !== state.oldUserInfo.role) await UserAPI.changeUserRoleRequest(state.userInfo.role, reason, userId)

        setState({ ...state, oldUserInfo: { ...state.userInfo } })
    }

    function dateToIEEE(date) {
        return (date !== undefined && date !== null) ? date.split(".").reverse().join("-") : ""
    }

    async function handleUserDismissal(reason, dismissedAt) {

        try {

            const url = process.env.REACT_APP_BACKEND_URL
                + "/api/user/" + state.userId + "/dismiss?date=" + dateToIEEE(dismissedAt)
                + "&description=" + encodeURIComponent(reason)
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
                newUserInfo.dismissedAt = dismissedAt
                setState({
                    ...state,
                    userInfo: newUserInfo,
                    oldUserInfo: newUserInfo
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
                    <button className={`${classes.buttonTeamsGroups}`} style={{ display: !state.isChanging ? "" : "none" }}
                        onClick={handleGroupsVisibilityChange} >
                        <img src={arrow} alt="arrow" />
                        <p>Команды / Группы</p>
                    </button>
                    <button className={`${classes.buttonMentorship}`} style={{ display: !state.isChanging ? "" : "none" }}
                        onClick={handleMentorshipsVisibilityChange}>
                        <img src={arrow} alt="arrow" />
                        <p>Менторство</p>
                    </button>
                    
                    <button className={`${classes.buttonEdit}`} style={{ display: isActive && isAdmin ? "" : "none" }} onClick={() => {
                        if (state.isChanging) {
                            if (nameIsCorrect && emailIsCorrect && phoneIsCorrect && dobIsCorrect && invitedAtIsCorrect)
                                setState({...state, isChanging: !state.isChanging})
                            else alert('Проверьте введенные данные')
                        } else {
                            setState({
                                ...state,
                                isChanging: !state.isChanging,
                                userInfo: {
                                    ...state.userInfo,
                                    projectChangedAt: `${today.getFullYear()}-${today.getMonth()
                                    + 1}-${today.getDate()}`
                                }
                            })
                        }
                    }}>
                        {state.isChanging ? "Сохранить" : "Внести изменения"}
                    </button>
                    <Popup open={!state.isChanging && JSON.stringify(state.userInfo) !== JSON.stringify(state.oldUserInfo)}
                        modal nested>
                        {
                            close => (
                                <div className={`${classes.popUpMask}`}>
                                    <div className={`${classes.popUp}`}>
                                        <div className={`${classes.popUpContent}`}>
                                            Введите причину изменения данных
                                            <input id={"changingReason"} placeholder="Причина" />
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
                        {<button className={`${classes.buttonEdit}`} style={{ display: isAdmin && isActive && !state.isChanging ? "" : "none" }}>
                            Уволить
                        </button>}
                        modal nested>
                        {
                            close => (
                                <div className={`${classes.popUpMask}`}>
                                    <div className={`${classes.popUp}`}>
                                        <div className={`${classes.popUpContent}`}>
                                            Введите причину и дату увольнения
                                            <input id={"dismissalReason"}
                                                   placeholder="Причина"></input>
                                            <input type='date'
                                                   id={"dismissalDate"}
                                                   value={dismissDateState}
                                                   onChange={(event) => setDismissDateState(event.currentTarget.value)}
                                                   className={`${classes.lPartInfoCol2DataDoB}`}></input>
                                            <div
                                                className={`${classes.popUpButtons}`}>
                                                <button onClick={(event) => {
                                                    handleUserDismissal(
                                                        document.getElementById("dismissalReason").value,
                                                        document.getElementById("dismissalDate").value.toString(),
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
                <Groups key={state.userId} userId={state.userId}></Groups>
            )
        }

        if (state.isMentorshipVisible) {
            visibleBlocks.push(
                <Mentorships key={state.userId}
                             userId={state.userId}
                             mentorStatus={state.userInfo.mentorStatus}
                >

                </Mentorships>
            )
        }

        return visibleBlocks
    }

    function formatLocalDate(date) {
        const localDate = date === null ? null : date.split("-").reverse()
        if (localDate === undefined || localDate === null) return null
        else {
            localDate[1] = localDate[1].length === 1 ? '0' + localDate[1] : localDate[1]
            return localDate.join()
        }
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


    const getUsers = async (inputValue) => {
        try {
            const response = await UserAPI.getUserByRole('supervisor')
            return response.map(user => ({
                id: user.id,
                value: user.name,
                label: user.name
            })).filter(t => t.id !== state.userId);
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
            return [];
        }
    };


    const promiseOptions = (inputValue) =>
        new Promise(resolve => resolve(getUsers(inputValue)));

    const promiseOptionsPO = (inputValue) =>
        new Promise(resolve => resolve(getPO(inputValue)));

    const getPO = async (inputValue) => {
        try {
            const response = await UserAPI.getUserByRole(`product owner`);
            return response.map(user => ({
                id: user.id,
                value: user.name,
                label: user.name
            })).filter(t => t.id !== state.userId);
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
            return [];
        }
    };

    if (isLoading) {

        return (
            <div className={`${classes.infoBlocks}`}>
                <div className={`${classes.mainBlock}`}>
                    <p style={{ width: 400 + 'px', height: 400 + 'px' }}>Загрузка...</p>
                </div>
            </div>
        )
    }

    const projectChangeDate = state.oldUserInfo.projectdAt !== null
        ? state.oldUserInfo.projectChangedAt : state.oldUserInfo.invitedAt

    return (
        <div className={`${classes.infoBlocks}`}>
            <div className={`${classes.mainBlock}`}>
                <div className={`${classes.mainBlockLPart}`}>
                    {state.isChanging ?
                        <div className={`${classes.lPartHeading}`}>
                            <p>Сотрудник:</p>
                            <input value={state.userInfo.name} onChange={(event) => { handleName(event) }} className={`${classes.lPartHeadingNameInput}`} />{!nameIsCorrect && <p style={{color: 'red', fontSize: '12px'}}>Некорректый формат имени</p>}
                        </div>
                        :
                        <div className={`${classes.lPartHeading}`}>
                            <p>Сотрудник:</p>
                            <div className={`${classes.lPartHeadingName}`}>{state.oldUserInfo.name}</div>
                        </div>}
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
                                <input type='email' onChange={(event) => { handleEmail(event) }} value={state.userInfo.email} className={`${classes.lPartInfoCol1DataEmail}`}/>{!emailIsCorrect && <p style={{color: 'red', fontSize: '12px'}}>Некорректый формат электронной почты</p>}
                                <input type='tel' onChange={(event) =>  { handlePhone(event)} } value={state.userInfo.phoneNumber} className={`${classes.lPartInfoCol1Project}`} />{!phoneIsCorrect && <p style={{color: 'red', fontSize: '12px'}}>Некорректый формат номера телефона</p>}
                                <input type='date' onChange={(event) => { handleDate(event, 1) }} value={state.userInfo.dob} className={`${classes.lPartInfoCol2DataDoB}`}></input>{!dobIsCorrect && <p style={{color: 'red', fontSize: '12px'}}>Неверная дата</p>}
                                <input type='text' onChange={(event) => { setState({ ...state, userInfo: { ...state.userInfo, department: event.target.value } }) }} value={state.userInfo.department} className={`${classes.lPartInfoCol1DataDep}`}/>
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
                                <input readOnly value={state.oldUserInfo.email} className={`${classes.lPartInfoCol1DataEmail}`}></input>
                                <input readOnly value={state.oldUserInfo.phoneNumber} className={`${classes.lPartInfoCol1Project}`} />
                                <input readOnly value={formatLocalDate(state.oldUserInfo.dob)} className={`${classes.lPartInfoCol2DataDoB}`}></input>
                                <input readOnly value={(state.oldUserInfo.department !== null && state.oldUserInfo.department !== "") ? state.oldUserInfo.department : "Нет"} className={`${classes.lPartInfoCol1DataDep}`}></input>
                                <input readOnly value={localiseGrade(state.oldUserInfo.grade)} className={`${classes.lPartInfoCol1DataGrade}`}></input>
                                <input readOnly value={localiseRole(state.oldUserInfo.role)} className={`${classes.lPartInfoCol1DataRole}`}></input>
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
                                <input onChange={(event) => setState({ ...state, userInfo: { ...state.userInfo, project: event.target.value } })} value={state.userInfo.project} className={`${classes.lPartInfoCol2DataPhoneNum}`} />
                                <input type='date' onChange={(event) => setState({ ...state, userInfo: { ...state.userInfo, projectChangedAt: event.target.value } })} defaultValue={state.userInfo.projectChangedAt} className={`${classes.lPartInfoCol2DataDoB}`}></input>
                                <AsyncSelect
                                    cacheOptions
                                    defaultOptions
                                    loadOptions={promiseOptions}
                                    onChange={(selectedOption) => setState({ ...state, userInfo: { ...state.userInfo, supervisor: selectedOption } })}
                                    classNamePrefix="custom"
                                    styles={customStyles}
                                    className="custom-container"
                                />
                                {/*<input onChange={(event) => setState({ ...state, userInfo: { ...state.userInfo, supervisor: event.target.value } })} className={`${classes.lPartInfoCol2DataConnected}`}
                                    value={state.userInfo.supervisor !== null ? state.userInfo.supervisor.value : ""}
                        />*/}
                                <ul className={`${classes.lPartInfoCol2DataProdOwners}`}>
                                    <AsyncSelect
                                        isMulti
                                        cacheOptions
                                        defaultOptions
                                        classNamePrefix="custom"
                                        className="custom-container"
                                        styles={customStyles}
                                        loadOptions={promiseOptionsPO}
                                        onChange={(selectedOption) => setState({ ...state, userInfo: { ...state.userInfo, productOwners: selectedOption } })}

                                    />
                                </ul>
                            </div>
                            :
                            <div className={`${classes.lPartInfoCol2Data}`}>
                                <div className={`${classes.lPartInfoCol2DataPhoneNum}`}>
                                    {(state.oldUserInfo.project !== null && state.oldUserInfo.project !== "") ? state.oldUserInfo.project : "Нет"}
                                </div>
                                <div className={`${classes.lPartInfoCol2DataSeprvisor}`}>{formatLocalDate(projectChangeDate)}</div>
                                <input readOnly className={`${classes.lPartInfoCol2DataConnected}`}
                                    value={state.oldUserInfo.supervisor !== null ? state.oldUserInfo.supervisor.value : "Не назначен"}
                                />
                                <ul className={`${classes.lPartInfoCol2DataProdOwners}`}>
                                    {renderProductOwners(state.oldUserInfo.productOwners)}
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
