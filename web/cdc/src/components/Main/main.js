import { Helmet } from 'react-helmet'
import classes from './main.module.css';
import background from '../../images/main_background.png';
import plant from '../../icons/plant-icon.svg';
import logo from '../../icons/safari-pinned-tab.svg';

function Main() {
    return(
        <>
            <Helmet>
                <title>Главная — Community</title>
            </Helmet>
            <div className={`${classes.wrapperModulesContainer}`}>
                <div className={`${classes.moduleIntroduction}`}>
                <img src={background} alt="background" />
                <div className={`${classes.introductionObtaining}`}>
                    <p>УПРАВЛЕНИЕ ДАННЫМИ О СООБЩЕСТВЕ</p>
                </div>
                </div>
                <div className={`${classes.modulePlant}`}>
                <img src={plant} alt="plant" />
                </div>
            </div>
            <div className={`${classes.wrapperFooterContainer}`}>
                <div className={`${classes.footerInfobox}`}>
                <p className={`${classes.footerInfoboxCopyright}`}>© community</p>
                <p className={`${classes.footerInfoboxAttribution}`}>
                    Icon made by DinosoftLabs from www.flaticon.com
                </p>
                </div>
                <img src={logo} alt="logo" />
            </div>
        </>
    );
}

export default Main;