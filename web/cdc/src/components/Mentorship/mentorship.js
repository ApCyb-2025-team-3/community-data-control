import { Helmet } from 'react-helmet'
import classes from './mentorship.module.css';
import add from '../../icons/add-icon.svg';
import sort from '../../icons/sort-icon.svg';
import date from '../../icons/sort-date-icon.svg';
import complete from '../../icons/complete-icon.svg';
import logo from '../../icons/safari-pinned-tab.svg';

function Mentorship() {
    return (
        <>
        <Helmet>
            <title>Менторство — Community</title>
        </Helmet>
        <div className={`${classes.wrapperBlocksContainer}`}>
            <p className={`${classes.wrapperBlocksContainerTitle}`}>Программа менторства</p>
            <div className={`${classes.blocksObtaining}`}>
            <div className={`${classes.blockPrograms}`}>
                <div className={`${classes.programsControlPanel}`}>
                <p>Действующие пары</p>
                <button>
                    <img src={add} alt="add" />
                </button>
                </div>
                <div className={`${classes.programsTable}`}>
                <div className={`${classes.programsTableTitles}`}>
                    <div className={`${classes.titlesMentor}`}>
                        <p>Ментор</p>
                        <button>
                            <img src={sort} alt="sort"/>
                        </button>
                    </div>
                    <div className={`${classes.titlesMentee}`}>
                        <p>Менти</p>
                        <button>
                            <img src={sort} alt="sort"/>
                        </button>
                    </div>
                    <div className={`${classes.titlesStartDate}`}>
                        <p>Дата начала</p>
                        <button>
                            <img src={date} alt="sort"/>
                        </button>
                    </div>
                    <div className={`${classes.titlesEndDate}`}>
                        <p>Дата конца</p>
                        <button>
                            <img src={date} alt="sort"/>
                        </button>
                    </div>
                    <p className={`${classes.titlesComplete}`}>Завершить</p>
                </div>
                <ul className={`${classes.programsTableBody}`}>
                    <li>
                        <div className={`${classes.programsTableBodyMentor}`}>
                            Shchegolyayev Kazimir Ivanovich
                        </div>
                        <div className={`${classes.programsTableBodyMentee}`}>
                            Barkov Vaniamin Yurievich
                        </div>
                        <div className={`${classes.programsTableBodyStartDate}`}>88.88.8888</div>
                        <div className={`${classes.programsTableBodyEndDate}`}>88.88.8888</div>
                        <button className={`${classes.programsTableBodyComplete}`}>
                            <img src={complete} alt="complete" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.programsTableBodyMentor}`}>
                            Shchegolyayev Kazimir Ivanovich
                        </div>
                        <div className={`${classes.programsTableBodyMentee}`}>
                            Barkov Vaniamin Yurievich
                        </div>
                        <div className={`${classes.programsTableBodyStartDate}`}>24.10</div>
                        <div className={`${classes.programsTableBodyEndDate}`}>31.12</div>
                        <button className={`${classes.programsTableBodyComplete}`}>
                            <img src={complete} alt="complete" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.programsTableBodyMentor}`}>
                            Shchegolyayev Kazimir Ivanovich
                        </div>
                        <div className={`${classes.programsTableBodyMentee}`}>
                            Barkov Vaniamin Yurievich
                        </div>
                        <div className={`${classes.programsTableBodyStartDate}`}>24.10</div>
                        <div className={`${classes.programsTableBodyEndDate}`}>31.12</div>
                        <button className={`${classes.programsTableBodyComplete}`}>
                            <img src={complete} alt="complete" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.programsTableBodyMentor}`}>
                            Shchegolyayev Kazimir Ivanovich
                        </div>
                        <div className={`${classes.programsTableBodyMentee}`}>
                            Barkov Vaniamin Yurievich
                        </div>
                        <div className={`${classes.programsTableBodyStartDate}`}>24.10</div>
                        <div className={`${classes.programsTableBodyEndDate}`}>31.12</div>
                        <button className={`${classes.programsTableBodyComplete}`}>
                            <img src={complete} alt="complete" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.programsTableBodyMentor}`}>
                            Shchegolyayev Kazimir Ivanovich
                        </div>
                        <div className={`${classes.programsTableBodyMentee}`}>
                            Barkov Vaniamin Yurievich
                        </div>
                        <div className={`${classes.programsTableBodyStartDate}`}>24.10</div>
                        <div className={`${classes.programsTableBodyEndDate}`}>31.12</div>
                        <button className={`${classes.programsTableBodyComplete}`}>
                            <img src={complete} alt="complete" />
                        </button>
                    </li>
                </ul>
                </div>
            </div>
            <div className={`${classes.blocksFreMen}`}>
                <div className={`${classes.freeMentors}`}>
                <p className={`${classes.freeMentorsTitle}`}>Свободные менторы</p>
                <ul className={`${classes.freeMentorsTable}`}>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                </ul>
                </div>
                <div className={`${classes.freeMentees}`}>
                <p className={`${classes.freeMenteesTitle}`}>Ожидающие менти</p>
                <ul className={`${classes.freeMenteesTable}`}>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        <div className={`${classes.wrapperFooterContainer}`}>
            <div className={`${classes.footerInfobox}`}>
            <p className={`${classes.footerInfoboxCopyright}`}>© community</p>
            <p className={`${classes.footerInfoboxAttribution}`}>
                Icon made by Pixel perfect, Freepik from www.flaticon.com
            </p>
            </div>
            <img src={logo} alt="logo" />
        </div>
        </>
    );
}

export default Mentorship;