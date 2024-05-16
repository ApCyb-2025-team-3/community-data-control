import classes from './header.module.css';
import logo from '../../icons/safari-pinned-tab.svg';

function Header() {
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
          </nav>
        </div>
      </div>
    );
}

export default Header;