import {Helmet} from 'react-helmet';
import classes from './employees.module.css';
import add from '../../icons/add-icon.svg'
import search from '../../icons/search-icon.svg';
import logo from '../../icons/safari-pinned-tab.svg';
import React, {useState} from "react";
import MainInfo from "./mainInfo";
import AddUser from "./AddUser.js"
import {localiseRole} from "./localise";
import { UserAPI } from './UserAPI.js';

const Employees = () => {

    const [state, setState] = useState({
            selectedUserId: -1,
            userList: [],
        }
    )

    const [isAdding, setIsAdding] = useState(false)

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
        const userDtoList = await UserAPI.getUserByRole(role)
        setState({
            selectedUserId: state.selectedUserId,
            userList: userDtoList,
        })
    }

    async function getUsersByGrade (grade) {

        if (grade === "") {
            setEmptyUserListToState()
        }
        const userDtoList = await UserAPI.getUserByGrade(grade)
        setState({
            selectedUserId: state.selectedUserId,
            userList: userDtoList
        })
    }

    async function getDismissedUsers() {

        const userDtoList = await UserAPI.getDismissedUsers()
        setState({
            selectedUserId: state.selectedUserId,
            userList: userDtoList
        })
    }

    async function getUsersByName(name) {

        if (name === "") {
            setEmptyUserListToState()
        }

        const userDtoList = await UserAPI.getUsersByName(name)
        setState({
            selectedUserId: state.selectedUserId,
            userList: userDtoList
        })
    }

    async function getUsersByProject(project) {

        if (project === "") {
            setEmptyUserListToState()
        }
        const userDtoList = await UserAPI.getUsersByProject(project)
        setState({
            selectedUserId: state.selectedUserId,
            userList: userDtoList
        })
    }

    async function getUsersByDepartment(department) {

        if (department === "") {
            setEmptyUserListToState()
        }

        const userDtoList = await UserAPI.getUsersByDepartment(department)
        setState({
            selectedUserId: state.selectedUserId,
            userList: userDtoList
        })
    }

    async function getUsersBySupervisor(name) {

        if (name === "") {
            setEmptyUserListToState()
        }

        const userDtoList = await UserAPI.getUsersBySupervisorName(name)
        setState({
            selectedUserId: state.selectedUserId,
            userList: userDtoList
        })
    }

    function handleUserSelection(userId) {
        setState({
            selectedUserId: userId,
            userList: state.userList
        })
        setIsAdding(false)
    }

    function renderUserList(userDtoList) {

        if (userDtoList === undefined || userDtoList.length === 0) {
            return (
                <div className={`${classes.listLiInfoName}`}>Нет подходящих сотрудников</div>
            )
        }

        let renderedUserList = []

        userDtoList.sort((a, b) => a.name.localeCompare(b.name)).forEach((userDto) => {
                renderedUserList.push(
                    <li>
                        <div className={`${classes.listLiInfo}`}
                             onClick={(event) => handleUserSelection(userDto.id)}>
                            <div
                                className={`${classes.listLiInfoName}`}>{userDto.name}
                            </div>
                            <div className={`${classes.listLiInfoRoleProj}`}>
                                <div
                                    className={`${classes.listLiInfoRoleProjRoleBox}`}>
                                    <p>Роль:</p>
                                    <div className={`${classes.roleProjRoleBoxRole}`}>
                                        {localiseRole(userDto.role)}
                                    </div>
                                </div>
                                <div
                                    className={`${classes.listLiInfoRoleProjProjBox}`}>
                                    <p>Проект:</p>
                                    <div className={`${classes.roleProjRojBoxProj}`}>
                                        {(userDto.project !== "" && userDto.project !== null) ? userDto.project : "Нет"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                )
            })
        return renderedUserList
    }

    function renderFullInfoBlock() {

        if (isAdding) {
            return <AddUser/>
        }
        if (state.selectedUserId === -1) {
            return (
                <div className={`${classes.infoBlocks}`}>
                </div>
            )
        }

        return (
            <MainInfo key={state.selectedUserId} userId={state.selectedUserId}>
            </MainInfo>
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
                                    <button onClick={() => setIsAdding(!isAdding)}>
                                        <img src={add} alt="add"/>
                                    </button>
                                    <div>
                                        <input
                                            placeholder="Имя"
                                            id={"nameSearch"}
                                            onKeyUp={(event) => {
                                                if (event.key === 'Enter') {
                                                    getUsersByName(event.currentTarget.value)
                                                }
                                            }}
                                        />
                                        <button
                                            onClick={(event) => {
                                                getUsersByName(document.getElementById("nameSearch").value)
                                            }}
                                        >
                                            <img src={search} alt="search"/>
                                        </button>
                                    </div>
                                </div>
                                <div className={`${classes.menuColumns}`}>
                                    <div
                                        className={`${classes.columnsCol}`}>
                                        <select name="Grade"
                                                id=""
                                                onChange={(event) =>
                                                    getUsersByGrade(
                                                        event.currentTarget.value)}
                                        >
                                            <option value="">Уровень комп.
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
                                            <option value="Unspecified">Не
                                                указана
                                            </option>
                                        </select>
                                        <div action="">
                                            <input
                                                placeholder="Подразделение"
                                                id={"departmentSearch"}
                                                onKeyUp={(event) => {
                                                    if (event.key === 'Enter') {
                                                        getUsersByDepartment(event.currentTarget.value)
                                                    }
                                                }}
                                            />
                                            <button
                                                onClick={(event) => {
                                                    getUsersByDepartment(document.getElementById("departmentSearch").value)
                                                }}
                                            >
                                                <img src={search}
                                                     alt="search"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        className={`${classes.columnsCol}`}>
                                        <select name="Role"
                                                id=""
                                                onChange={(event) =>
                                                    getUsersByRole(
                                                        event.currentTarget.value)}
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
                                        <div action="">
                                            <input
                                                placeholder="Проект"
                                                id={"projectSearch"}
                                                onKeyUp={(event) => {
                                                    if (event.key === 'Enter') {
                                                        getUsersByProject(event.currentTarget.value)
                                                    }
                                                }}
                                            />
                                            <button
                                                onClick={(event) => {
                                                    getUsersByProject(document.getElementById("projectSearch").value)
                                                }}
                                            >
                                                <img src={search}
                                                     alt="search"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div action=""
                                      className={`${classes.menuSupervisor}`}>
                                    <input
                                        placeholder="Руководитель"
                                        id={"supervisorSearch"}
                                        onKeyUp={(event) => {
                                            if (event.key === 'Enter') {
                                                getUsersBySupervisor(event.currentTarget.value)
                                            }
                                        }}
                                    />
                                    <button
                                        onClick={(event) => {
                                            getUsersBySupervisor(document.getElementById("supervisorSearch").value)
                                        }}
                                    >
                                        <img src={search} alt="search"/>
                                    </button>
                                </div>
                                <button
                                    className={`${classes.menuFormerEmp}`}
                                    onClick={() => {
                                        getDismissedUsers()
                                    }}>
                                    Бывшие сотрудники
                                </button>
                            </div>
                            <ul className={`${classes.menuListBlockList}`}>
                                {renderUserList(state.userList)}
                                {/*{renderUserList(testUserList)}*/}
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