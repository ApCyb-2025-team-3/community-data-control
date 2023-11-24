import classes from './employees.module.css';
import arrow from '../../icons/down-arrow-icon.svg';
import dot from '../../icons/dot-icon.svg';
import React, { useState } from "react";
import Popup from "reactjs-popup";
import Groups from "./groups";
import Mentorships from "./mentorships";

const MainInfo = (userId) => {

    const [state, setState] = useState({
        userId: userId.userId,
        userInfo: {},
        isGroupsVisible: false,
        isMentorshipVisible: false,
    })

    console.log(state.userId)

    async function getUserInfo() {
        try {
            const url = process.env.REACT_APP_BACKEND_URL
                + "/api/user/" + state.userId + "/fullInfo"
            const response = await fetch(url, {
                method: "GET",
                mode: 'cors',
                headers: {
                    "Origin": "http://localhost:3000",
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                const userInfo = await response.json()
                setState({
                    ...state,
                    userInfo: userInfo,
                })
                console.log(userInfo)

            } else {
                console.error("HTTP error:" + response.status + "\n" + response.statusText)
            }

        } catch (error) {
            console.error(error)
        }
    }

    if (state.userId !== state.userInfo.id) getUserInfo()

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
                            <p>Проект:</p>
                            <p>Подразд.:</p>
                            <p>Ур. комп.:</p>
                            <p>Роль:</p>
                        </div>
                        <div className={`${classes.lPartInfoCol1Data}`}>
                            <input readOnly={!state.isChangingUser} id='infoEmail' value={state.userInfo.email} className={`${classes.lPartInfoCol1DataEmail}`} onChange={(event) => setState({ ...state, userInfo: {...state.userInfo, emial : event.target.value} })} />
                            <input readOnly={!state.isChangingUser} id='infoProject' value={state.userInfo.project} className={`${classes.lPartInfoCol1DataProj}`} onChange={(event) => setState({ ...state, userInfo: {...state.userInfo, project : event.target.value} })} />
                            <input readOnly={!state.isChangingUser} id='infoDepartment' value={state.userInfo.department} className={`${classes.lPartInfoCol1DataDep}`} onChange={(event) => setState({ ...state, userInfo: {...state.userInfo, department : event.target.value} })} />
                            <input readOnly={!state.isChangingUser} id='infoGrade' value={state.userInfo.grade} className={`${classes.lPartInfoCol1DataGrade}`} onChange={(event) => setState({ ...state, userInfo: {...state.userInfo, grade : event.target.value} })} />
                            <input readOnly={!state.isChangingUser} id='infoRole' value={state.userInfo.role} className={`${classes.lPartInfoCol1DataRole}`} onChange={(event) => setState({ ...state, userInfo: {...state.userInfo, role : event.target.value} })} />
                        </div>
                        <div className={`${classes.lPartInfoCol2Title}`}>
                            <p>Телефон:</p>
                            <p>Руковод.:</p>
                            <p>Дата рожд.:</p>
                            <div className={`${classes.lPartInfoCol2TitleDoB}`}>Pr. owners:</div>
                        </div>
                        <div className={`${classes.lPartInfoCol2Data}`}>
                            <input readOnly={!state.isChangingUser} id='infoPhone' value={state.userInfo.phoneNumber} className={`${classes.lPartInfoCol2DataPhoneNum}`} onChange={(event) => setState({ ...state, userInfo: {...state.userInfo, phoneNumber : event.target.value} })} />
                            <input readOnly={!state.isChangingUser} id='infoSupervisor' value={state.userInfo.supervisor} className={`${classes.lPartInfoCol2DataSeprvisor}`} onChange={(event) => setState({ ...state, userInfo: {...state.userInfo, supervisor : event.target.value} })} />
                            <input readOnly={!state.isChangingUser} id='infoDob' value={state.userInfo.dob} className={`${classes.lPartInfoCol2DataDoB}`} onChange={(event) => setState({ ...state, userInfo: {...state.userInfo, dob : event.target.value} })} />
                            <ul className={`${classes.lPartInfoCol2DataProdOwners}`}>
                                <li>
                                    <img src={dot} alt="dot" />
                                    <div className={`${classes.liProdOwnersName}`}>Liz Truss</div>
                                </li>
                                <li>
                                    <img src={dot} alt="dot" />
                                    <div className={`${classes.liProdOwnersName}`}>Liz Truss</div>
                                </li>
                                <li>
                                    <img src={dot} alt="dot" />
                                    <div className={`${classes.liProdOwnersName}`}>Liz Truss</div>
                                </li>
                                <li>
                                    <img src={dot} alt="dot" />
                                    <div className={`${classes.liProdOwnersName}`}>Liz Truss</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={`${classes.rPartButtons}`}>
                        <button className={`${classes.buttonTeamsGroups}`}>
                            <img src={arrow} alt="arrow" />
                            <p>Команды / Группы</p>
                        </button>
                        <button className={`${classes.buttonMentorship}`}>
                            <img src={arrow} alt="arrow" />
                            <p>Менторство</p>
                        </button>
                        <button className={`${classes.buttonEdit}`} style={{ display: "none" }}>Внести изменения</button>
                        <Popup trigger=
                            {<button className={`${classes.buttonEdit}`} style={{ display: "none" }}>
                                Уволить
                            </button>}
                            modal nested>
                            {
                                close => (
                                    <div className={`${classes.popUp}`}>
                                        <div className={`${classes.popUpContent}`}>
                                            Введите причину увольнения
                                            <form action="">
                                                <input placeholder="Причина" />
                                            </form>
                                            <div className={`${classes.popUpButtons}`}>
                                                <button onClick=
                                                    {() => close()}>
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
                                )
                            }
                        </Popup>
                    </div>
                </div>
            </div>
            <div className={`${classes.lowerBlocks}`}>
                {renderGroupsAndMentorships()}
            </div>
        </div>
    )
}

export default MainInfo;