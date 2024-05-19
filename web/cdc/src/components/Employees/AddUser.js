import classes from './employees.module.css';
import React, { useState } from "react";
import AsyncSelect from 'react-select/async';
import { UserAPI } from './UserAPI';



const AddUser = () => {

    const today = new Date()

    const [user, setUser] = useState({
        name: null,
        dob: null,
        email: null,
        phoneNumber: null,
        supervisorName: "",
        productOwnersNames: [],
        project: "",
        department: "",
        grade: "Unspecified",
        role: "Non Member",
        mentorStatus: "Not participating",
        invitedAt: today.getMonth() >= 9 ?
            `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}` :
            `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`
    })
    const [allFilled, setAllFilled] = useState(false)
    const [nameFilled, setNameFilled] = useState(false)
    const [emailFilled, setEmailFilled] = useState(false)
    const [phoneFilled, setPhoneFilled] = useState(false)
    const [dateOfBirthFilled, setDOBFilled] = useState(false)
    const [invitedAtFilled, setInvitedAtFilled] = useState(true)



    async function getUsers(inputValue) {
        try {

            const response = await UserAPI.getUserByRole('supervisor');
            if (response) {
                return response.map(user => ({
                    value: user.name,
                    label: user.name
                }));
            }
            else return;
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
            return [];
        }
    }

    async function getPO() {
        try {
            const response = await UserAPI.getUserByRole('product owner');
            if (response) {
                return response.map(user => ({
                    value: user.name,
                    label: user.name
                }));
            }
            else return;
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
            return [];
        }
    }

    async function addUser(event) {

        const data = { ...user }
        if (user.productOwnersNames.length !== 0) {
            data.productOwnersNames = user.productOwnersNames.map(item => item.value)
        }
        if (user.supervisorName !== "") {
            data.supervisorName = user.supervisorName.value
        }

        const result = await UserAPI.getAuthUser()
        const authData = JSON.parse(JSON.stringify(result))
        if (authData.authorities[0].authority === "ROLE_ADMIN") {
            const response = await UserAPI.addUserRequest(data)
            setUser({
                name: "",
                dob: null,
                email: "",
                phoneNumber: "",
                supervisorName: "",
                productOwnersNames: [],
                project: "",
                department: "",
                grade: "Unspecified",
                role: "Non Member",
                mentorStatus: "Not participating",
                invitedAt: today.getMonth() >= 9 ?
                    `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}` :
                    `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`
            })
            setDOBFilled(false)
            setNameFilled(false)
            setEmailFilled(false)
            setPhoneFilled(false)
            alert("Пользователь успешно добавлен")
            return response.data
        }
        else {
            alert("У вас недостаточно прав для данного действия")
            return "У вас недостаточно прав"
        }
    }

    const nameHandler = (e) => {
        const nameRegex = /^[A-Za-zА-Яа-яЁё]+([-']?[A-Za-zА-Яа-яЁё]+)?$/
        if (nameRegex.test(e.target.value)) {
            setNameFilled(true)
            setUser({ ...user, name: e.target.value })
        }
        else
            setNameFilled(false)

    }

    const emailHandler = (e) => {
        const emailRegex = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/
        emailRegex.test(e.target.value) ?
            setEmailFilled(true) : setEmailFilled(false)
        setUser({ ...user, email: e.target.value })
    }

    const phoneHandler = (e) => {
        const phoneRegex = /^\+\d{10,14}$/;
        phoneRegex.test(e.target.value) ?
            setPhoneFilled(true) : setPhoneFilled(false)
        setUser({ ...user, phoneNumber: e.target.value })
    }

    const DateHandler = (e, ind) => {
        if (!e.target.value) {
            ind === 1 ?
                setDOBFilled(false) : setInvitedAtFilled(false)
            return
        }
        const selectedDate = new Date(e.target.value);
        const minDate = new Date("1900-01-01");
        const today = new Date();
        if (isNaN(selectedDate.getTime()) || selectedDate < minDate || selectedDate > today) {
            ind === 1 ?
                setDOBFilled(false) : setInvitedAtFilled(false)
            return
        }
        ind === 1 ?
            setDOBFilled(true) : setInvitedAtFilled(true)
        ind === 1 ?
            setUser({ ...user, dob: e.target.value }) : setUser({ ...user, invitedAt: e.target.value })

    }

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

    return (
        <form name="form" className={`${classes.addUserBlock}`}>
            <div className={`${classes.addUserBlockTitle}`}>
                ДОБАВЛЕНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ
            </div>
            <div className={`${classes.addUserBlockMain}`}>
                <div className={`${classes.addUserBlockLabels}`}>
                    <div>Имя</div>
                    <div>Дата рождения</div>
                    <div>Email</div>
                    <div>Номер телефона</div>
                    <div>Роль</div>
                    <div>Уровень компетенций</div>
                    <div>Руководитель</div>
                    <div>Product Owner</div>
                    <div>Проект</div>
                    <div>Подразделение</div>
                    <div>Менторство</div>
                    <div>Дата присоединения</div>
                </div>
                <div className={`${classes.addUserBlockFields}`}>
                    <input value={user.name} className={!nameFilled ? `${classes.UnfilledInput}` : `${classes.InputField}`} name="name" placeholder="Имя" onChange={(event) => { nameHandler(event); setAllFilled(nameFilled && emailFilled && user.dob && phoneFilled && invitedAtFilled) }} />
                    <input value={user.dob} className={!dateOfBirthFilled ? `${classes.UnfilledInput}` : `${classes.InputField}`} name="dob" type="date" placeholder="Дата рождения" onChange={(event) => { DateHandler(event, 1); setAllFilled(nameFilled && emailFilled && user.dob && phoneFilled && invitedAtFilled) }} />
                    <input value={user.email} className={!emailFilled ? `${classes.UnfilledInput}` : `${classes.InputField}`} name="email" type="email" placeholder="Email" onChange={(event) => { emailHandler(event); setAllFilled(nameFilled && emailFilled && user.dob && phoneFilled && invitedAtFilled) }} />
                    <input value={user.phoneNumber} className={!phoneFilled ? `${classes.UnfilledInput}` : `${classes.InputField}`} name="phoneNumber" type="tel" placeholder="Номер телефона" onChange={(event) => { phoneHandler(event); setAllFilled(nameFilled && emailFilled && user.dob && phoneFilled && invitedAtFilled) }} />
                    <select name="role" placeholder="Роль" value={user.role} onChange={(event) => setUser({ ...user, role: event.target.value })} >
                        <option value="Member">Участник</option>
                        <option value="Data Engineer">Дата инженер</option>
                        <option value="Developer" >Разработчик</option>
                        <option value="Team Lead" >Team Lead</option>
                        <option value="Product Owner">Product owner</option>
                        <option value="Supervisor">Руководитель</option>
                        <option value="Non Member">Гость</option>
                    </select>
                    <select name="grade" placeholder="Уровень компетенций" value={user.grade} onChange={(event) => setUser({ ...user, grade: event.target.value })} >
                        <option value="Junior">Junior</option>
                        <option value="Middle">Middle</option>
                        <option value="Senior">Senior</option>
                        <option value="Team Lead">Team Lead</option>
                        <option value="Unspecified">Не указан</option>
                    </select>
                    {/*<input className={`${classes.InputField}`} id="supervisorName" placeholder="Руководитель" onChange={(event) => setUser({ ...user, supervisorName: event.target.value })} />}
            <input className={`${classes.InputField}`} id="productOwnersNames" placeholder="Product Owners" type="text" onChange={(event) => setUser({ ...user, productOwnersNames: event.target.value.split(',').map(item => item.trim()) })} />*/}
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        classNamePrefix="custom"
                        className="custom-container"
                        placeholder="Руководитель"
                        styles={customStyles}
                        loadOptions={getUsers}
                        onChange={(selectedOption) => setUser({ ...user, supervisorName: selectedOption })}

                    />
                    <AsyncSelect
                        isMulti
                        cacheOptions
                        defaultOptions
                        classNamePrefix="custom"
                        className="custom-container"
                        placeholder="Product Owners"
                        styles={customStyles}
                        loadOptions={getPO}
                        onChange={(selectedOption) => { setUser({ ...user, productOwnersNames: selectedOption }) }}

                    />
                    <input className={`${classes.InputField}`} name="project" placeholder="Проект" onChange={(event) => setUser({ ...user, project: event.target.value })} />
                    <input className={`${classes.InputField}`} name="department" placeholder="Подразделение" onChange={(event) => setUser({ ...user, department: event.target.value })} />
                    <select id="mentorStasus" value={user.mentorStatus} placeholder="Менторство" onChange={(event) => setUser({ ...user, mentorStatus: event.target.value })} >
                        <option value="Mentor">Ментор</option>
                        <option value="Mentee" >Менти</option>
                        <option value="Not participating">Не участвует</option>
                    </select>
                    <input defaultValue={user.invitedAt} className={!invitedAtFilled ? `${classes.UnfilledInput}` : `${classes.InputField}`} name="invitedAt" type="date" placeholder="Дата присоединения" onChange={(event) => { DateHandler(event, 2); setAllFilled(nameFilled && emailFilled && user.dob && phoneFilled && invitedAtFilled) }} />
                </div>
            </div>
            <div className={`${classes.addUserBlockBottom}`}>
                <button className={`${classes.addUserBlockBottomButton}`}
                    type='button'
                    onClick={(event) => {
                        allFilled ? addUser(event) : alert("Заполните обязательные поля")
                    }}>
                    Добавить
                </button>
            </div>
        </form>)

}

export default AddUser
