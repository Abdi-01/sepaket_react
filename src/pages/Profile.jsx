import React from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import { API_URL } from '../constants/API'
import { registerUser } from '../redux/actions/user'
import { connect } from 'react-redux'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import Avatar from "../assets/images/avatar3.png"
import Wave from "../assets/images/wave5.png"


class profile extends React.Component {
    state = {
        fullname: "",
        username: "",
        email: "",
        password: "",
        selectedFile : null,
        phoneNumber : "",
        age : "",
        gender : "",
        address : "",
        id_user:"",
        oldPassword:"",
        newPassword:"",
        edit:""
    }

    componentDidMount() {
        this.fetchDataUser()
    }

    fetchDataUser = (username=this.props.userGlobal.username) => {
        Axios.get(`${API_URL}/users/get`,{
            params: {username}
        })
        .then((result)=>{
            this.setState({
                fullname: result.data[0].fullname,
                username: result.data[0].username,
                email: result.data[0].email,
                id_user: result.data[0].id_user,
                phoneNumber : result.data[0].phoneNumber,
                age : result.data[0].age,
                gender : result.data[0].gender,
                address : result.data[0].address,
                oldPassword:"",
                newPassword:"",
            })
        })       
    }

    editBTn = () =>{
        this.setState({edit: "yes"})
    }

    inputHandler = (event) =>{
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value })
    }

    saveBTnHandler = () => {
        Axios.patch(`${API_URL}/users/edit-user/${this.state.id_user}`,{
            fullname: this.state.fullname,
            username: this.state.username,
            email: this.state.email,
            phoneNumber : this.state.phoneNumber,
            age : this.state.age,
            gender : this.state.gender,
            address : this.state.address,
        })
        .then(()=>{
            this.fetchDataUser()
            this.setState({edit: ""})
        })
    }

    changePassword = () => {
            Axios.patch(`${API_URL}/users/change-password/${this.state.id_user}`,{
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword
            })
            .then((res)=>{
                alert(res.data.message)
            })
    }

    fileSelectedHandler = event =>{
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () =>{
        const fd = new FormData();
        fd.append('image',this.state.selectedFile, this.state.selectedFile.name)
        Axios.post(`${API_URL}/user`,{fd})
            .then(res=> {
                console.log(res)
            })
    }
    
    render(){
        if (this.props.userGlobal.status !== "verified"){
            return <Redirect to="/Login" />
        }
        return (
            <div class="text-center mb-4">
                <img class="wave" src={Wave} alt="" />
                <h4 class="my-3">Edit Profile</h4> 
                <div class="container">
                    <div class="row">


                    <div class="col mb-5">
                            
                            <img src={Avatar} alt="avatar" height="90"/>

                            <div class="d-flex justify-content-center mx-4">
                                <input type="file" onChange={this.fileSelectedHandler} />
                                <button class="btn btn-primary" onClick={this.fileUploadHandler}>Upload</button>
                            </div>

                            {
                                    this.state.edit?
                                    <div class="container ">
                                    <div class="row">
                                        
                                        <div class="col">
                                            <form action="">
                                                <h6 class="mt-3 text-start">Full Name</h6>
                                                <input name="fullname" value={this.state.fullname} onChange={this.inputHandler} type="text" class="form-control"  required />
                                                
                                                <h6 class="mt-3 text-start">user name</h6>
                                                <input name="username" value={this.state.username} onChange={this.inputHandler} type="text" class="form-control" />
                                            </form>
                                        </div>
                                        <div class="col">
                                            <form action="">
                                                <h6 class="mt-3 text-start">Email</h6>
                                                <input name="email" value={this.state.email} onChange={this.inputHandler} type="email" class="form-control" />
                                                
                                                <h6 class="mt-3 text-start">Phone Number</h6>
                                                <input name="phoneNumber" value={this.state.phoneNumber} onChange={this.inputHandler} type="number" class="form-control" autoFocus />
                                            </form>
                                        </div>
                                        <div class="col">
                                            <form action="">
                                                <h6 class="mt-3 text-start">Age</h6>
                                                <input name="age" value={this.state.age} onChange={this.inputHandler} type="number" class="form-control" />
                                            </form>
                                        </div>
                                        <div class="col">
                                        <h6 class="mt-3 text-start">Gender</h6>
                                        <div class="d-flex mt-2">
                                            {
                                                this.state.gender === "Male"?
                                                
                                                <>
                                                <div class="form-check">
                                                <input class="form-check-input" type="radio" name="gender" value="Male" onChange={this.inputHandler} id="flexRadioDefault1" checked/>
                                                <label class="form-check-label" for="flexRadioDefault1"> Male </label>
                                                </div>
                                                <div class="ms-5 form-check">
                                                    <input class="form-check-input" type="radio" name="gender" value="Female" onChange={this.inputHandler} id="flexRadioDefault2" />
                                                    <label class="form-check-label" for="flexRadioDefault2"> Female </label>
                                                </div>
                                                </> 
                                                :
                                                this.state.gender === "Female"?
                                                
                                                <>
                                                <div class="form-check">
                                                <input class="form-check-input" type="radio" name="gender" value="Male" onChange={this.inputHandler} id="flexRadioDefault1" />
                                                <label class="form-check-label" for="flexRadioDefault1"> Male </label>
                                                </div>
                                                <div class="ms-5 form-check">
                                                    <input class="form-check-input" type="radio" name="gender" value="Female" onChange={this.inputHandler} id="flexRadioDefault2" checked/>
                                                    <label class="form-check-label" for="flexRadioDefault2"> Female </label>
                                                </div>
                                                </> 
                                                :
                                                <>
                                                <div class="form-check">
                                                <input class="form-check-input" type="radio" name="gender" value="Male" onChange={this.inputHandler} id="flexRadioDefault1"/>
                                                <label class="form-check-label" for="flexRadioDefault1"> Male </label>
                                                </div>
                                                <div class="ms-5 form-check">
                                                    <input class="form-check-input" type="radio" name="gender" value="Female" onChange={this.inputHandler} id="flexRadioDefault2"/>
                                                    <label class="form-check-label" for="flexRadioDefault2"> Female </label>
                                                </div>
                                                </> 
                                            }
    
                                        </div>
                                        </div>
                                        <div class="col">
                                            <form action="">
                                                <h6 class="mt-3 text-start">Address</h6>
                                                <input name="address" value={this.state.address} onChange={this.inputHandler} type="text" class="form-control"/>
                                            </form>
                                        </div>
                                    </div>
                                    <button onClick={this.saveBTnHandler}  class="btn btn-primary mt-3 col-5">Save</button>
                                </div>
                                    :
                                    <div class="container ">
                                    <div class="row">
                                        
                                        <div class="col">
                                            <form action="">
                                                <h6 class="mt-3 text-start">Full Name</h6>
                                                <input name="fullname" value={this.state.fullname} onChange={this.inputHandler} type="text" class="form-control"  required disabled/>
                                                
                                                <h6 class="mt-3 text-start">user name</h6>
                                                <input name="username" value={this.state.username} onChange={this.inputHandler} type="text" class="form-control" disabled />
                                            </form>
                                        </div>
                                        <div class="col">
                                            <form action="">
                                                <h6 class="mt-3 text-start">Email</h6>
                                                <input name="email" value={this.state.email} onChange={this.inputHandler} type="email" class="form-control" disabled/>
                                                
                                                <h6 class="mt-3 text-start">Phone Number</h6>
                                                <input name="phoneNumber" value={this.state.phoneNumber} onChange={this.inputHandler} type="number" class="form-control" autoFocus disabled />
                                            </form>
                                        </div>
                                        <div class="col">
                                            <form action="">
                                                <h6 class="mt-3 text-start">Age</h6>
                                                <input name="age" value={this.state.age} onChange={this.inputHandler} type="number" class="form-control" disabled/>
                                            </form>
                                        </div>
                                        <div class="col">
                                        <h6 class="mt-3 text-start">Gender</h6>
                                        <div class="d-flex mt-2">
                                            {
                                                this.state.gender === "Male"?
                                                
                                                <>
                                                <div class="form-check">
                                                <input class="form-check-input" type="radio" name="gender" value="Male" onChange={this.inputHandler} id="flexRadioDefault1" checked disabled/>
                                                <label class="form-check-label" for="flexRadioDefault1"> Male </label>
                                                </div>
                                                <div class="ms-5 form-check">
                                                    <input class="form-check-input" type="radio" name="gender" value="Female" onChange={this.inputHandler} id="flexRadioDefault2" disabled />
                                                    <label class="form-check-label" for="flexRadioDefault2"> Female </label>
                                                </div>
                                                </> 
                                                :
                                                this.state.gender === "Female"?
                                                
                                                <>
                                                <div class="form-check">
                                                <input class="form-check-input" type="radio" name="gender" value="Male" onChange={this.inputHandler} id="flexRadioDefault1" disabled/>
                                                <label class="form-check-label" for="flexRadioDefault1"> Male </label>
                                                </div>
                                                <div class="ms-5 form-check">
                                                    <input class="form-check-input" type="radio" name="gender" value="Female" onChange={this.inputHandler} id="flexRadioDefault2" checked disabled/>
                                                    <label class="form-check-label" for="flexRadioDefault2"> Female </label>
                                                </div>
                                                </> 
                                                :
                                                <>
                                                <div class="form-check">
                                                <input class="form-check-input" type="radio" name="gender" value="Male" onChange={this.inputHandler} id="flexRadioDefault1" disabled/>
                                                <label class="form-check-label" for="flexRadioDefault1"> Male </label>
                                                </div>
                                                <div class="ms-5 form-check">
                                                    <input class="form-check-input" type="radio" name="gender" value="Female" onChange={this.inputHandler} id="flexRadioDefault2" disabled/>
                                                    <label class="form-check-label" for="flexRadioDefault2"> Female </label>
                                                </div>
                                                </> 
                                            }
    
                                        </div>
                                        </div>
                                        <div class="col">
                                            <form action="">
                                                <h6 class="mt-3 text-start">Address</h6>
                                                <input name="address" value={this.state.address} onChange={this.inputHandler} type="text" class="form-control" disabled/>
                                            </form>
                                        </div>
                                    </div>
                                   <button onClick={this.editBTn} class="btn btn-light mt-3 col-5">Edit</button>
                                </div>
                            }
                        </div>

                        <div class="col mt-5">
                            
                            <div class="container border p-4">
                                <form action="">
                                    <h6 class="mt-3 text-start">Old Password</h6>
                                    <input name="oldPassword" onChange={this.inputHandler} value={this.state.oldPassword} type="password" class="form-control" />
                                </form>
                                <form action="">
                                    <h6 class="mt-3 text-start">New Password</h6>
                                    <input name="newPassword" onChange={this.inputHandler} value={this.state.newPassword} type="password" class="form-control" />
                                </form>
                            <button onClick={this.changePassword} class="btn btn-primary mt-3 col-6">Change Password</button>
                            </div>     
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

export default connect(mapStateToProps, mapDispatchToProps)(profile);