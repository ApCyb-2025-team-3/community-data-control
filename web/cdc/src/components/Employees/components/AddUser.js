import React from "react";
import classes from '../employees.module.css';
import search from '../../../icons/search-icon.svg';





class AddUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "default",
            date: '2023-11-20T08:30:00',
            email: "default",
            phone: "default",
            supervisorName: "default",
            teamLeadName: "default",
            productOwnersNames: ["default"],
            project: "default",
            department: "default",
            grade: "Unspecified",
            role: "Non Member",
            mentorStatus: "Not participating"
        }
    }
    render() {
        return (
            <div className={`${classes.listBlock}`}>
                <div className={`${classes.listBlockControlPanel}`}>
                    <button className={`${classes.controlPanelAddButton}`} onClick={() => {
                        this.props.changeComp()
                    }}><img src={search} alt="search" /> сотрудника</button>
                </div>
                <form className={`${classes.addUserForm}`}>
                    <div>
                    <input id="name" placeholder="Имя" onChange={(event) => this.setState({ name: event.target.value })} />
                    <input id="date" className="date" type="date" placeholder="Дата рождения" onChange={(event) => this.setState({ date: event.target.value })} />
                    <input id="email" type="email" placeholder="Email" onChange={(event) => this.setState({ email: event.target.value })} />
                    <input id="phone" type="tel" placeholder="Номер телефона" onChange={(event) => this.setState({ phone: event.target.value })} />
                    <input list="roles" id="role" placeholder="Роль" onChange={(event) => this.setState({ role: event.target.value })} />
                    <datalist id="roles">
                        <option value="Member" />
                        <option value="Data Engineer" />
                        <option value="Developer" />
                        <option value="Team Lead" />
                        <option value="Product Owner" />
                        <option value="Supervisor" />
                    </datalist>
                    <input list="grades" id="grade" placeholder="Позиция" onChange={(event) => this.setState({ grade: event.target.value })} />
                    <datalist id="grades">
                        <option value="Junior" />
                        <option value="Middle" />
                        <option value="Senior" />
                        <option value="Team Lead" />
                        <option value="Unspecified" />
                    </datalist>
                    </div>
                    <div>
                    <input id="supervisorName" placeholder="Руководитель" onChange={(event) => this.setState({ supervisorName: event.target.value })} />
                    <input id="teamLeadName" placeholder="Лидер группы" onChange={(event) => this.setState({ teamLeadName: event.target.value })} />
                    <input id="productOwnersNames" placeholder="productOwenrs?" type="text" onChange={(event) => this.setState({ productOwnersNames: event.target.value.split(',').map(item => item.trim()) })} />
                    <input id="project" placeholder="Проект" onChange={(event) => this.setState({ project: event.target.value })} />
                    <input id="department" placeholder="Отдел" onChange={(event) => this.setState({ department: event.target.value })} />
                    <input id="mentorStasus" list="mentorship" placeholder="Менторство" onChange={(event) => this.setState({ mentorStatus: event.target.value })} />
                    <datalist id="mentorship">
                        <option value="Mentor" key="Ментор" />
                        <option value="Mentee" key="Менти" />
                        <option value="Not participating" key="Нет" />
                    </datalist>
                    </div>
                </form>

                <button type="button" onClick={async () => {
                    try {
                        const response = await fetch('http://localhost:8080/api/user/add', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Origin': 'http://localhost:3000'
                            },
                            body: JSON.stringify({
                                name: this.state.name,
                                date: this.state.date,
                                email: this.state.email,
                                phone: this.state.phone,
                                supervisorName: this.state.supervisorName,
                                teamLeadName: this.state.teamLeadName,
                                productOwnersNames: this.state.productOwnersNames,
                                project: this.state.project,
                                department: this.state.department,
                                grade: this.state.grade,
                                role: this.state.role,
                                mentorStatus: this.state.mentorStatus
                            }) // здесь передайте данные, которые вы хотите сохранить
                        });

                        if (!response.ok) {
                            throw new Error('Ошибка запроса');
                        }

                        const result = await response.text();
                        console.log(result); // здесь вы можете обработать ответ от сервера
                    } catch (error) {
                        console.error('Ошибка при отправке запроса:', error);
                    }
                }}>Добавить</button>
            </div >
        )
    }
}

export default AddUser