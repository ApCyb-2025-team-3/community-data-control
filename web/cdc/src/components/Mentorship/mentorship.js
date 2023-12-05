import { Helmet } from 'react-helmet'
import classes from './mentorship.module.css';
import add from '../../icons/add-icon.svg';
import sort from '../../icons/sort-icon.svg';
import date from '../../icons/sort-date-icon.svg';
import complete from '../../icons/complete-icon.svg';
import logo from '../../icons/safari-pinned-tab.svg';
import React, {useState} from "react";
import Popup from "reactjs-popup";
import AsyncSelect from 'react-select/async';
import axios from 'axios';

const Mentorship = () => {

    const[pairs, setPairs] = useState([])

    const[freeMentors, setFreeMentors] = useState([])

    const[freeMentees, setFreeMentees] = useState([])

    const[newPair, setNewPair] =useState({
        mentor: null,
        mentee: null,
        date: null
    })


    const customStyles = {
        control: provided => ({
            ...provided,
            width: '100%',
            height: '28px',
            border: '2px solid #000',
            borderRadius: '10px',
            outline: 'none',
            padding: '0',
            paddingLeft: '10px',
            marginRight: '200px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '2rem',
            fontStyle: 'normal',
            fontWeight: 300,
            lineHeight: 'normal',
            alignSelf: 'center'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#2684ff' : null,
            color: state.isSelected ? 'white' : 'black',
            fontFamily: 'Inter, sans-serif',
            fontSize: '2rem',
            fontStyle: 'normal',
            fontWeight: 300,
            lineHeight: 'normal',
            width: '100%',
            '&:hover': {
                backgroundColor: '#2684ff',
                color: 'white',
            },
        }),
        // Add more styles for other elements as needed
    };

    const promiseOptionsMentor = inputValue =>
        new Promise(resolve => resolve(freeMentors));

    const promiseOptionsMentee = inputValue =>
        new Promise(resolve => resolve(freeMentees));

    function changeDateFormat(str) {
        return(str[8] + str[9] + '.' + str[5] + str[6] + '.' + str[0] + str[1] + str[2] + str[3])
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

    window.addEventListener('load', () => {
        getPairs();
        getFreeMentors();
        getFreeMentees();
    });

    async function getPairs() {
        const url = process.env.REACT_APP_BACKEND_URL
        + "/api/mentorship/getAllMentorships"

        const pairsDtoList = await performGetRequest(url)
        setPairs(pairsDtoList)
    }

    async function getFreeMentors() {
        const url = process.env.REACT_APP_BACKEND_URL
        + "/api/mentorship/getFreeMentors"

        const pairsDtoList = await performGetRequest(url)
        setFreeMentors(pairsDtoList)
    }

    async function getFreeMentees() {
        const url = process.env.REACT_APP_BACKEND_URL
        + "/api/mentorship/getFreeMentees"

        const pairsDtoList = await performGetRequest(url)
        setFreeMentees(pairsDtoList)
    }

    async function deletePair(id) {
        try {
            const url = process.env.REACT_APP_BACKEND_URL + `/api/mentorship/disbandMentorship?mentorshipId ${id}`
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:3000'
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка запроса');
            }

            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
        getPairs()
    }

    async function sortByMentors(pairsDtoList) {

        pairsDtoList.sort((a, b) => a.mentorName.localeCompare(b.mentorName))

        setPairs(pairsDtoList)
    }

    async function sortByMentees(pairsDtoList) {

        pairsDtoList.sort((a, b) => a.menteeName.localeCompare(b.menteeName))

        setPairs(pairsDtoList)
    }

    async function sortByCreationDate(pairsDtoList) {

        pairsDtoList.sort(function(a, b) {
            return new Date(b.creationDate) - new Date(a.creationDate)
          })

          setPairs(pairsDtoList)
    }

    async function sortByDisbandmentDate(pairsDtoList) {

        pairsDtoList.sort(function(a, b) {
            return new Date(b.disbandmentDate) - new Date(a.disbandmentDate)
          })

          setPairs(pairsDtoList)
    }

    async function createPair() {
        try {
            const url = process.env.REACT_APP_BACKEND_URL 
            + "/api/mentorship/create?mentorId=" + encodeURIComponent(newPair.mentor)
            + "&menteeId=" + encodeURIComponent(newPair.mentee)
            + "&disbandmentDate=" + + encodeURIComponent(newPair.date)
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:3000'
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка запроса');
            }

            const result = await response.text();
            console.log(result);
            setNewPair({
                mentor: null,
                mentee: null,
                date: null
            })
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
        getPairs()
    }


    function renderPairs() {
        let renderedPairList = []

        pairs.forEach((pairDto) => {
            renderedPairList.push(
                 <li>
                 <div className={`${classes.programsTableBodyMentor}`}>{pairDto.mentorName}</div>
                 <div className={`${classes.programsTableBodyMentee}`}>{pairDto.menteeName}</div>
                 <div className={`${classes.programsTableBodyStartDate}`}>{changeDateFormat(pairDto.creationDate)}</div>
                 <div className={`${classes.programsTableBodyEndDate}`}>{changeDateFormat(pairDto.disbandmentDate)}</div>
                 <button className={`${classes.programsTableBodyComplete}`}
                 onClick={ () => {
                    deletePair(pairDto.id)
                }}
                >
                     <img src={complete} alt="complete" />
                 </button>
             </li>
            )
        })

        return renderedPairList
    }

    function renderFreeMentors(userDtoList) {
        let renderedPairList = []

        userDtoList.forEach((userDto) => {
            renderedPairList.push(
                <li>
                    <div>{userDto.name}</div>
                </li>
            )
        })

        return renderedPairList
    }

    function renderFreeMentees(userDtoList) {
        let renderedPairList = []

        userDtoList.forEach((userDto) => {
            renderedPairList.push(
                <li>
                    <div>{userDto.name}</div>
                </li>
            )
        })

        return renderedPairList
    }


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
                <Popup trigger=
                    {<button>
                        <img src={add} alt="add" />
                    </button>}
                    modal nested>
                    {
                        close => (
                            <div className={`${classes.popUpMask}`}>
                                <div className={`${classes.popUp}`}>
                                    <div className={`${classes.popUpContent}`}>
                                        Создание пары
                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                classNamePrefix="custom"
                                                className="custom-container"
                                                placeholder="Ментор  "
                                                styles={customStyles}
                                                loadOptions={promiseOptionsMentor}
                                                onChange={(selectedOption) => setNewPair({...newPair, mentor: selectedOption.id})}

                                            />

                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                classNamePrefix="custom"
                                                className="custom-container"
                                                placeholder="Менти  "
                                                styles={customStyles}
                                                loadOptions={promiseOptionsMentee}
                                                onChange={(selectedOption) => setNewPair({...newPair, mentee: selectedOption.id})}

                                            />
                                        <form action="">
                                            <input id={"teamName"} placeholder="MM-DD-YYYY"
                                            onChange={(event) => setNewPair({...newPair, date: event.target.value})}
                                            required/>
                                        </form>

                                        <div className={`${classes.popUpButtons}`}>
                                            <button onClick={(event) => {
                                                createPair()
                                                close()
                                            }}>
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
                            </div>
                        )
                    }
                </Popup>   
                </div>
                <div className={`${classes.programsTable}`}>
                <div className={`${classes.programsTableTitles}`}>
                    <div className={`${classes.titlesMentor}`}>
                        <p>Ментор</p>
                        <button 
                            onClick={ () => {
                                    sortByMentors(pairs)
                                }}
                        >
                            <img src={sort} alt="sort"/>
                        </button>
                    </div>
                    <div className={`${classes.titlesMentee}`}>
                        <p>Менти</p>
                        <button 
                            onClick={ () => {
                                    sortByMentees(pairs)
                                }}
                        >
                            <img src={sort} alt="sort"/>
                        </button>
                    </div>
                    <div className={`${classes.titlesStartDate}`}>
                        <p>Дата начала</p>
                        <button
                            onClick={ () => {
                                sortByCreationDate(pairs)
                            }}
                        >
                            <img src={date} alt="sort"/>
                        </button>
                    </div>
                    <div className={`${classes.titlesEndDate}`}>
                        <p>Дата конца</p>
                        <button
                            onClick={ () => {
                                sortByDisbandmentDate(pairs)
                            }}
                        >
                            <img src={date} alt="sort"/>
                        </button>
                    </div>
                    <p className={`${classes.titlesComplete}`}>Завершить</p>
                </div>
                <ul className={`${classes.programsTableBody}`}>
                    {renderPairs()}
                </ul>
                </div>
            </div>
            <div className={`${classes.blocksFreMen}`}>
                <div className={`${classes.freeMentors}`}>
                <p className={`${classes.freeMentorsTitle}`}>Свободные менторы</p>
                <ul className={`${classes.freeMentorsTable}`}>
                    {renderFreeMentors(freeMentors)}
                </ul>
                </div>
                <div className={`${classes.freeMentees}`}>
                <p className={`${classes.freeMenteesTitle}`}>Ожидающие менти</p>
                <ul className={`${classes.freeMenteesTable}`}>
                    {renderFreeMentees(freeMentees)}
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
    )
}

export default Mentorship;