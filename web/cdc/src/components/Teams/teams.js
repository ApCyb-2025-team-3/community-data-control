import { Helmet } from 'react-helmet'
import classes from './teams.module.css';
import add from '../../icons/add-icon.svg';
import search from '../../icons/search-icon.svg';
import sort from '../../icons/sort-icon.svg';
import date from '../../icons/sort-date-icon.svg';
import dot from '../../icons/dot-icon.svg';
import remove from '../../icons/remove-icon.svg';
import logo from '../../icons/safari-pinned-tab.svg';
import React, {useEffect, useState} from "react";
import Popup from "reactjs-popup";
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { TeamAPI } from './TeamAPI';

const Teams = () => {

    const [isLoading, setIsLoading] = useState(true)

    const [state, setState] = useState({
        isGroupSelected: 0,
        selectedGroup: null,
        groupList: []
    })

    const [chosen, setChosen] = useState('активные')

    const [content, setContent] = useState("")

    const [obtainingState, setObtainingState] = useState({
        justifyContent: "center"
    })

    const [memberList, setMemberList] = useState([])

    const [teamLead, setTeamLead] = useState(null)

    const [serviceDate, setServiceDate] = useState("2024/05/27")

    const [newInformation, setNewInformation] = useState({
        name: null,
        type: "WORKING_TEAM",
        description: null
    })

    const [modifiedInfo, setModifiedInfo] = useState({
        id: null,
        name: null,
        description: null,
        teamLead: null,
    })

    const [createAllFilled, setCreateAllFilled] = useState({
        isTeamleadSet: false,
        isNameSet: false
    })

    const [disbandmentReason, setDisbandmentReason] = useState(null)

    // const [acceptUser, setAcceptUser] = setState(false)

    useEffect(() => {
        async function startThePage() {
            try {
                getActiveTeams();
                setIsLoading(false);
            } catch (error) {
                
            }
        }

        startThePage()
    }, [])

    async function getTeamleads() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/getUsersByRole?role=Team Lead`, { withCredentials: true});

            if (response) {
                return response.data.map(user => ({
                    id: user.id,
                    value: user.name,
                    label: user.name
                }));
            }
            else return;
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

    // const promiseOptions = inputValue =>
    //     new Promise(resolve => resolve(getUsers(inputValue)));




    async function performGetRequest(url) {
        try {
            const response = await axios.get(url, 
            // {
            //     method: "GET",
            //     headers: {
            //         "Origin": "http://localhost:3000",
            //     },
            // }
            {withCredentials: true}
        );

            if (response.ok) {
                return await response.json()
            
            } else {
                console.error("HTTP error:" + response.status + "\n" + response.statusText)
            }

        } catch (error) {
            console.error(error)
        }
    };

    window.addEventListener('load', () => {
        getActiveTeams();
    });

    function setEmptyGroupListToState() {
        setState({
            isGroupSelected: state.isGroupSelected,
            userList: []
        })
    }

    async function updateTeam() {
        try {
            const url = process.env.REACT_APP_BACKEND_URL + "/api/group/update"
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:3000'
                },
                body: JSON.stringify(modifiedInfo)
            });

            if (!response.ok) {
                throw new Error('Ошибка запроса');
            }

            const result = await response.text();
            console.log(result);
            setModifiedInfo({
                id: null,
                name: null,
                description: null,
                teamLead: null,
            })
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
        getActiveTeams()
    }

    async function getTeamByName(name) {
        if (name === "") {setEmptyGroupListToState()}
        const userDtoList = await TeamAPI.getTeamByName(name)
        setState({...state, groupList: userDtoList})
    }

    async function acceptMember(groupId, userId) {
        try {
            const url = process.env.REACT_APP_BACKEND_URL + `/api/group/accept?groupId=${groupId}&userId=${userId}`
            const response = await fetch(url, {
                method: 'PATCH',
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
        getActiveMembers(groupId)
    }

    async function addNewMember(groupId, name) {
        if (name === "") {}

        const url = process.env.REACT_APP_BACKEND_URL
        + "/api/user/getUsersByPartialName?partialName=" + encodeURIComponent(name)

        const userDtoList = await performGetRequest(url)
        userDtoList.forEach((userDto) => {
            acceptMember(groupId, userDto.id)
        })
    }

    async function getActiveTeams() {
        const activeGroups = await TeamAPI.getActiveTeams()
        setState({...state, groupList: activeGroups})
    }

    async function getAllTeams() {
        const groupDtoList = await TeamAPI.getAllTeams()
        setState({...state, groupList: groupDtoList})
    }

    async function getActiveMembers(id) {
        const userDtoList = await TeamAPI.getActiveMembers(id)
        setMemberList(userDtoList)
    }

    async function excludeMember(groupId, userId) {
        try {
            const url = process.env.REACT_APP_BACKEND_URL + `/api/group/exclude?groupId=${groupId}&userId=${userId}`
            const response = await fetch(url, {
                method: 'PATCH',
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
        getActiveMembers(groupId)
    }

    async function sortByName(groupDtoList) {

        if (!(groupDtoList === undefined || groupDtoList.length === 0)) {
            groupDtoList.sort((a, b) => a.name.localeCompare(b.name))
        }

        setState({
            isGroupSelected: state.isGroupSelected,
            selectedGroup: state.selectedGroup,
            groupList: groupDtoList
        })
    }

    async function sortByTeamLead(groupDtoList) {

        if (!(groupDtoList === undefined || groupDtoList.length === 0)) {
            groupDtoList.sort((a, b) => a.teamLeadName.localeCompare(b.teamLeadName))
        }

        setState({...state, groupList: groupDtoList})
    }

    async function sortByDate(groupDtoList) {

        if (!(groupDtoList === undefined || groupDtoList.length === 0)) {
            groupDtoList.sort(function(a, b) {
                return new Date(b.creationDate) - new Date(a.creationDate)
            })
        }

        setState({...state, groupList: groupDtoList})
    }



    function menuButtons() {

        const ToggleButton = ({ active, onClick, title }) => {
            return (
                <div 
                    onClick={onClick}
                    className={active ? `${classes.switchActive}` : `${classes.switch}`}>
                {title}
                </div>
            );
        };
      
        const types = ['активные', 'все'];
      
        return (
          <div className={`${classes.panelSwitch}`}>
            {types.map(t => (
                <ToggleButton
                  active={t === chosen}
                  onClick={ () => {
                      setChosen(t);
                      if (t === "активные") {
                          getActiveTeams();
                      } else {
                          getAllTeams();
                      }
                  }}
                  title={t}
                />
                ))}
          </div>
        );
    }

    function changeDateFormat(str) {
        return(str[8] + str[9] + '.' + str[5] + str[6] + '.' + str[0] + str[1] + str[2] + str[3])
    }

    function dateConverterAsParam(str) {
        return(str[0] + str[1] + str[2] + str[3] + '/' + str[5] + str[6] + '/' + str[8] + str[9])
    }

    function renderGroupList(groupDtoList) {

        if (groupDtoList === undefined || groupDtoList.length === 0) {
            return (
                <div className={`${classes.lilName}`}>Empty</div>
            )
        }

        let renderedGroupList = []

        groupDtoList.forEach((groupDto) => {
            renderedGroupList.push(
                <li
                    onClick={() => {
                        setState({...state, isGroupSelected: 1, selectedGroup: groupDto});

                        setObtainingState({
                            justifyContent: "space-between"
                        });

                        getActiveMembers(groupDto.id)
                    }}
                >
                    <div className={`${classes.lilActive}`} style={{background: groupDto.active ? "#00CA4E" : "#FF605C"}} />
                    <div className={`${classes.lilName}`}>{groupDto.name}</div>
                    <div className={`${classes.lilLeader}`}>{groupDto.teamLeadName}</div>
                        <div className={`${classes.lilCreation}`}>{changeDateFormat(groupDto.creationDate)}</div>
                </li>
            )
        })

        return renderedGroupList
    }

    function renderActiveMemberList(groupId, userDtoList) {

        let renderedUserList = []

        if (userDtoList === undefined || userDtoList.length === 0) {
            return (
                <div>Пустота</div>
            )
        }

        userDtoList.forEach((userDto) => {
            renderedUserList.push(
                <li>
                    <div className={`${classes.lirNamebox}`}>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.lirNameboxName}`}>{userDto.name}</div>
                    </div>

                    <div className={`${classes.lirEmail}`}>{userDto.email}</div>

                    <button 
                    style={state.selectedGroup.teamLeadName === userDto.name ? {display: "none"} : {display: "flex"}}
                        className={`${classes.lirRemove}`}
                        onClick={ () => {
                            excludeMember(groupId, userDto.id)
                        }}
                    >
                        <img src={remove} alt="remove" />
                    </button>
                </li>
            )
        })

        return renderedUserList
    }

    function teamInfo(groupDto, userList) {

        if (state.isGroupSelected === 0) {
            return (
                <div></div>
            )
        }

        return (
            <div className={`${classes.rightBlock}`}>
                <div className={`${classes.teamInfoHeading}`}>
                    <div className={`${classes.headingTitle}`}>
                        <p>Команда:</p>
                        <div className={`${classes.headingTitleTeamName}`}>{groupDto.name}</div>
                    </div>
    
                    <div className={`${classes.headingActivity}`}>
                        <p>Активность:</p>
                        <div className={`${classes.headingActivityStatus}`} style={{background: groupDto.active ? "#00CA4E" : "#FF605C"}} />
                    </div>
                </div>
    
            <div 
                className={`${classes.infoBody}`}
                style={groupDto.active ? {justifyContent: "flex-between"} : {justifyContent: "flex-start"}}
            >
                <div className={`${classes.bodyLeacre}`}>
                    <div className={`${classes.leacreLeader}`}>
                    <p>Лидер:</p>
                    <div className={`${classes.leacreLeaderName}`}>{groupDto.teamLeadName}</div>
                    </div>
                    <div className={`${classes.leacreCreated}`}>
                    <p>Создана:</p>
                    <div className={`${classes.leacreCreatedDate}`}>{changeDateFormat(groupDto.creationDate)}</div>
                    </div>
                </div>
    
                <div className={`${classes.bodyDescription}`}>
                    <p>Описание:</p>
                    <div className={`${classes.bodyDescriptionText}`}>{groupDto.description}</div>
                </div>
    
                <div 
                    className={`${classes.bodyMembers}`}
                    style={groupDto.active ? {display: "flex"} : {display: "none"}}
                >
                    <p>Члены:</p>
                    <ul className={`${classes.bodyMembersTable}`}>
                        {renderActiveMemberList(groupDto.id, userList)}
                    </ul>
                </div>
    
                {disbandedDate(groupDto)}
                {disbandedReason(groupDto)}
    
                <div 
                    className={`${classes.bodyButtons}`}
                    style={groupDto.active ? {display: "flex"} : {display: "none"}}
                >
                    <Popup trigger=
                        {<button
                            className={`${classes.bodyButtonsButton}`}
                        >
                            Внести изменения
                        </button>}
                            modal nested>
                        {
                            close => (
                                <div className={`${classes.popUpMask}`}>
                                    <div className={`${classes.popUp}`}>
                                        <div className={`${classes.popUpContent}`}>
                                            Внести изменения
                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                classNamePrefix="custom"
                                                className="custom-container"
                                                placeholder="Тимлид  "
                                                styles={customStyles}
                                                loadOptions={getTeamleads}
                                                onChange={(selectedOption) => setModifiedInfo(selectedOption.id)}
                                            />
                                        <form action="">
                                            <input id={"teamName"} placeholder="Название"
                                            onChange={(event) => setModifiedInfo({ ...modifiedInfo, name: event.target.value })}
                                            />
                                        </form>
                                        <form action="">
                                            <input id={"teamDescription"} placeholder="Описание" 
                                            onChange={(event) => setModifiedInfo({ ...modifiedInfo, name: event.target.value })}
                                            />
                                        </form>
    
                                        <div className={`${classes.popUpButtons}`}>
                                            <button onClick={(event) => {
                                                // setModifiedInfo({ ...modifiedInfo, id: groupDto.id })
                                                updateTeam()
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
    
                    <Popup trigger=
                        {<button
                            className={`${classes.bodyButtonsButton}`}
                        >
                            + сотрудника
                        </button>}
                            modal nested>
                        {
                            close => (
                                <div className={`${classes.popUpMask}`}>
                                    <div className={`${classes.popUp}`}>
                                        <div className={`${classes.popUpContent}`}>
                                            <p>Выберите сотрудника</p>
                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                classNamePrefix="custom"
                                                className="custom-container"
                                                placeholder="Сотрудник*  "
                                                styles={customStyles}
                                                loadOptions={getUser}
                                                onChange={(selectedOption) => {
                                                    setModifiedInfo(selectedOption.id);
                                                    //setAcceptUser(true);
                                                }}
                                            />
                                            <div className={`${classes.popUpButtons}`}>
                                                <button onClick={() => {
                                                    //addNewMember(groupDto.id, document.getElementById("newMember").value)
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
    
                    <Popup trigger=
                        {<button
                            className={`${classes.bodyButtonsButton}`}
                        >
                            Расформировать
                        </button>}
                            modal nested>
                        {
                            close => (
                                <div className={`${classes.popUpMask}`}>
                                    <div className={`${classes.popUp}`}>
                                        <div className={`${classes.popUpContent}`}>
                                            <p>Расформирование команды</p>
                                            <form action="">
                                                <input id={"disbandReason"} placeholder="Причина" maxLength={255}
                                                onChange={(event) => setDisbandmentReason(event.target.value )}
                                                />
                                            </form>
                                            <form>
                                                <input type='date'
                                                    defaultValue="2024-05-28"
                                                    min="1992-01-01"
                                                    onChange={(event) => {setServiceDate(dateConverterAsParam(event.target.value))}} 
                                                />
                                            </form>
                                            <div className={`${classes.popUpButtons}`}>
                                                <button onClick={(event) => {
                                                    const minDate = new Date("1992-01-01");
                                                    const varDate = new Date(serviceDate);
                                                    const today = new Date();

                                                    if (varDate < minDate || varDate > today) {
                                                        alert("Некорректная дата!");
                                                    }
                                                    else {
                                                        TeamAPI.disbandTeam(groupDto.id, disbandmentReason, serviceDate);
                                                        setCreateAllFilled({
                                                            isNameSet: false,
                                                            isTeamleadSet: false
                                                        });
                                                        close();
                                                        window.location.reload();
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
                                    </div>
                                </div>
                            )
                        }
                    </Popup>
                </div>
            </div>
        </div>
        );
    }

    function disbandedDate (groupDto) {
        if (!groupDto.active) {
            return (
                <div className={`${classes.bodyUpdate}`}>
                    <p>Дата роспуска:</p>
                        <div className={`${classes.bodyUpdateDate}`}>
                            {/* {changeDateFormat(groupDto.disbandmentDate)} */}
                                5/26/2024
                        </div>
                </div>
            )
        }
    }

    function disbandedReason (groupDto) {
        if (!groupDto.active) {
            return (
                <div className={`${classes.bodyReason}`}>
                    <p>Причина:</p>
                    <div className={`${classes.bodyReasonReason}`}>{groupDto.disbandmentReason}</div>
                </div>
            )
        }
    }

    if (isLoading) {
        return(
            <div>Загрузка...</div>
        )
    }

    return(
        <>
            <Helmet>
                <title>Команды — Community</title>
            </Helmet>
            <div className={`${classes.wrapperBlocks}`}>
                <p className={`${classes.wrapperBlocksTitle}`}>Команды</p>
                <div className={`${classes.blocksObtaining}`} style={{ justifyContent: obtainingState.justifyContent }}>
                    <div className={`${classes.leftBlock}`}>
                        <div className={`${classes.teamsControlPanel}`}>
                            <div className={`${classes.panelAddTeam}`}>
                                <p>Команды</p>
                                <Popup trigger=
                                    {<button className={`${classes.panelAddTeamButton}`}>
                                    <img src={add} alt="add" />
                                    </button>}
                                    modal nested>
                                    {
                                        close => (
                                            <div className={`${classes.popUpMask}`}>
                                                <div className={`${classes.popUp}`}>
                                                    <div className={`${classes.popUpContent}`}>
                                                        <p>Создание команды</p>
                                                            <AsyncSelect
                                                                cacheOptions
                                                                defaultOptions
                                                                classNamePrefix="custom"
                                                                className="custom-container"
                                                                placeholder="Тимлид*  "
                                                                styles={customStyles}
                                                                loadOptions={getTeamleads}
                                                                //onInputChange={}
                                                                onChange={(selectedOption) => {
                                                                    setTeamLead(selectedOption.id);
                                                                    setCreateAllFilled({ ...createAllFilled, isTeamleadSet: true});
                                                                }}

                                                            />
                                                        <form action="">
                                                            <input id={"teamName"} placeholder="Название*" maxLength={255}
                                                            onChange={(event) => {
                                                                setNewInformation({ ...newInformation, name: event.target.value });
                                                                setCreateAllFilled({ ...createAllFilled, isNameSet: true});
                                                            }}
                                                            required/>
                                                        </form>
                                                        <form action="">
                                                            <input id={"teamDescription"} placeholder="Описание" maxLength={255}
                                                            onChange={(event) => setNewInformation({ ...newInformation, description: event.target.value })}
                                                            />
                                                        </form>
                                                        <form>
                                                            <input type='date'
                                                                defaultValue="2024-05-28"
                                                                min="1992-01-01"
                                                                onChange={(event) => {setServiceDate(dateConverterAsParam(event.target.value))}} 
                                                            />
                                                        </form>

                                                        <div className={`${classes.popUpButtons}`}>
                                                            <button onClick={() => {
                                                                const minDate = new Date("1992-01-01");
                                                                const varDate = new Date(serviceDate);
                                                                const today = new Date();
                                                                if (!(createAllFilled.isNameSet && createAllFilled.isTeamleadSet)) {
                                                                    alert("Не заполнены обязательные* поля!")
                                                                }
                                                                else if (varDate < minDate || varDate > today) {
                                                                    alert("Некорректная дата!");
                                                                }
                                                                else {
                                                                    TeamAPI.createTeam(teamLead, serviceDate, newInformation);
                                                                    getActiveTeams();
                                                                    setCreateAllFilled({
                                                                        isNameSet: false,
                                                                        isTeamleadSet: false
                                                                    });
                                                                    window.location.reload();
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
                            {menuButtons()}
                        </div>

                        <div action="" className={`${classes.panelSearch}`}>
                            <input 
                                value={content}
                                placeholder="Команда"
                                onChange={(event) => setContent(event.currentTarget.value)}
                                onKeyUp={(event) => {
                                    if (event.key === 'Enter') {
                                        getTeamByName(event.currentTarget.value);
                                        setContent('');
                                    }
                                }}
                            />

                            <button 
                            onClick={
                                (event) => {
                                    getTeamByName(event.target.value);
                                    setContent('');
                                }}
                            >
                                <img src={search} alt="search"/>
                            </button>
                        </div>

                        <div className={`${classes.tableButtons}`}>
                            <button 
                                onClick={ () => {
                                    sortByName(state.groupList)
                                }}
                            >
                                <img src={sort} alt="sort"/>
                            </button>

                            <button 
                            onClick={ () => {
                                    sortByTeamLead(state.groupList)
                                }}
                            >
                                <img src={sort} alt="sort"/>
                            </button>

                            <button 
                                onClick={ () => {
                                    sortByDate(state.groupList)
                                }}
                            >
                                <img src={date} alt="date"/>
                            </button>
                        </div>

                        <ul className={`${classes.teamsTable}`}>
                            {renderGroupList(state.groupList)}
                        </ul>
                    </div>

                    {teamInfo(state.selectedGroup, memberList)}
                </div>
            </div>
            <div className={`${classes.wrapperFooterContainer}`}>
                <div className={`${classes.footerInfobox}`}>
                <p className={`${classes.footerInfoboxCopyright}`}>© community</p>
                <p className={`${classes.footerInfoboxAttribution}`}>
                    Icon made by Pixel perfect, Freepik, Radhe Icon, Royyan Wijaya, Taufik from
                    www.flaticon.com
                </p>
                </div>
                <img src={logo} alt="logo" />
            </div>
            </>
    )
}

export default Teams;