import classes from "./employees.module.css";
import dot from "../../icons/dot-icon.svg";
import React from "react";

const Mentorships = (userId) => {

    return (
        <div className={`${classes.mentorshipBlock}`}>
            <p className={`${classes.teamGroupsBlockHeading}`}>Менторство</p>
            <div className={`${classes.teamGroupsBlockInfo}`}>
                <div className={`${classes.teamGroupsBlockInfoTitles}`}>
                    <p>Роль:</p>
                    <p className={`${classes.classMentor}`} style={{ display: "none" }}>
                        Ментор:
                    </p>
                    <p className={`${classes.classMentee}`}>Менти:</p>
                </div>
                <div className={`${classes.teamGroupsBlockInfoData}`}>
                    <div className={`${classes.roleMentee}`} style={{ display: "none" }}>
                        менти
                    </div>
                    <div className={`${classes.roleMentor}`}>ментор</div>
                    <div className={`${classes.mentorName}`} style={{ display: "none" }}>
                        Mironov Semyon Vitalievich
                    </div>
                    <ul className={`${classes.menteeList}`}>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                        </li>
                        <li>
                            <img src={dot} alt="dot" />
                            <div className={`${classes.menteeName}`}>Maxim Tisheninov</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Mentorships;