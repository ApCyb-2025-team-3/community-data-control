import { Helmet } from 'react-helmet';
import classes from './employees.module.css';
import add from '../../icons/add-icon.svg'
import search from '../../icons/search-icon.svg';
import arrow from '../../icons/down-arrow-icon.svg';
import info from '../../icons/info-icon.svg';
import dot from '../../icons/dot-icon.svg';
import remove from '../../icons/remove-icon.svg';
import logo from '../../icons/safari-pinned-tab.svg';

function Employees() {
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
                    <select name="Grade" id="">
                        <option value="">Уровень ком.</option>
                    </select>
                    <form action="">
                        <input placeholder="Подразд." />
                        <button>
                        <img src={search} alt="search" />
                        </button>
                    </form>
                    </div>
                    <div className={`${classes.columnsCol}`}>
                    <select name="Role" id="">
                        <option value="">Роль</option>
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
                <li>
                    <div className={`${classes.listLiInfo}`}>
                    <div className={`${classes.listLiInfoName}`}>Mironov Semyon Vitalievich</div>
                    <div className={`${classes.listLiInfoRoleProj}`}>
                        <div className={`${classes.listLiInfoRoleProjTitles}`}>
                        <div>Роль:</div>
                        <div>Проект:</div>
                        </div>
                        <div className={`${classes.listLiInfoRoleProjBox}`}>
                        <div className={`${classes.roleProjBoxRole}`}>Scala-developer</div>
                        <div className={`${classes.roleProjBoxProject}`}>Apache Spark</div>
                        </div>
                    </div>
                    </div>
                    <button>
                    <img src={info} alt="info" />
                    </button>
                </li>
                <li>
                    <div className={`${classes.listLiInfo}`}>
                    <div className={`${classes.listLiInfoName}`}>Mironov Semyon Vitalievich</div>
                    <div className={`${classes.listLiInfoRoleProj}`}>
                        <div className={`${classes.listLiInfoRoleProjTitles}`}>
                        <div>Роль:</div>
                        <div>Проект:</div>
                        </div>
                        <div className={`${classes.listLiInfoRoleProjBox}`}>
                        <div className={`${classes.roleProjBoxRole}`}>Scala-developer</div>
                        <div className={`${classes.roleProjBoxProject}`}>Apache Spark</div>
                        </div>
                    </div>
                    </div>
                    <button>
                    <img src={info} alt="info" />
                    </button>
                </li>
                <li>
                    <div className={`${classes.listLiInfo}`}>
                    <div className={`${classes.listLiInfoName}`}>Mironov Semyon Vitalievich</div>
                    <div className={`${classes.listLiInfoRoleProj}`}>
                        <div className={`${classes.listLiInfoRoleProjTitles}`}>
                        <div>Роль:</div>
                        <div>Проект:</div>
                        </div>
                        <div className={`${classes.listLiInfoRoleProjBox}`}>
                        <div className={`${classes.roleProjBoxRole}`}>Scala-developer</div>
                        <div className={`${classes.roleProjBoxProject}`}>Apache Spark</div>
                        </div>
                    </div>
                    </div>
                    <button>
                    <img src={info} alt="info" />
                    </button>
                </li>
                <li>
                    <div className={`${classes.listLiInfo}`}>
                    <div className={`${classes.listLiInfoName}`}>Mironov Semyon Vitalievich</div>
                    <div className={`${classes.listLiInfoRoleProj}`}>
                        <div className={`${classes.listLiInfoRoleProjTitles}`}>
                        <div>Роль:</div>
                        <div>Проект:</div>
                        </div>
                        <div className={`${classes.listLiInfoRoleProjBox}`}>
                        <div className={`${classes.roleProjBoxRole}`}>Scala-developer</div>
                        <div className={`${classes.roleProjBoxProject}`}>Apache Spark</div>
                        </div>
                    </div>
                    </div>
                    <button>
                    <img src={info} alt="info" />
                    </button>
                </li>
                <li>
                    <div className={`${classes.listLiInfo}`}>
                    <div className={`${classes.listLiInfoName}`}>Mironov Semyon Vitalievich</div>
                    <div className={`${classes.listLiInfoRoleProj}`}>
                        <div className={`${classes.listLiInfoRoleProjTitles}`}>
                        <div>Роль:</div>
                        <div>Проект:</div>
                        </div>
                        <div className={`${classes.listLiInfoRoleProjBox}`}>
                        <div className={`${classes.roleProjBoxRole}`}>Scala-developer</div>
                        <div className={`${classes.roleProjBoxProject}`}>Apache Spark</div>
                        </div>
                    </div>
                    </div>
                    <button>
                    <img src={info} alt="info" />
                    </button>
                </li>
                </ul>
            </div>
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