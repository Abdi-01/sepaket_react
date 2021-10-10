import axios from "axios";
import React from "react";
import { API_URL } from "../../constants/API";

class VerificationPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            message: 'Loading...'
        }
    }

    componentDidMount(){
        axios.patch(API_URL+'/users/verified',{},{
            headers: {
                'Authorization' : `Bearer ${this.props.match.params.token}`
            }
        }).then(res=>{
            this.setState({message: "Your Account Verified"})
        }).catch(err=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div className="container p-5">
                <h2>{this.state.message}</h2>
            </div>
        )
    }
}

export default VerificationPage