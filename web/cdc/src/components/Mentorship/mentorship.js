import { Helmet } from 'react-helmet'
import classes from './mentorship.module.css';
import add from '../../icons/add-icon.svg';
import complete from '../../icons/complete-icon.svg';
import search from '../../icons/search-icon.svg';
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
                    <p className={`${classes.titlesMentor}`}>Ментор</p>
                    <p className={`${classes.titlesMentee}`}>Менти</p>
                    <p className={`${classes.titlesStartDate}`}>Дата начала</p>
                    <p className={`${classes.titlesEndDate}`}>Дата конца</p>
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
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
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
                <div className={`${classes.blockMenteeByMentor}`}>
                <div className={`${classes.menteeByMentorHeading}`}>
                    <p>Менти по ментору</p>
                    <form action="">
                    <input placeholder="Name" />
                    <button>
                        <img src={search} alt="" />
                    </button>
                    </form>
                </div>
                <ul className={`${classes.mentorsByMenteeTable}`}>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
                    <li>
                    <div>Pasternak Lavrenti Andreevich</div>
                    </li>
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