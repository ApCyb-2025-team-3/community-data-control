import { Helmet } from 'react-helmet'
import classes from './teams.module.css';
import add from '../../icons/add-icon.svg';
import info from '../../icons/info-icon.svg';
import dot from '../../icons/dot-icon.svg';
import remove from '../../icons/remove-icon.svg';
import logo from '../../icons/safari-pinned-tab.svg';

function Teams() {
    return(
        <>
            <Helmet>
                <title>Команды — Community</title>
            </Helmet>
            <div className={`${classes.wrapperBlocks}`}>
                <p>Команды</p>
                <div className={`${classes.blocksObtaining}`}>
                <div className={`${classes.leftBlock}`}>
                    <div className={`${classes.teamsControlPanel}`}>
                    <div className={`${classes.panelAddTeam}`}>
                        <p>Команды</p>
                        <button className={`${classes.panelAddTeamButton}`}>
                        <img src={add} alt="add" />
                        </button>
                    </div>
                    <div className={`${classes.panelSwitch}`}>
                        <button className={`${classes.switchAll}`}>все</button>
                        <button className={`${classes.switchActive}`}>активные</button>
                    </div>
                    </div>
                    <ul className={`${classes.teamsTable}`}>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.lilActive}`} />
                        <div className={`${classes.lilName}`}>Spauspauspau</div>
                        <div className={`${classes.lilLeader}`}>Yurasov I.</div>
                        <div className={`${classes.lilCreation}`}>24.10</div>
                        <button className={`${classes.lilInfo}`}>
                        <img src={info} alt="info" />
                        </button>
                    </li>
                    </ul>
                </div>
                <div className={`${classes.rightBlock}`}>
                    <div className={`${classes.teamInfoHeading}`}>
                    <div className={`${classes.headingTitle}`}>
                        <p>Команда:</p>
                        <div className={`${classes.headingTitleTeamName}`}>Spauspauspau</div>
                    </div>
                    <div className={`${classes.headingActivity}`}>
                        <p>Активность:</p>
                        <div className={`${classes.headingActivityStatus}`} />
                    </div>
                    </div>
                    <div className={`${classes.infoBody}`}>
                    <div className={`${classes.bodyLeacre}`}>
                        <div className={`${classes.leacreLeader}`}>
                        <p>Лидер:</p>
                        <div className={`${classes.leacreLeaderName}`}>Yurasov I.</div>
                        </div>
                        <div className={`${classes.leacreCreated}`}>
                        <p>Создана:</p>
                        <div className={`${classes.leacreCreatedDate}`}>10.10</div>
                        </div>
                    </div>
                    <div className={`${classes.bodyDescription}`}>
                        <p>Описание:</p>
                        <div className={`${classes.bodyDescriptionText}`}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Scelerisque eu ultrices vitae auctor eu augue ut. Tortor consequat
                        id porta nibh venenatis cras sed felis. Mauris nunc congue nisi
                        vitae suscipit tellus mauris. Vitae auctor eu augue ut lectus arcu
                        bibendum.
                        </div>
                    </div>
                    <div className={`${classes.bodyMembers}`}>
                        <p>Члены:</p>
                        <ul className={`${classes.bodyMembersTable}`}>
                        <li>
                            <div className={`${classes.lirNamebox}`}>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.lirNameboxName}`}>Gary Carter</div>
                            </div>
                            <div className={`${classes.lirEmail}`}>badlimp@wuupr.com</div>
                            <button className={`${classes.lirRemove}`}>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <div className={`${classes.lirNamebox}`}>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.lirNameboxName}`}>Gary Carter</div>
                            </div>
                            <div className={`${classes.lirEmail}`}>badlimp@wuupr.com</div>
                            <button className={`${classes.lirRemove}`}>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <div className={`${classes.lirNamebox}`}>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.lirNameboxName}`}>Gary Carter</div>
                            </div>
                            <div className={`${classes.lirEmail}`}>badlimp@wuupr.com</div>
                            <button className={`${classes.lirRemove}`}>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <div className={`${classes.lirNamebox}`}>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.lirNameboxName}`}>Gary Carter</div>
                            </div>
                            <div className={`${classes.lirEmail}`}>badlimp@wuupr.com</div>
                            <button className={`${classes.lirRemove}`}>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <div className={`${classes.lirNamebox}`}>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.lirNameboxName}`}>Gary Carter</div>
                            </div>
                            <div className={`${classes.lirEmail}`}>badlimp@wuupr.com</div>
                            <button className={`${classes.lirRemove}`}>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <div className={`${classes.lirNamebox}`}>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.lirNameboxName}`}>Gary Carter</div>
                            </div>
                            <div className={`${classes.lirEmail}`}>badlimp@wuupr.com</div>
                            <button className={`${classes.lirRemove}`}>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <div className={`${classes.lirNamebox}`}>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.lirNameboxName}`}>Gary Carter</div>
                            </div>
                            <div className={`${classes.lirEmail}`}>badlimp@wuupr.com</div>
                            <button className={`${classes.lirRemove}`}>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <div className={`${classes.lirNamebox}`}>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.lirNameboxName}`}>Gary Carter</div>
                            </div>
                            <div className={`${classes.lirEmail}`}>badlimp@wuupr.com</div>
                            <button className={`${classes.lirRemove}`}>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <div className={`${classes.lirNamebox}`}>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.lirNameboxName}`}>Gary Carter</div>
                            </div>
                            <div className={`${classes.lirEmail}`}>badlimp@wuupr.com</div>
                            <button className={`${classes.lirRemove}`}>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <div className={`${classes.lirNamebox}`}>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.lirNameboxName}`}>Gary Carter</div>
                            </div>
                            <div className={`${classes.lirEmail}`}>badlimp@wuupr.com</div>
                            <button className={`${classes.lirRemove}`}>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        <li>
                            <div className={`${classes.lirNamebox}`}>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.lirNameboxName}`}>Gary Carter</div>
                            </div>
                            <div className={`${classes.lirEmail}`}>badlimp@wuupr.com</div>
                            <button className={`${classes.lirRemove}`}>
                            <img src={remove} alt="remove" />
                            </button>
                        </li>
                        </ul>
                    </div>
                    <div className={`${classes.bodyUpdate}`}>
                        <p>Дата изм.:</p>
                        <div className={`${classes.bodyUpdateDate}`}>23.08</div>
                    </div>
                    <div className={`${classes.bodyButtons}`}>
                        <button>Внести изменения</button>
                        <button>+ сотрудника</button>
                        <button>Расформировать</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className={`${classes.wrapperFooterContainer}`}>
                <div className={`${classes.footerInfobox}`}>
                <p className={`${classes.footerInfoboxCopyright}`}>© community</p>
                <p className={`${classes.footerInfoboxAttribution}`}>
                    Icon made by Pixel perfect, Freepik, Radhe Icon, Royyan Wijaya from
                    www.flaticon.com
                </p>
                </div>
                <img src={logo} alt="logo" />
            </div>
            </>
    )
}

export default Teams;