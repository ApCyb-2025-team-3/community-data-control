import classes from './header.module.css';
import logo from '../../icons/safari-pinned-tab.svg';
import React, { useState, useEffect } from "react";
import { UserAPI } from '../Employees/UserAPI';


function Header() {
	const [user, setUser] = useState(null);
	useEffect(() => {
		UserAPI.getAuthUser()
			.then(response => {
				setUser(JSON.parse(JSON.stringify(response.authorities)));
			})
			.catch(error => {
				if (error.response?.status === 401) {
					window.location.href = process.env.REACT_APP_BACKEND_URL + '/login';
				} else {
					console.error('Error fetching user:', error);
				}
			});
	}, []);
	console.log(user)
	return (
		<div className={`${classes.wrapperHeaderContainer}`}>
			<div className={`${classes.headerInfobox}`}>
				<a href="/">
					<figure>
						<img src={logo} alt="logo" />
						<p>community</p>
					</figure>
				</a>
			</div>
			<div className={`${classes.headerMenuObtaining}`}>
				<nav>
					<a href="/teams">команды</a>
					<a href="/groups">группы</a>
					<a href="/mentorship">менторство</a>
					<a href="/employees">сотрудники</a>
					{user ? <a href="http://localhost:5002/logout">Выйти</a> : <a href="http://localhost:5002/login">Войти</a>}
				</nav>
			</div>
		</div>
	);
}

export default Header;