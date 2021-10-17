import React from 'react'
import {Redirect } from 'react-router-dom'
import { loginUser } from '../../redux/actions/user' 
import { connect } from 'react-redux'
import Axios from 'axios'
import { API_URL } from '../../constants/API'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import "../../assets/styles/floating-labels.css"
import Forgot from "../../assets/images/forgot.png"

class Login extends React.Component {
    state = {
        email:"",
    }

    inputHandler = (event) =>{
        const value = event.target.value;
        const name = event.target.name;
    
        this.setState({ [name]: value })
    }

    resetBTnHandler = () => {

        Axios.patch(`${API_URL}/users/reset-password/${this.state.email}`,{
            password: Math.floor(10000000*Math.random()).toString(),
        })
        .then(()=>{
            this.setState({edit: ""})
        })
    }

    
    render(){
        if (this.props.userGlobal.id_user){
            return <Redirect to="/" />
        }
        return (
            <div class="bodyForgot">
                <form class="form-signin">
                <div class="text-center mb-4">
                    <img class="mb-4" src={Forgot} alt="" height="295"/>
                    <h1 class="h3 mb-3 font-weight-normal">Forgot Password</h1>
                </div>

                <div class="form-label-group">
                    <input name="email" onChange={this.inputHandler} type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus/>
                    <label for="inputEmail">Email address</label>
                </div>

                <button onClick={this.resetBTnHandler}  class="btn btn-lg btn-primary btn-block " type="submit">Reset My Password</button>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        userGlobal: state.user,
    }
}

const mapDispatchToProps = {
    loginUser,

}

export default connect(mapStateToProps, mapDispatchToProps)(Login);