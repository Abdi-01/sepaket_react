import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { registerUser } from '../../redux/actions/user'
import { connect } from 'react-redux'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import Avatar from "../../assets/images/avatar3.png"
import Wave from "../../assets/images/wave5.png"
import Login from "../../assets/images/signUp3.png"
import "../../assets/styles/signUpStyles.css"
import Google from "../../assets/images/google.png"

class Register extends React.Component {
    state = {
        fullname: "",
        username: "",
        email: "",
        password: "",
    }

inputHandler = (event) =>{
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value })
}
    
    render(){
        if (this.props.userGlobal.status === "verified"){
            return <Redirect to="/" />
        }
        return (
            <div class="text-center mb-4">
                <img class="wave" src={Wave} alt="" />
                <h4 class="my-3">Let's Sign Up and get an account to customized your Hampers</h4>
                <div class="container">
                    <div class="row">
                        <div class="col mt-5">
                            <img src={Login} alt="login" height="310" />
                        </div>
                    <div class="col ">
                        <img src={Avatar} alt="avatar" height="70"/>
                        <h3 class="mb-3 fw-normal">Register </h3>
                        <button class="btn mt-3 col-8 border-secondary">
                            <img class="me-2" src={Google} alt="" style={{height:"20px"}} />
                            Sign Up with Google
                        </button>
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <form action="">
                                        <h6 class="mt-3 text-start">Full Name</h6>
                                        <input name="fullname" onChange={this.inputHandler} type="text" class="form-control"  required autoFocus />
                                        
                                        <h6 class="mt-3 text-start">user name</h6>
                                        <input name="username" onChange={this.inputHandler} type="text" class="form-control" />
                                    </form>
                                </div>
                                <div class="col">
                                    <form action="">
                                        <h6 class="mt-3 text-start">Email</h6>
                                        <input name="email" onChange={this.inputHandler} type="email" class="form-control" />
                                        
                                        <h6 class="mt-3 text-start">Password</h6>
                                        <input name="password" onChange={this.inputHandler} type="password" class="form-control" />
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3 ms-4 ps-4 text-start" >
                                <input class="form-check-input me-1" type="checkbox" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault"> I agree with term and privacy policy</label>
                            </div>
                            <div class="d-flex flex-column align-items-center">
                                <button onClick={() => this.props.registerUser(this.state)} class="btn btn-primary mt-3 col-10">Create Account</button>

                            </div>
                            <h6 class="mt-3 text-center">
                                Already Have an Account?
                                <Link class="text-decoration-none" to ="/Login"> Login</Link>
                            </h6>
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
    registerUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);