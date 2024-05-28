import { Helmet } from 'react-helmet'
import classes from './mentorship.module.css';
import add from '../../icons/add-icon.svg';
import sort from '../../icons/sort-icon.svg';
import date from '../../icons/sort-date-icon.svg';
import complete from '../../icons/complete-icon.svg';
import remove from '../../icons/remove-icon.svg';
import logo from '../../icons/safari-pinned-tab.svg';
import React, {useState} from "react";
import Popup from "reactjs-popup";
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { MentAPI } from './MentAPI'

const Mentorship = () => {

    const[pairs, setPairs] = useState([])

    const[freeMentors, setFreeMentors] = useState([])

    const[freeMentees, setFreeMentees] = useState([])

    const[newPair, setNewPair] =useState({
        mentor: null,
        mentee: null,
        creationDate: "2024/05/28",
        disbandmentDate: "2024/05/28"
    })

    const[isSet, setIsSet] = useState({
        id: null,
        isSet: false
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


    function changeDateFormat(str) {
        return(str[8] + str[9] + '.' + str[5] + str[6] + '.' + str[0] + str[1] + str[2] + str[3])
    }

    function dateConverterAsParam(str) {
        return(str[0] + str[1] + str[2] + str[3] + '/' + str[5] + str[6] + '/' + str[8] + str[9])
    }


    const getMentors = async (inputValue) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL_GROUP}/api/mentorship/getAllMentors`, { withCredentials: true});

            if (response) {
                return response.data
                    .filter(user => user.name.toLowerCase().includes(inputValue.toLowerCase()))  // Filter users based on inputValue
                    .map(user => ({
                        id: user.id,
                        value: user.name,
                        label: user.name
                    }));
            } else {
                return [];
            }
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
            return [];
        }
    };

    
    const getUser = async (inputValue) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/getUsersByPartialName?partialName=${encodeURIComponent(inputValue)}`, { withCredentials: true});
    
            if (response) {
                return response.data
                    .filter(user => user.name.toLowerCase().includes(inputValue.toLowerCase()))  // Filter users based on inputValue
                    .map(user => ({
                        id: user.id,
                        value: user.name,
                        label: user.name
                    }));
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    };

    const getMentees = async (inputValue) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL_GROUP}/api/mentorship/getAllMentees`, { withCredentials: true});

            if (response) {
                return response.data
                    .filter(user => user.name.toLowerCase().includes(inputValue.toLowerCase()))  // Filter users based on inputValue
                    .map(user => ({
                        id: user.id,
                        value: user.name,
                        label: user.name
                    }));
            } else {
                return [];
            }
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
            return [];
        }
    };


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
        const pairsDtoList = await MentAPI.getPairs()
        setPairs(pairsDtoList)
    }

    async function getFreeMentors() {
        const pairsDtoList = await MentAPI.getFreeMentors()
        setFreeMentors(pairsDtoList)
    }

    async function getFreeMentees() {
        const pairsDtoList = await MentAPI.getFreeMentees()
        setFreeMentees(pairsDtoList)
    }

    async function deletePair(id) {
        MentAPI.deletePair(id);
        getPairs()
    }

    async function sortByMentors(pairsDtoList) {
        if (!(pairsDtoList === undefined || pairsDtoList.length === 0)) {
            pairsDtoList.sort((a, b) => a.mentorName.localeCompare(b.mentorName))
        }
        setPairs(pairsDtoList)
    }

    async function sortByMentees(pairsDtoList) {
        if (!(pairsDtoList === undefined || pairsDtoList.length === 0)) {
            pairsDtoList.sort((a, b) => a.menteeName.localeCompare(b.menteeName))
        }
        setPairs(pairsDtoList)
    }

    async function sortByCreationDate(pairsDtoList) {
        if (!(pairsDtoList === undefined || pairsDtoList.length === 0)) {
            pairsDtoList.sort(function(a, b) {
                return new Date(b.creationDate) - new Date(a.creationDate)
            })
        }
        setPairs(pairsDtoList)
    }

    async function sortByDisbandmentDate(pairsDtoList) {
        if (!(pairsDtoList === undefined || pairsDtoList.length === 0)) {
            pairsDtoList.sort(function(a, b) {
                return new Date(b.disbandmentDate) - new Date(a.disbandmentDate)
            })
        }
          setPairs(pairsDtoList)
    }

    async function createPair() {
        MentAPI.createPair(newPair.mentor, newPair.mentee, newPair.creationDate, newPair.disbandmentDate)
        setNewPair({ mentor: null, mentee: null, creationDate: "2024/05/28", disbandmentDate: "2024/05/28"})
        getPairs()
    }


    function renderPairs() {
        let renderedPairList = []

        if (pairs === null || pairs === undefined) {
                renderedPairList.push(
                    <li>
                        <div className={`${classes.programsTableBodyMentor}`}></div>
                        <div className={`${classes.programsTableBodyMentee}`}>Empty</div>
                        <div className={`${classes.programsTableBodyStartDate}`}></div>
                        <div className={`${classes.programsTableBodyEndDate}`}></div>
                    </li>
                )
            return renderedPairList
        } 

        pairs.forEach((pairDto) => {
            renderedPairList.push(
                 <li>
                    <div className={`${classes.programsTableBodyMentor}`}>{pairDto.mentorName}</div>
                    <div className={`${classes.programsTableBodyMentee}`}>{pairDto.menteeName}</div>
                    <div className={`${classes.programsTableBodyStartDate}`}>{changeDateFormat(pairDto.creationDate)}</div>
                    <div className={`${classes.programsTableBodyEndDate}`}>{changeDateFormat(pairDto.disbandmentDate)}</div>
                 <button className={`${classes.programsTableBodyComplete}`}
                 onClick={ () => {
                    deletePair(pairDto.id);
                    getPairs();
                    alert("Обновите страницу!")
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

        if (userDtoList === null || userDtoList === undefined) {
            renderedPairList.push(
                <li></li>
            )

            return renderedPairList
        }

        userDtoList.forEach((userDto) => {
            renderedPairList.push(
                <li>
                    <div>{userDto.name}</div>
                    <button className={`${classes.programsTableBodyComplete}`}
                    onClick={ () => {
                        MentAPI.removeFromProgram(userDto.id);
                        getFreeMentors();
                        alert("Обновите страницу!")
                    }}
                    >
                        <img src={remove} alt="remove" />
                    </button>
                </li>
            )
        })

        return renderedPairList
    }

    function renderFreeMentees(userDtoList) {
        let renderedPairList = []

        if (userDtoList === null || userDtoList === undefined) {
            renderedPairList.push(
                <li></li>
            )

            return renderedPairList
        }

        userDtoList.forEach((userDto) => {
            renderedPairList.push(
                <li>
                    <div>{userDto.name}</div>
                    <button className={`${classes.programsTableBodyComplete}`}
                    onClick={ () => {
                        MentAPI.removeFromProgram(userDto.id);
                        getFreeMentees();
                        alert("Обновите страницу!")
                    }}
                    >
                        <img src={remove} alt="remove" />
                    </button>
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
                                        <p>Создание пары</p>
                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                classNamePrefix="custom"
                                                className="custom-container"
                                                placeholder="Ментор*  "
                                                styles={customStyles}
                                                loadOptions={getMentors}
                                                onChange={(selectedOption) => setNewPair({...newPair, mentor: selectedOption.id})}

                                            />

                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                classNamePrefix="custom"
                                                className="custom-container"
                                                placeholder="Менти*  "
                                                styles={customStyles}
                                                loadOptions={getMentees}
                                                onChange={(selectedOption) => setNewPair({...newPair, mentee: selectedOption.id})}

                                            />
                                        <form>
                                            <input type='date'
                                                defaultValue="2024-05-28"
                                                min="1992-01-01"
                                                onChange={(event) => setNewPair({...newPair, creationDate: dateConverterAsParam(event.target.value)})} 
                                            />
                                        </form>

                                        <form>
                                            <input type='date'
                                                defaultValue="2024-05-28"
                                                min="1992-01-01"
                                                onChange={(event) => setNewPair({...newPair, disbandmentDate: dateConverterAsParam(event.target.value)})} 
                                            />
                                        </form>

                                        <div className={`${classes.popUpButtons}`}>
                                            <button onClick={(event) => {
                                                const minDate = new Date("1992-01-01");
                                                const varCrDate = new Date(newPair.creationDate);
                                                const varDiDate = new Date(newPair.disbandmentDate);
                                                const today = new Date();

                                                if (varCrDate < minDate || varCrDate > today || varCrDate > varDiDate) {
                                                    alert("Некорректная дата начала!");
                                                }
                                                else if (varDiDate < minDate || varCrDate > varDiDate) {
                                                    alert("Некорректная дата конца!");
                                                }
                                                else {
                                                    createPair();
                                                    setNewPair({
                                                        mentor: null,
                                                        mentee: null,
                                                        creationDate: "2024/05/28",
                                                        disbandmentDate: "2024/05/28"
                                                    });
                                                    alert("Обновите страницу!")
                                                    close();
                                                    //window.location.reload();
                                                }
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
                <div className={`${classes.programsControlPanel}`} style={{width: '100%'}}>
                <p>Свободные менторы</p>
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
                                        <p>Добавление ментора</p>
                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                classNamePrefix="custom"
                                                className="custom-container"
                                                placeholder="Ментор*  "
                                                styles={customStyles}
                                                loadOptions={getUser}
                                                onChange={(selectedOption) => setIsSet({
                                                    id: selectedOption.id,
                                                    isSet: true
                                                })}

                                            />
                                        <div className={`${classes.popUpButtons}`}>
                                            <button onClick={(event) => {

                                                if (!isSet.isSet) {
                                                    alert("Выберите ментора!");
                                                }
                                                else {
                                                    MentAPI.becomeMentor(isSet.id);
                                                    setIsSet({
                                                        id: null,
                                                        isSet: false
                                                    });
                                                    alert("Обновите страницу!")
                                                    close();
                                                    //window.location.reload();
                                                }
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
                <ul className={`${classes.freeMentorsTable}`}>
                    {renderFreeMentors(freeMentors)}
                </ul>
                </div>
                <div className={`${classes.freeMentees}`}>
                <div className={`${classes.programsControlPanel}`} style={{width: '100%'}}>
                <p>Ожидающие менти</p>
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
                                        <p>Добавление менти</p>
                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                classNamePrefix="custom"
                                                className="custom-container"
                                                placeholder="Менти*  "
                                                styles={customStyles}
                                                loadOptions={getUser}
                                                onChange={(selectedOption) => setIsSet({
                                                    id: selectedOption.id,
                                                    isSet: true
                                                })}

                                            />
                                        <div className={`${classes.popUpButtons}`}>
                                            <button onClick={(event) => {

                                                if (!isSet.isSet) {
                                                    alert("Выберите менти!");
                                                }
                                                else {
                                                    MentAPI.becomeMentee(isSet.id);
                                                    setIsSet({
                                                        id: null,
                                                        isSet: false
                                                    });
                                                    alert("Обновите страницу!")
                                                    close();
                                                    //window.location.reload();
                                                }
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