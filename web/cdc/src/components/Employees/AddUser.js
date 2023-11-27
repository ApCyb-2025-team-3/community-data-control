import classes from './employees.module.css';
import React, {useState} from "react";
import AsyncSelect from 'react-select/async';
import axios from 'axios';


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
        invitedAt: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    })
    const [allFilled, setAllFilled] = useState(false)

    async function getUsers(inputValue) {
        try {

            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/user/getUsersByRole?role=supervisor`);

            return response.data.map(user => ({
                value: user.name,
                label: user.name
            }));
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
            return [];
        }
    }

    async function getPO() {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/user/getUsersByRole?role=product owner`);

            return response.data.map(user => ({
                value: user.name,
                label: user.name
            }));
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
            return [];
        }
    }

    async function addUser() {
        try {
            const data = {...user}
            if (user.productOwnersNames.length !== 0) {
                data.productOwnersNames = user.productOwnersNames.map(item => item.value)
            }
            if (user.supervisorName !== "") {
                data.supervisorName = user.supervisorName.value
            }
            const url = process.env.REACT_APP_BACKEND_URL + "/api/user/add"
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:3000'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Ошибка запроса');
            }

            const result = await response.text();

            setUser({
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
                invitedAt: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
            })

            alert("Пользователь успешно добавлен")

        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
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
        <div className={`${classes.addUserBlock}`}>
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
                <div>Позиция</div>
                <div>Руководитель</div>
                <div>Product Owner</div>
                <div>Проект</div>
                <div>Отдел</div>
                <div>Менторство</div>
                <div>Дата присоединения</div>
            </div>
            <div className={`${classes.addUserBlockFields}`}>
            <input value={user.name} className={user.name === null ? `${classes.UnfilledInput}` : `${classes.InputField}`} id="name" placeholder="Имя" onChange={(event) => { setUser({ ...user, name: event.target.value }); setAllFilled(user.name && user.email && user.dob && user.phoneNumber && user.invitedAt) }} />
            <input value={user.dob} className={user.dob === null ? `${classes.UnfilledInput}` : `${classes.InputField}`} id="date" type="date" placeholder="Дата рождения" onChange={(event) => { setUser({ ...user, dob: event.target.value }); setAllFilled(user.name && user.email && user.dob && user.phoneNumber && user.invitedAt) }} />
            <input value={user.email} className={user.email === null ? `${classes.UnfilledInput}` : `${classes.InputField}`} id="email" type="email" placeholder="Email" onChange={(event) => { setUser({ ...user, email: event.target.value }); setAllFilled(user.name && user.email && user.dob && user.phoneNumber && user.invitedAt) }} />
            <input value={user.phoneNumber} className={user.phoneNumber === null ? `${classes.UnfilledInput}` : `${classes.InputField}`} id="phone" type="tel" placeholder="Номер телефона" onChange={(event) => { setUser({ ...user, phoneNumber: event.target.value }); setAllFilled(user.name && user.email && user.dob && user.phoneNumber && user.invitedAt) }} />
            <select id="role" placeholder="Роль" value={user.role} onChange={(event) => setUser({ ...user, role: event.target.value })} >
                <option value="Member">Участник</option>
                <option value="Data Engineer">Дата инженер</option>
                <option value="Developer" >Разработчик</option>
                <option value="Team Lead" >Team Lead</option>
                <option value="Product Owner">Product owner</option>
                <option value="Supervisor">Руководитель</option>
                <option value="Non Member">Гость</option>
            </select>
            <select id="grade" placeholder="Позиция" value={user.grade} onChange={(event) => setUser({ ...user, grade: event.target.value })} >
                <option value="Junior">Junior</option>
                <option value="Middle">Middle</option>
                <option value="Senior">Senior</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Unspecified">Не указана</option>
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
                onChange={(selectedOption) => {console.log(selectedOption); setUser({ ...user, productOwnersNames: selectedOption })}}

            />
            <input className={`${classes.InputField}`} id="project" placeholder="Проект" onChange={(event) => setUser({ ...user, project: event.target.value })} />
            <input className={`${classes.InputField}`} id="department" placeholder="Отдел" onChange={(event) => setUser({ ...user, department: event.target.value })} />
            <select id="mentorStasus" value={user.mentorStatus} placeholder="Менторство" onChange={(event) => setUser({ ...user, mentorStatus: event.target.value })} >
                <option value="Mentor">Ментор</option>
                <option value="Mentee" >Менти</option>
                <option value="Not participating">Не участвует</option>
            </select>
            <input value={user.invitedAt} className={user.invitedAt === null ? `${classes.UnfilledInput}` : `${classes.InputField}`} id="date" type="date" placeholder="Дата присоединения" onChange={(event) => { setUser({ ...user, invitedAt: event.target.value }); setAllFilled(user.name && user.email && user.dob && user.phoneNumber && user.invitedAt) }} />
            </div>
            </div>
            <div className={`${classes.addUserBlockBottom}`}>
                <button className={`${classes.addUserBlockBottomButton}`}
                        type='button'
                        onClick={() => {
                            {allFilled ? addUser(user) : alert("Заполните обязательные поля")}
                        }}>
                    Добавить
                </button>
            </div>
        </div>)

}

export default AddUser
