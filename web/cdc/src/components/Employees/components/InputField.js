import React from "react";
import UserList from "./UserList.js";
import AddUser from "./AddUser.js";




class InputField extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            addUser : false
        }
    }

    changeComp = () => {
        this.setState({
            addUser : !this.state.addUser
        })
    }

    render() {
        return (
            this.state.addUser ? <AddUser changeComp={this.changeComp} /> : <UserList changeComp={this.changeComp}/>
        )
    }
}

export default InputField 