import {Helmet} from 'react-helmet';
import classes from './employees.module.css';
import add from '../../icons/add-icon.svg'
import search from '../../icons/search-icon.svg';
import arrow from '../../icons/down-arrow-icon.svg';
import dot from '../../icons/dot-icon.svg';
import remove from '../../icons/remove-icon.svg';
import logo from '../../icons/safari-pinned-tab.svg';
import React, {useState} from "react";
import Popup from "reactjs-popup";

const Employees = () => {

    const [state, setState] = useState({
            selectedUserId: -1,
            userList: [],
        }
    )

    const testUserList = [
        {userId: 0, name: "Somehow", role: "Team Lead", project: ""},
        {userId: 1, name: "I", role: "Developer", project: "Apache Kafka"},
        {userId: 2, name: "Know", role: "Team Lead", project: "Apache Kafka"},
        {userId: 3, name: "Nothing", role: "Developer", project: "Apache Kafka"},
        {userId: 4, name: "However", role: "Product Owner", project: "Apache Kafka"},
        {userId: 5, name: "Somehow", role: "Team Lead", project: ""},
        {userId: 6, name: "I", role: "Developer", project: "Apache Kafka"},
        {userId: 7, name: "Know", role: "Team Lead", project: "Apache Kafka"},
        {userId: 8, name: "Nothing", role: "Developer", project: "Apache Kafka"},
        {userId: 9, name: "However", role: "Product Owner", project: "Apache Kafka"},
        {userId: 10, name: "I", role: "Developer", project: "Apache Kafka"},
    ]

    function setEmptyUserListToState() {
        setState({
            selectedUserId: state.selectedUserId,
            userList: []
        })
    }

    async function getUsersByRole (role) {

        if (role === "") {
            setEmptyUserListToState()
        }

        const url = process.env.REACT_APP_BACKEND_URL
            + "/api/user/getUsersByRole?role=" + role

        const userDtoList = await performGetRequest(url)
        setState({
            selectedUserId: state.selectedUserId,
            userList: userDtoList,
        })
    }

    async function getUsersByGrade (grade) {

        if (grade === "") {
            setEmptyUserListToState()
        }

        const url = process.env.REACT_APP_BACKEND_URL
            + "/api/user/getUsersByGrade?grade=" + grade

        const userDtoList = await performGetRequest(url)
        setState({
            selectedUserId: state.selectedUserId,
            userList: userDtoList
        })
    }

    async function getDismissedUsers() {

        const url = process.env.REACT_APP_BACKEND_URL + "/api/user/getDismissedUsers"

        const userDtoList = await performGetRequest(url)
        setState({
            selectedUserId: state.selectedUserId,
            userList: userDtoList
        })
    }

    async function getUsersByName(name) {

        if (name === "") {
            setEmptyUserListToState()
        }

        const url = process.env.REACT_APP_BACKEND_URL
            + "/api/user/getUsersByPartialName?partialName=" + name

        const userDtoList = await performGetRequest(url)
        setState({
            selectedUserId: state.selectedUserId,
            userList: userDtoList
        })
    }

    async function getUsersByProject(project) {

        if (project === "") {
            setEmptyUserListToState()
        }

        const url = process.env.REACT_APP_BACKEND_URL
            + "/api/user/getUsersByProject?project=" + project

        const userDtoList = await performGetRequest(url)
        setState({
            selectedUserId: state.selectedUserId,
            userList: userDtoList
        })
    }

    async function getUsersByDepartment(department) {

        if (department === "") {
            setEmptyUserListToState()
        }

        const url = process.env.REACT_APP_BACKEND_URL
            + "/api/user/getUsersByDepartment?department=" + department

        const userDtoList = await performGetRequest(url)
        setState({
            selectedUserId: state.selectedUserId,
            userList: userDtoList
        })
    }

    async function getUsersBySupervisor(name) {

        if (name === "") {
            setEmptyUserListToState()
        }

        const url = process.env.REACT_APP_BACKEND_URL
            + "/api/user/getUsersBySupervisor?name=" + name

        const userDtoList = await performGetRequest(url)
        setState({
            selectedUserId: state.selectedUserId,
            userList: userDtoList
        })
    }

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

    function handleUserSelection(userId) {
        setState({
            selectedUserId: userId,
            userList: state.userList
        })
    }

    function renderUserList(userDtoList) {

        if (userDtoList === undefined || userDtoList.length === 0) {
            return (
                <div className={`${classes.listLiInfoName}`}>Нет подходящих сотрудников</div>
            )
        }
        console.log(userDtoList)

        let renderedUserList = []

        userDtoList.sort((a, b) => a.name.localeCompare(b.name)).forEach(
            function (userDto) {
                renderedUserList.push(
                    <li>
                        <div className={`${classes.listLiInfo}`}
                             onClick={() => {
                                 handleUserSelection(userDto.id)
                             }}>
                            <div
                                className={`${classes.listLiInfoName}`}>{userDto.name}</div>
                            <div className={`${classes.listLiInfoRoleProj}`}>
                                <div
                                    className={`${classes.listLiInfoRoleProjTitles}`}>
                                    <div>Роль:</div>
                                    <div>Проект:</div>
                                </div>
                                <div
                                    className={`${classes.listLiInfoRoleProjBox}`}>
                                    <div
                                        className={`${classes.roleProjBoxRole}`}>{userDto.role}</div>
                                    <div
                                        className={`${classes.roleProjBoxProject}`}>{userDto.project
                                    !== "" ? userDto.project : "Нет"}</div>
                                </div>
                            </div>
                        </div>
                    </li>
                )
            })
        return renderedUserList
    }

    function renderFullInfoBlock() {

        if (state.selectedUserId === -1) {
            return (
                <div className={`${classes.infoBlocks}`}>
                </div>
            )
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
                                <p>Email</p>
                                <p>Телефон</p>
                                <p>Отдел</p>
                                <p>Позиция</p>
                                <p>Роль</p>
                            </div>
                            <div className={`${classes.lPartInfoCol1Data}`}>
                                <div className={`${classes.lPartInfoCol1DataEmail}`}>ocariz@bola389.bid</div>
                                <div className={`${classes.lPartInfoCol1Project}`}>
                                    +7 (800) 555 35-35
                                </div>
                                <div className={`${classes.lPartInfoCol1DataDep}`}>Data Science</div>
                                <div className={`${classes.lPartInfoCol1DataGrade}`}>Senior</div>
                                <div className={`${classes.lPartInfoCol1DataRole}`}>Scala-developer</div>
                            </div>
                            <div className={`${classes.lPartInfoCol2Title}`}>
                                <p>Проект</p>
                                <p>Дата рождения</p>
                                <p>Руководитель</p>
                                <div className={`${classes.lPartInfoCol2TitleDoB}`}>Product<br></br>Owners</div>
                            </div>
                            <div className={`${classes.lPartInfoCol2Data}`}>
                                <div className={`${classes.lPartInfoCol2DataPhoneNum}`}>Apache Kafka</div>
                                <div className={`${classes.lPartInfoCol2DataDoB}`}>01.01.1900</div>
                                <div className={`${classes.lPartInfoCol2DataSeprvisor}`}>Donald Trump</div>
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
                                <p>Присоед.:</p>
                                <div className={`${classes.connectedDate}`}>23.09</div>
                            </div>
                        </div>
                        <div className={`${classes.rPartButtons}`}>
                            <button className={`${classes.buttonTeamsGroups}`}>
                                <img src={arrow} alt="arrow" />
                                <p>Команды / группы</p>
                            </button>
                            <button className={`${classes.buttonMentorship}`}>
                                <img src={arrow} alt="arrow" />
                                <p>Менторство</p>
                            </button>
                            <button className={`${classes.buttonEdit}`}>Внести изменения</button>
                            <Popup trigger=
                                       {<button className={`${classes.buttonEdit}`}>
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
                    <div className={`${classes.teamGroupsBlock}`}>
                        <div className={`${classes.teamGroupsBlockTitles}`}>
                            <p>Команда:</p>
                            <div>Лидер:</div>
                            <p>Группы:</p>
                        </div>
                        <div className={`${classes.teamGroupsBlockData}`}>
                            <div className={`${classes.teamGroupsBlockDataTeam}`}>Spauspauspau</div>
                            <div className={`${classes.teamGroupsBlockDataLeader}`}>Hawks A.</div>
                            <ul className={`${classes.teamGroupsBlockDataGroups}`}>
                                <li>
                                    <img src={dot} alt="dot" />
                                    <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                                    <button>
                                        <img src={remove} alt="remove" />
                                    </button>
                                </li>
                                <li>
                                    <img src={dot} alt="dot" />
                                    <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                                    <button>
                                        <img src={remove} alt="remove" />
                                    </button>
                                </li>
                                <li>
                                    <img src={dot} alt="dot" />
                                    <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                                    <button>
                                        <img src={remove} alt="remove" />
                                    </button>
                                </li>
                                <li>
                                    <img src={dot} alt="dot" />
                                    <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                                    <button>
                                        <img src={remove} alt="remove" />
                                    </button>
                                </li>
                                <li>
                                    <img src={dot} alt="dot" />
                                    <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                                    <button>
                                        <img src={remove} alt="remove" />
                                    </button>
                                </li>
                                <li>
                                    <img src={dot} alt="dot" />
                                    <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                                    <button>
                                        <img src={remove} alt="remove" />
                                    </button>
                                </li>
                                <li>
                                    <img src={dot} alt="dot" />
                                    <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                                    <button>
                                        <img src={remove} alt="remove" />
                                    </button>
                                </li>
                                <li>
                                    <img src={dot} alt="dot" />
                                    <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                                    <button>
                                        <img src={remove} alt="remove" />
                                    </button>
                                </li>
                                <li>
                                    <img src={dot} alt="dot" />
                                    <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                                    <button>
                                        <img src={remove} alt="remove" />
                                    </button>
                                </li>
                                <li>
                                    <img src={dot} alt="dot" />
                                    <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                                    <button>
                                        <img src={remove} alt="remove" />
                                    </button>
                                </li>
                                <li>
                                    <img src={dot} alt="dot" />
                                    <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                                    <button>
                                        <img src={remove} alt="remove" />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={`${classes.mentorshipBlock}`}>
                        <p className={`${classes.teamGroupsBlockHeading}`}>Менторство</p>
                        <div className={`${classes.teamGroupsBlockInfo}`}>
                            <div className={`${classes.teamGroupsBlockInfoTitles}`}>
                                <p>Роль:</p>
                                <p className={`${classes.classMentor}`} style={{ display: "none" }}>
                                    Ментор:
                                </p>
                                <p className={`${classes.classMentee}`}>Менти:</p>
                            </div>
                            <div className={`${classes.teamGroupsBlockInfoData}`}>
                                <div className={`${classes.roleMentee}`} style={{ display: "none" }}>
                                    менти
                                </div>
                                <div className={`${classes.roleMentor}`}>ментор</div>
                                <div className={`${classes.mentorName}`} style={{ display: "none" }}>
                                    Mironov Semyon Vitalievich
                                </div>
                                <ul className={`${classes.menteeList}`}>
                                    <li>
                                        <img src={dot} alt="dot" />
                                        <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                                    </li>
                                    <li>
                                        <img src={dot} alt="dot" />
                                        <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                                    </li>
                                    <li>
                                        <img src={dot} alt="dot" />
                                        <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                                    </li>
                                    <li>
                                        <img src={dot} alt="dot" />
                                        <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                                    </li>
                                    <li>
                                        <img src={dot} alt="dot" />
                                        <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                                    </li>
                                    <li>
                                        <img src={dot} alt="dot" />
                                        <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                                    </li>
                                    <li>
                                        <img src={dot} alt="dot" />
                                        <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                                    </li>
                                    <li>
                                        <img src={dot} alt="dot" />
                                        <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                                    </li>
                                    <li>
                                        <img src={dot} alt="dot" />
                                        <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                                    </li>
                                    <li>
                                        <img src={dot} alt="dot" />
                                        <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                                    </li>
                                    <li>
                                        <img src={dot} alt="dot" />
                                        <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                                    </li>
                                    <li>
                                        <img src={dot} alt="dot" />
                                        <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                                    </li>
                                    <li>
                                        <img src={dot} alt="dot" />
                                        <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                                    </li>
                                    <li>
                                        <img src={dot} alt="dot" />
                                        <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                                    </li>
                                    <li>
                                        <img src={dot} alt="dot" />
                                        <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>Сотрудники — Community</title>
            </Helmet>
            <div className={`${classes.wrapperBodyContainer}`}>
                <div className={`${classes.bodyObtaining}`}>
                    <p className={`${classes.wrapperBodyContainerTitle}`}>Сотрудники</p>
                    <div className={`${classes.blocksObtaining}`}>
                        <div className={`${classes.menuListBlock}`}>
                            <div className={`${classes.menuListBlockMenu}`}>
                                <div className={`${classes.menuAddName}`}>
                                    <button>
                                        <img src={add} alt="add"/>
                                    </button>
                                    <form action="">
                                        <input placeholder="Имя"/>
                                        <button onClick={
                                            (event) => {
                                                getUsersByName(event.target.value)
                                            }}
                                        >
                                            <img src={search} alt="search"/>
                                        </button>
                                    </form>
                                </div>
                                <div className={`${classes.menuColumns}`}>
                                    <div
                                        className={`${classes.columnsCol}`}>
                                        <select name="Grade"
                                                id=""
                                                onChange={(event) =>
                                                    getUsersByGrade(
                                                        event.target.value)}
                                        >
                                            <option value="">Позиция
                                            </option>
                                            <option value="Junior">Junior
                                            </option>
                                            <option value="Middle">Middle
                                            </option>
                                            <option value="Senior">Senior
                                            </option>
                                            <option value="Team Lead">Team
                                                Lead
                                            </option>
                                            <option value="Not specified">Не
                                                указана
                                            </option>
                                        </select>
                                        <form action="">
                                            <input placeholder="Отдел"/>
                                            <button
                                                onClick={(event) => {
                                                    getUsersByDepartment(event.target.value)
                                                }}
                                            >
                                                <img src={search}
                                                     alt="search"/>
                                            </button>
                                        </form>
                                    </div>
                                    <div
                                        className={`${classes.columnsCol}`}>
                                        <select name="Role"
                                                id=""
                                                onChange={(event) =>
                                                    getUsersByRole(
                                                        event.target.value)}
                                        >
                                            <option value="">Роль</option>
                                            <option
                                                value="Member">Участник
                                            </option>
                                            <option
                                                value="Data Engineer">Дата
                                                Инженер
                                            </option>
                                            <option
                                                value="Developer">Разработчик
                                            </option>
                                            <option value="Team Lead">Team
                                                Lead
                                            </option>
                                            <option
                                                value="Product Owner">Product
                                                Owner
                                            </option>
                                            <option
                                                value="Supervisor">Руководитель
                                            </option>
                                            <option
                                                value="Non member">Гость
                                            </option>
                                        </select>
                                        <form action="">
                                            <input placeholder="Проект"/>
                                            <button
                                                onClick={(event) => {
                                                    getUsersByProject(event.target.value)
                                                }}
                                            >
                                                <img src={search}
                                                     alt="search"/>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <form action=""
                                      className={`${classes.menuSupervisor}`}>
                                    <input placeholder="Руководитель"/>
                                    <button
                                        onClick={(event) => {
                                            getUsersBySupervisor(event.target.value)
                                        }}
                                    >
                                        <img src={search} alt="search"/>
                                    </button>
                                </form>
                                <button
                                    className={`${classes.menuFormerEmp}`}
                                    onClick={() => {
                                        getDismissedUsers()
                                    }}>
                                    Бывшие сотрудники
                                </button>
                            </div>
                            <ul className={`${classes.menuListBlockList}`}>
                                {/*{renderUserList(state.userList)}*/}
                                {renderUserList(testUserList)}
                            </ul>
                        </div>
                        {renderFullInfoBlock()}
                    </div>
                </div>
            </div>
            <div className={`${classes.wrapperFooterContainer}`}>
                <div className={`${classes.footerInfobox}`}>
                    <p className={`${classes.footerInfoboxCopyright}`}>©
                        community</p>
                    <p className={`${classes.footerInfoboxAttribution}`}>
                        Icon made by Pixel perfect, Royyan Wijaya, th studio
                        from www.flaticon.com
                    </p>
                </div>
                <img src={logo} alt="logo"/>
            </div>
        </>
    );
}

export default Employees;