import classes from './employees.module.css';
import React from "react";



const AddUser = () => {
    let user = {
        name: "default",
        dob: '2023-11-20T08:30:00',
        email: "default",
        phoneNumber: "default",
        supervisorName: "default",
        teamLeadName: "default",
        productOwnersNames: ["default"],
        project: "default",
        department: "default",
        grade: "Unspecified",
        role: "Non Member",
        mentorStatus: "Not participating"
    }

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
            <input id="name" placeholder="Имя" onChange={(event) =>  user.name = event.target.value } />
            <input id="date" className="date" type="date" placeholder="Дата рождения" onChange={(event) => ( user.date = event.target.value )} />
            <input id="email" type="email" placeholder="Email" onChange={(event) => ( user.email = event.target.value )} />
            <input id="phone" type="tel" placeholder="Номер телефона" onChange={(event) => ( user.phone = event.target.value )} />
            <select id="role" placeholder="Роль" onChange={(event) => ( user.role = event.target.value )} >
                <option value="Member">Участник</option>
                <option value="Data Engineer">Дата инженер</option>
                <option value="Developer" >Разработчик</option>
                <option value="Team Lead" >Team Lead</option>
                <option value="Product Owner">Product owenr</option>
                <option value="Supervisor">Руководитель</option>
                <option value="Non member">Гость</option>
            </select>
            <select id="grade" placeholder="Позиция" onChange={(event) => {user.grade = event.target.value}  } >
                <option value="Junior">Junior</option>
                <option value="Middle">Middle</option>
                <option value="Senior">Senior</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Unspecified">Unspecified</option>
            </select>
            <input id="supervisorName" placeholder="Руководитель" onChange={(event) => user.supervisorName = event.target.value } />
            <input id="teamLeadName" placeholder="Лидер группы" onChange={(event) => user.teamLeadName = event.target.value } />
            <input id="productOwnersNames" placeholder="productOwenrs?" type="text" onChange={(event) => user.productOwnersNames = event.target.value.split(',').map(item => item.trim())} />
            <input id="project" placeholder="Проект" onChange={(event) => user.project = event.target.value } />
            <input id="department" placeholder="Отдел" onChange={(event) => user.department = event.target.value } />
            <select id="mentorStasus"  placeholder="Менторство" onChange={(event) => user.mentorStatus = event.target.value } >
                <option value="Mentor">Ментор</option>
                <option value="Mentee" >Менти</option>
                <option value="Not participating">Не участник</option>
            </select>
        <button type='button' onClick={() => {addUser(user)}}>Добавить</button>
        
    </div>)

}

export default AddUser