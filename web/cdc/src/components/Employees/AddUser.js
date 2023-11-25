import classes from './employees.module.css';
import React, { useState } from "react";



const AddUser = () => {
    const [user, setUser] = useState({
        name: null,
        dob: null,
        email: null,
        phoneNumber: null,
        supervisorName: "",
        teamLeadName: "",
        productOwnersNames: "",
        project: null,
        department: null,
        grade: "Unspecified",
        role: "Non Member",
        mentorStatus: "Not participating"
    })
    const [allFilled, setAllFilled] = useState(false)

    async function addUser(user) {
        try {
            const url = process.env.REACT_APP_BACKEND_URL + "/api/user/add"
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:3000'
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error('Ошибка запроса');
            }

            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    }

    return (
        <div className={`${classes.addUserBlock}`}>
            <input className={user.name === null ? `${classes.UnfilledInput}` : `${classes.InputField}`} id="name" placeholder="Имя" onChange={(event) =>  setUser({...user, name : event.target.value})} />
            <input className={user.dob === null ? `${classes.UnfilledInput}` : `${classes.InputField}`} id="date" type="date" placeholder="Дата рождения" onChange={(event) => setUser({...user, date : event.target.value })} />
            <input className={user.email === null ? `${classes.UnfilledInput}` : `${classes.InputField}`} id="email" type="email" placeholder="Email" onChange={(event) => setUser({...user, email : event.target.value})} />
            <input className={user.phoneNumber === null ? `${classes.UnfilledInput}` : `${classes.InputField}`} id="phone" type="tel" placeholder="Номер телефона" onChange={(event) => setUser({...user, phone : event.target.value })} />
            <select id="role" placeholder="Роль" value={user.role} onChange={(event) => setUser({...user, role : event.target.value })} >
                <option value="Member">Участник</option>
                <option value="Data Engineer">Дата инженер</option>
                <option value="Developer" >Разработчик</option>
                <option value="Team Lead" >Team Lead</option>
                <option value="Product Owner">Product owenr</option>
                <option value="Supervisor">Руководитель</option>
                <option value="Non Member">Гость</option>
            </select>
            <select id="grade" placeholder="Позиция" value={user.grade} onChange={(event) => setUser({...user, grade : event.target.value})  } >
                <option value="Junior">Junior</option>
                <option value="Middle">Middle</option>
                <option value="Senior">Senior</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Unspecified">Unspecified</option>
            </select>
            <input className={`${classes.InputField}`} id="supervisorName" placeholder="Руководитель" onChange={(event) => setUser({...user, supervisorName : event.target.value })} />
            <input className={`${classes.InputField}`} id="teamLeadName" placeholder="Лидер группы" onChange={(event) => setUser({...user, teamLeadName : event.target.value })} />
            <input className={`${classes.InputField}`} id="productOwnersNames" placeholder="Product Owenrs" type="text" onChange={(event) => setUser({...user, productOwnersNames : event.target.value.split(',').map(item => item.trim())})} />
            <input className={user.project === null ? `${classes.UnfilledInput}` : `${classes.InputField}`} id="project" placeholder="Проект" onChange={(event) => setUser({...user, project : event.target.value })} />
            <input className={user.department === null ? `${classes.UnfilledInput}` : `${classes.InputField}`} id="department" placeholder="Отдел" onChange={(event) => setUser({...user, department : event.target.value })} />
            <select id="mentorStasus" value={user.mentorStatus}  placeholder="Менторство" onChange={(event) => setUser({...user, mentorStatus : event.target.value })} >
                <option value="Mentor">Ментор</option>
                <option value="Mentee" >Менти</option>
                <option value="Not participating">Не участвует</option>
            </select>
        <button type='button' onClick={() => {
            setAllFilled(user.name && user.email && user.dob && user.department && user.project
                && user.phoneNumber)
            {allFilled ? addUser(user) : alert("Заполните обязательные поля")}}}>Добавить</button>
        
    </div>)

}

export default AddUser