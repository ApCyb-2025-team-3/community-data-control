import { Helmet } from 'react-helmet';
import classes from './employees.module.css';
import add from '../../icons/add-icon.svg'
import search from '../../icons/search-icon.svg';
import arrow from '../../icons/down-arrow-icon.svg';
import info from '../../icons/info-icon.svg';
import dot from '../../icons/dot-icon.svg';
import remove from '../../icons/remove-icon.svg';
import logo from '../../icons/safari-pinned-tab.svg';
import React from "react";

class Employees extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedUserId: -1,
            userList : []
        }
    }

    testUserList = [
        {userId: 0, name: "Somehow", role: "Team Lead", project: ""},
        {userId: 1, name: "I", role: "Developer", project: "Apache Kafka"},
        {userId: 2, name: "Know", role: "Team Lead", project: "Apache Kafka"},
        {userId: 3, name: "Nothing", role: "Developer", project: "Apache Kafka"},
        {userId: 4, name: "However", role: "Product Owner", project: "Apache Kafka"}
    ]

    async getUsersByRole (role) {

        if (role === "") {
            return []
        }

        const url = process.env.REACT_APP_BACKEND_URL + "/api/user/getUsersByRole"

        try {
            const response = await fetch(url + "?role=" + role, {
                method: "GET",
                headers: {
                    "Origin": "http://localhost:3000",
                },
            });

            if (response.ok) {
                const userDtoList = await response.json()
                this.setState({
                    userList: userDtoList
                })

            } else {
                console.error("HTTP error:" + response.status + "\n" + response.statusText)
            }

        } catch (error) {
            console.error(error)
        }
    }

    async getUsersByGrade (grade) {

        if (grade === "") {
            return []
        }

        const url = process.env.REACT_APP_BACKEND_URL + "/api/user/getUsersByGrade"

        try {
            const response = await fetch(url + "?grade=" + grade, {
                method: "GET",
                headers: {
                    "Origin": "http://localhost:3000",
                },
            });

            if (response.ok) {
                const userDtoList = await response.json()
                this.setState({
                    userList: userDtoList
                })

            } else {
                console.error("HTTP error:" + response.status + "\n" + response.statusText)
            }

        } catch (error) {
            console.error(error)
        }
    }

    handleUserSelection = (userId) => {
        this.setState({
            selectedUserId: userId
        })
    }

    renderUserList(userDtoList) {

        if (userDtoList === undefined || userDtoList.length === 0) {
            return (
                <div className={`${classes.listLiInfoName}`}>Нет подходящих сотрудников</div>
            )
        }

        let renderedUserList = []
        let page = this

        userDtoList.forEach(function (userDto) {
            renderedUserList.push(
                <li>
                    <div className={`${classes.listLiInfo}`}
                         onClick={() => {console.log(userDto.userId); page.handleUserSelection(userDto.userId)}}>
                        <div className={`${classes.listLiInfoName}`}>{userDto.name}</div>
                        <div className={`${classes.listLiInfoRoleProj}`}>
                            <div className={`${classes.listLiInfoRoleProjTitles}`}>
                                <div>Роль:</div>
                                <div>Проект:</div>
                            </div>
                            <div className={`${classes.listLiInfoRoleProjBox}`}>
                                <div className={`${classes.roleProjBoxRole}`}>{userDto.role}</div>
                                <div className={`${classes.roleProjBoxProject}`}>{userDto.project !== "" ? userDto.project : "Нет"}</div>
                            </div>
                        </div>
                    </div>
                </li>
            )
        })
        return renderedUserList
    }

    renderFullInfoBlock() {

        if (this.state.selectedUserId === -1) {
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
                                <p>Email:</p>
                                <p>Проект:</p>
                                <p>Подразд.:</p>
                                <p>Ур. комп.:</p>
                                <p>Роль:</p>
                            </div>
                            <div className={`${classes.lPartInfoCol1Data}`}>
                                <div className={`${classes.lPartInfoCol1DataEmail}`}>ocariz@bola389.bid</div>
                                <div className={`${classes.lPartInfoCol1DataProj}`}>Apache Kafka</div>
                                <div className={`${classes.lPartInfoCol1DataDep}`}>Data Science</div>
                                <div className={`${classes.lPartInfoCol1DataGrade}`}>Senior</div>
                                <div className={`${classes.lPartInfoCol1DataRole}`}>Scala-developer</div>
                            </div>
                            <div className={`${classes.lPartInfoCol2Title}`}>
                                <p>Телефон:</p>
                                <p>Руковод.:</p>
                                <p>Дата рожд.:</p>
                                <div className={`${classes.lPartInfoCol2TitleDoB}`}>Pr. owners:</div>
                            </div>
                            <div className={`${classes.lPartInfoCol2Data}`}>
                                <div className={`${classes.lPartInfoCol2DataPhoneNum}`}>
                                    +7 (800) 555 35-35
                                </div>
                                <div className={`${classes.lPartInfoCol2DataSeprvisor}`}>Donald Trump</div>
                                <div className={`${classes.lPartInfoCol2DataDoB}`}>01.01.1900</div>
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
                                <p>ком. / группы</p>
                            </button>
                            <button className={`${classes.buttonMentorship}`}>
                                <img src={arrow} alt="arrow" />
                                <p>менторство</p>
                            </button>
                            <button className={`${classes.buttonEdit}`}>Внести изменения</button>
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

    render() {
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
                    <img src={add} alt="add" />
                    </button>
                    <form action="">
                    <input placeholder="Имя" />
                    <button>
                        <img src={search} alt="search" />
                    </button>
                    </form>
                </div>
                <div className={`${classes.menuColumns}`}>
                    <div className={`${classes.columnsCol}`}>
                    <select name="Grade"
                            id=""
                            onChange={(event) =>
                                this.getUsersByGrade(event.target.value)}
                    >
                        <option value="">Уровень комп.</option>
                        <option value="Junior">Junior</option>
                        <option value="Middle">Middle</option>
                        <option value="Senior">Senior</option>
                        <option value="Team Lead">Team Lead</option>
                        <option value="Not specified">Не указан</option>
                    </select>
                    <form action="">
                        <input placeholder="Подразд." />
                        <button>
                        <img src={search} alt="search" />
                        </button>
                    </form>
                    </div>
                    <div className={`${classes.columnsCol}`}>
                    <select name="Role"
                            id=""
                            onChange={(event) =>
                                this.getUsersByRole(event.target.value)}
                    >
                        <option value="">Роль</option>
                        <option value="Member">Участник</option>
                        <option value="Data Engineer">Дата Инженер</option>
                        <option value="Developer">Разработчик</option>
                        <option value="Team Lead">Team Lead</option>
                        <option value="Product Owner">Product Owner</option>
                        <option value="Supervisor">Руководитель</option>
                        <option value="Non member">Гость</option>
                    </select>
                    <form action="">
                        <input placeholder="Проект" />
                        <button>
                        <img src={search} alt="search" />
                        </button>
                    </form>
                    </div>
                </div>
                <form action="" className={`${classes.menuSupervisor}`}>
                    <input placeholder="Руководитель" />
                    <button>
                    <img src={search} alt="search" />
                    </button>
                </form>
                <button className={`${classes.menuFormerEmp}`}>Бывшие сотрудники</button>
                </div>
                <ul className={`${classes.menuListBlockList}`}>
                    {this.renderUserList(this.testUserList)}
                </ul>
            </div>
                {this.renderFullInfoBlock()}
            </div>
        </div>
        </div>
        <div className={`${classes.wrapperFooterContainer}`}>
            <div className={`${classes.footerInfobox}`}>
            <p className={`${classes.footerInfoboxCopyright}`}>© community</p>
            <p className={`${classes.footerInfoboxAttribution}`}>
            Icon made by Pixel perfect, Royyan Wijaya, th studio
            from www.flaticon.com
            </p>
            </div>
            <img src={logo} alt="logo" />
        </div>
        </>
    );
    }
}

export default Employees;