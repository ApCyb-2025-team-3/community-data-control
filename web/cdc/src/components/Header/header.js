import classes from './header.module.css';
import logo from '../../icons/safari-pinned-tab.svg';
import React, { useState, useEffect } from "react";
import { UserAPI } from '../Employees/UserAPI';


function Header() {
	const [user, setUser] = useState(null);
	useEffect(() => {
		UserAPI.getAuthUser()
			.then(response => {
				if (response !== 'anonymousUser') setUser(JSON.parse(JSON.stringify(response.authorities)));
			})
			.catch(error => {
				if (error.response?.status === 401) {
					window.location.href = process.env.REACT_APP_BACKEND_URL + '/login';
				} else {
					console.error('Error fetching user:', error);
				}
			});
	}, []);
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
					{user ? <a href={process.env.REACT_APP_BACKEND_URL + "/logout"}>Выйти</a> : <a href={process.env.REACT_APP_BACKEND_URL + "/login"}>Войти</a>}
				</nav>
			</div>
		</div>
	);
}

export default Header;