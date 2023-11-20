import React from "react";
import classes from '../employees.module.css';
import info from '../../../icons/info-icon.svg';
import search from '../../../icons/search-icon.svg';

class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            date: "",
            isActive: "",
            email: "",
            role: ""
        }
        this.getUser = this.getUser.bind(this)
    }
    //этот запрос пока TODO и я хз работает ли
    getUser(name) {
        fetch(`https://localhost:8080/api/getUserById?name=${name}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    data: data.date,
                })
            })
            .catch(error => {
                // Обработка ошибок
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    render() {
        return (
            <div className={`${classes.listBlock}`}>
                <div className={`${classes.listBlockControlPanel}`}>
                    <button className={`${classes.controlPanelAddButton}`}
                        onClick={() => this.props.changeComp()}>+ сотрудника</button>
                    <form action="">
                        <input placeholder="Name" />
                        <button>
                            <img src={search} alt="search" />
                        </button>
                    </form>
                </div>
                <ul className={`${classes.listBlockTable}`}>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                    <li>
                        <div className={`${classes.liName}`}>Korolyov Vassili Ilyich</div>
                        <button>
                            <img src={info} alt="info" />
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
}

export default UserList