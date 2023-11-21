import { Helmet } from 'react-helmet';
import classes from './employees.module.css';
import arrow from '../../icons/down-arrow-icon.svg';
import dot from '../../icons/dot-icon.svg';
import remove from '../../icons/remove-icon.svg';
import logo from '../../icons/safari-pinned-tab.svg';
import InputField from './components/InputField';

function Employees() {
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
                <InputField />
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
                    <div className={`${classes.bodyButtons}`}>
                        <button>
                        <img src={arrow} alt="" />
                        <p>ком. / группы</p>
                        </button>
                        <button>
                        <img src={arrow} alt="" />
                        <p>менторство</p>
                        </button>
                        <button>Внести изм.</button>
                    </div>
                    </div>
                </div>
                </div>
                <div className={`${classes.bottomBlocks}`}>
                <div className={`${classes.teamGrBlock}`}>
                    <div className={`${classes.teamGrBlockTeam}`}>
                    <p>Команда:</p>
                    <div className={`${classes.teamGrBlockTeamName}`}>Spauspauspau</div>
                    </div>
                    <div className={`${classes.teamGrBlockLeader}`}>
                    <p>Лидер:</p>
                    <div className={`${classes.teamGrBlockLeaderName}`}>Hawks A.</div>
                    </div>
                    <div className={`${classes.teamGrBlockGroups}`}>
                    <p>Группы:</p>
                    <ul className={`${classes.teamGrBlockGroupsTable}`}>
                        <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.teamGrBlockGroupsTableTitle}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                        </li>
                        <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.teamGrBlockGroupsTableTitle}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                        </li>
                        <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.teamGrBlockGroupsTableTitle}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                        </li>
                        <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.teamGrBlockGroupsTableTitle}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                        </li>
                        <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.teamGrBlockGroupsTableTitle}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                        </li>
                        <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.teamGrBlockGroupsTableTitle}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                        </li>
                        <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.teamGrBlockGroupsTableTitle}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                        </li>
                        <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.teamGrBlockGroupsTableTitle}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                        </li>
                        <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.teamGrBlockGroupsTableTitle}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                        </li>
                        <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.teamGrBlockGroupsTableTitle}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                        </li>
                        <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.teamGrBlockGroupsTableTitle}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                        </li>
                        <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.teamGrBlockGroupsTableTitle}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                        </li>
                        <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.teamGrBlockGroupsTableTitle}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                        </li>
                        <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.teamGrBlockGroupsTableTitle}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                        </li>
                        <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.teamGrBlockGroupsTableTitle}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                        </li>
                        <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.teamGrBlockGroupsTableTitle}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                        </li>
                    </ul>
                    </div>
                </div>
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
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteesTableTitle}`}>Kafka_team</div>
                            <button>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteesTableTitle}`}>Kafka_team</div>
                            <button>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteesTableTitle}`}>Kafka_team</div>
                            <button>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteesTableTitle}`}>Kafka_team</div>
                            <button>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteesTableTitle}`}>Kafka_team</div>
                            <button>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteesTableTitle}`}>Kafka_team</div>
                            <button>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteesTableTitle}`}>Kafka_team</div>
                            <button>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteesTableTitle}`}>Kafka_team</div>
                            <button>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteesTableTitle}`}>Kafka_team</div>
                            <button>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteesTableTitle}`}>Kafka_team</div>
                            <button>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteesTableTitle}`}>Kafka_team</div>
                            <button>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteesTableTitle}`}>Kafka_team</div>
                            <button>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteesTableTitle}`}>Kafka_team</div>
                            <button>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
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