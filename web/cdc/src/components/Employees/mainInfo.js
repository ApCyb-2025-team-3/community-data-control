import classes from './employees.module.css';
import arrow from '../../icons/down-arrow-icon.svg';
import dot from '../../icons/dot-icon.svg';
import React, {useState} from "react";
import Popup from "reactjs-popup";
import Groups from "./groups";
import Mentorships from "./mentorships";

const MainInfo = (userId) => {

    const [state, setState] = useState({
        userId: userId,
        userInfo: {},
        isGroupsVisible: false,
        isMentorshipVisible: false,
    })

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

    getUserInfo()

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
                        <div className={`${classes.lPartHeadingName}`}>Frederic Gilbert</div>
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
                            <div className={`${classes.lPartInfoCol1DataEmail}`}>ocariz@bola389.bid</div>
                            <div className={`${classes.lPartInfoCol1Project}`}>
                                +7 (800) 555 35-35
                            </div>
                            <div className={`${classes.lPartInfoCol2DataDoB}`}>01.01.1900</div>
                            <div className={`${classes.lPartInfoCol1DataDep}`}>Data Science</div>
                            <div className={`${classes.lPartInfoCol1DataGrade}`}>Senior</div>
                            <div className={`${classes.lPartInfoCol1DataRole}`}>Scala-developer</div>
                        </div>
                        <div className={`${classes.lPartInfoCol2Title}`}>
                            <p>Проект:</p>
                            <p>Назначен:</p>
                            <p>Руководитель:</p>
                            <div className={`${classes.lPartInfoCol2TitlePrOwn}`}>Product<br></br>Owners:</div>
                        </div>
                        <div className={`${classes.lPartInfoCol2Data}`}>
                            <div className={`${classes.lPartInfoCol2DataPhoneNum}`}>Apache Kafka</div>
                            <div className={`${classes.lPartInfoCol2DataSeprvisor}`}>Donald Trump</div>
                            <div className={`${classes.lPartInfoCol2DataConnected}`}>33.33.3333</div>
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
                </div>
                <div className={`${classes.mainBlockRPart}`}>
                    <div className={`${classes.rPartInfo}`}>
                        <div className={`${classes.rPartInfoActivity}`}>
                            <p>Активность:</p>
                            <div className={`${classes.activityStatus}`} />
                        </div>
                        <div className={`${classes.rPartInfoConnected}`}>
                            <p>Присоединился:</p>
                            <div className={`${classes.connectedDate}`}>23.09.3333</div>
                        </div>
                        <div className={`${classes.rPartInfoFired}`}>
                            <p>Уволен:</p>
                            <div className={`${classes.firedDate}`} >23.09.3333</div>
                        </div>
                        <div className={`${classes.rPartInfoReason}`}>
                            <p>Причина:</p>
                            <div className={`${classes.reason}`} >Воровал кофе</div>
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
                                                <input placeholder="Причина"/>
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