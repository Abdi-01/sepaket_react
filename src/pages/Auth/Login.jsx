import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { loginUser } from '../../redux/actions/user' 
import { connect } from 'react-redux'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import Avatar from "../../assets/images/avatar.png"
import Wave from "../../assets/images/wave5.png"
import Login2 from "../../assets/images/login2.png"
import "../../assets/loginStyles.css"
import Google from "../../assets/images/google.png"

class Login extends React.Component {
    state = {
        username:"",
        password:""
    }

    inputHandler = (event) =>{
        const value = event.target.value;
        const name = event.target.name;
    
        this.setState({ [name]: value })
    }

    
    render(){
        if (this.props.userGlobal.id_user){
            return <Redirect to="/" />
        }
        return (
            <div class="container">
                <div class="row text-center">
                    <h4 class="mt-3">Let's choose & share your happiness snack package</h4>

                    <div class="col mt-2">
                        <img src={Login2} alt="login" height="295" />
                    </div>
                    
                    <div className="col mt-5">
                        <div>
                            {
                                this.props.userGlobal.errMsg?
                                <div className="alert alert-danger">{this.props.userGlobal.errMsg}</div>
                                : null
                            }

                            <div class="signIn m-2" >
                                <img src={Avatar} alt="avatar" height="70"/>
                                <h3 class="mb-3 fw-normal">Welcome back, Please Login</h3>

                                <h6 class="mt-3 text-start">Username / Email</h6>
                                <input name="username" onChange={this.inputHandler} type="text" className="form-control"  required autoFocus />
                                <h6 class="mt-3 text-start">Password</h6>
                                <input name="password" onChange={this.inputHandler} type="password" className="form-control" />
                                <div class="d-flex justify-content-between">                                
                                        <div >
                                            <input class="form-check-input me-1" type="checkbox" id="flexCheckDefault" />
                                            <label class="form-check-label" for="flexCheckDefault"> remember me </label>
                                        </div>
                                        <Link class="text-decoration-none" to ="/forgot-password"> Forgot Password?</Link>
                                        
                                    </div>
                                    <div class="d-flex flex-column align-items-center">
                                        <button onClick={() => this.props.loginUser(this.state)} className="btn btn-primary mt-3 col-12">Sign In</button>
                                        

                                        <button class="btn mt-3 col-12 border-secondary">
                                            <img class="me-2" src={Google} alt="" style={{height:"20px"}} />
                                            Sign In with Google
                                        </button>
                                    </div>
                                    <h6 class="mt-3 text-center">
                                        Dont Have an Account?
                                        <Link class="text-decoration-none" to ="/Register"> Regsiter</Link>
                                    </h6>
                            </div>
                        <img class="wave" src={Wave} alt="" />
                        </div>
                    </div>
                </div>
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