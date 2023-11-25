import classes from "./employees.module.css";
import dot from "../../icons/dot-icon.svg";
import remove from "../../icons/remove-icon.svg";
import React, {useState} from "react";

const Groups = ({userId}) => {

    const [state, setState] = useState({
        userId: userId,
        userGroupList: []
    })

    return (
        <div className={`${classes.teamGroupsBlock}`}>
            <div className={`${classes.teamGroupsBlockTitles}`}>
                <p>Команда:</p>
                <div>Лидер:</div>
                <p>Группы:</p>
            </div>
            <div className={`${classes.teamGroupsBlockData}`}>
                <div className={`${classes.teamGroupsBlockDataTeam}`}>Spauspauspau</div>
                <div className={`${classes.teamGroupsBlockDataLeader}`}>Hawks A.</div>
                <ul className={`${classes.teamGroupsBlockDataGroups}`}>
                    <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                    </li>
                    <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                    </li>
                    <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                    </li>
                    <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                    </li>
                    <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                    </li>
                    <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                    </li>
                    <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                    </li>
                    <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                    </li>
                    <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                    </li>
                    <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                    </li>
                    <li>
                        <img src={dot} alt="dot" />
                        <div className={`${classes.dataGroupsName}`}>Kafka_team</div>
                        <button>
                            <img src={remove} alt="remove" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Groups;