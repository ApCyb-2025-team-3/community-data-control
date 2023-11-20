import { Helmet } from 'react-helmet';
import classes from './employees.module.css';
import search from '../../icons/search-icon.svg';
import arrow from '../../icons/down-arrow-icon.svg';
import info from '../../icons/info-icon.svg';
import dot from '../../icons/dot-icon.svg';
import remove from '../../icons/remove-icon.svg';
import logo from '../../icons/safari-pinned-tab.svg';

function Employees() {

    function generate_employee_card(userDTO) {

        const name = "Frederic Gilbert"
        const email = "ocariz@bola389.bid"
        const project = "Apache Kafka"
        const department = "Data Science"
        const grade = "Senior"
        const role = "Scala Developer"

        return (
            <li>
                <div className={`${classes.userListInfoBlock}`}>
                    <div className={`${classes.mainInfoHeading}`}>
                        <p>Сотрудник:</p>
                        <div
                            className={`${classes.mainInfoHeadingName}`}>{name}
                        </div>
                    </div>
                    <div className={`${classes.mainInfoBody}`}>
                        <div className={`${classes.bodyEmail}`}>
                            <p>Email:</p>
                            <div
                                className={`${classes.bodyEmailAdress}`}>{email}
                            </div>
                        </div>
                        <div className={`${classes.bodyProject}`}>
                            <p>Проект:</p>
                            <div
                                className={`${classes.bodyProjectName}`}>{project}
                            </div>
                        </div>
                        <div className={`${classes.bodyDepartment}`}>
                            <p>Отдел:</p>
                            <div
                                className={`${classes.bodyDepartmentName}`}>{department}
                            </div>
                        </div>
                        <div className={`${classes.bodyGrade}`}>
                            <p>Позиция:</p>
                            <div
                                className={`${classes.bodyGradeName}`}>{grade}
                            </div>
                        </div>
                        <div className={`${classes.bodyRole}`}>
                            <p>Роль:</p>
                            <div
                                className={`${classes.bodyRoleName}`}>{role}
                            </div>
                        </div>
                        <div className={`${classes.bodyMoreButton}`}>
                            <button>
                                Подробнее
                                <img src={info} alt="info"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div style={{marginBottom: 36 + "rem"}}></div>
            </li>
        )
    }

    return (
        <>
        <Helmet>
            <title>Сотрудники — Community</title>
        </Helmet>
        <div className={`${classes.wrapperBodyContainer}`}>
            <div className={`${classes.bodyObtaining}`}>
            <p className={`${classes.bodyTitle}`}>Сотрудники</p>
            <div className={`${classes.bodyBlocksObtaining}`}>
                <div className={`${classes.upperBlocks}`}>
                    <div className={`${classes.listBlockControlPanel}`}>
                        <button className={`${classes.controlPanelAddButton}`}>
                            Добавить сотрудника
                        </button>
                        <form action="">
                            <input placeholder="ФИО"/>
                            <button>
                                <img src={search} alt="search"/>
                            </button>
                        </form>
                        <p>
                            Поиск по уровню компетенций
                        </p>
                        <select>
                            <option>Не выбрано</option>
                            <option>Junior</option>
                            <option>Middle</option>
                            <option>Senior</option>
                            <option>Team Lead</option>
                        </select>
                        <p>
                            Поиск по роли
                        </p>
                        <select>
                            <option>Не выбрано</option>
                            <option>Member</option>
                            <option>Data Engineer</option>
                            <option>Developer</option>
                            <option>Team Lead</option>
                            <option>Product Owner</option>
                            <option>Supervisor</option>
                            <option>Non member</option>
                        </select>
                        <form action="">
                            <input placeholder="Отдел"/>
                            <button>
                                <img src={search} alt="search"/>
                            </button>
                        </form>
                        <form action="">
                            <input placeholder="Проект"/>
                            <button>
                                <img src={search} alt="search"/>
                            </button>
                        </form>
                        <form action="">
                            <input placeholder="Руководитель"/>
                            <button>
                                <img src={search} alt="search"/>
                            </button>
                        </form>
                    </div>
                <div className={`${classes.listBlock}`}>
                    <ul className={`${classes.listBlockTable}`}>
                        {generate_employee_card()}
                        {generate_employee_card()}
                        {generate_employee_card()}
                    </ul>
                </div>
                <div className={`${classes.mainInfoBlock}`}>
                    <div className={`${classes.mainInfoHeading}`}>
                    <p>Сотрудник:</p>
                    <div className={`${classes.mainInfoHeadingName}`}>Frederic Gilbert</div>
                    </div>
                    <div className={`${classes.mainInfoBody}`}>
                    <div className={`${classes.bodyEmail}`}>
                        <p>Email:</p>
                        <div className={`${classes.bodyEmailAdress}`}>ocariz@bola389.bid</div>
                    </div>
                    <div className={`${classes.bodyProject}`}>
                        <p>Проект:</p>
                        <div className={`${classes.bodyProjectName}`}>Apache Kafka</div>
                    </div>
                    <div className={`${classes.bodyDepartment}`}>
                        <p>Отдел:</p>
                        <div className={`${classes.bodyDepartmentName}`}>Data Science</div>
                    </div>
                    <div className={`${classes.bodyGrade}`}>
                        <p>Позиция:</p>
                        <div className={`${classes.bodyGradeName}`}>Senior</div>
                    </div>
                    <div className={`${classes.bodyRole}`}>
                        <p>Роль:</p>
                        <div className={`${classes.bodyRoleName}`}>Scala-developer</div>
                    </div>
                    </div>
                    <div style={{marginTop: 3 + 'rem'}}>
                        <div className={`${classes.teamGrBlockTeam}`}>
                            <p>Команда:</p>
                            <div
                                className={`${classes.teamGrBlockTeamName}`}>Spauspauspau
                            </div>
                        </div>
                        <div className={`${classes.teamGrBlockLeader}`}>
                            <p>Лидер:</p>
                            <div
                                className={`${classes.teamGrBlockLeaderName}`}>Hawks
                                A.
                            </div>
                        </div>
                        <div className={`${classes.teamGrBlockGroups}`}>
                            <p>Группы:</p>
                            <ul className={`${classes.teamGrBlockGroupsTable}`}>
                                <li>
                                    <img src={dot} alt="dot"/>
                                    <div
                                        className={`${classes.teamGrBlockGroupsTableTitle}`}>Kafka_team
                                    </div>
                                    <button>
                                        <img src={remove} alt="remove"/>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div style={{marginTop: 1 + 'rem'}}>
                        <div className={`${classes.mentorshipBlock}`}>
                            <p>Менторство</p>
                            <div className={`${classes.mentorshipBlockBody}`}>
                                <div className={`${classes.mentorshipBlockBodyRole}`}>
                                    <p>Роль:</p>
                                    <div
                                        className={`${classes.mentorshipBlockBodyRoleMentee}`}
                                        style={{ display: "none" }}
                                    >
                                        менти
                                    </div>
                                    <div className={`${classes.mentorshipBlockBodyRoleMentor}`}>ментор</div>
                                </div>
                                <div
                                    className={`${classes.mentorshipBlockBodyMentor}`}
                                    style={{ display: "none" }}
                                >
                                    <p>Ментор:</p>
                                    <div className={`${classes.mentorshipBlockBodyMentorName}`}>
                                        Mironov Semyon Vitalievich
                                    </div>
                                </div>
                                <div className={`${classes.mentorshipBlockBodyMentees}`}>
                                    <p>Менти:</p>
                                    <ul className={`${classes.menteesTable}`}>
                                        <li>
                                            <img src={dot} alt="dot" />
                                            <div className={`${classes.menteesTableTitle}`}>Kafka_team</div>
                                            <button>
                                                <img src={remove} alt="remove" />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
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

export default Employees;