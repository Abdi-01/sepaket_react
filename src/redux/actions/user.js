import Axios from 'axios'
import { API_URL } from '../../constants/API'

export const registerUser = ({ username, fullname, email, password }) => {
    return (dispatch) => {
        Axios.post(`${API_URL}/users/add-user`,{
            username,
            fullname,
            email,
            password
        })
        alert (`Please check email and let's verification your Sepaket account`)
    }
    
}

export const loginUser = ({ username, password }) => {
    return (dispatch) => {
        Axios.post(`${API_URL}/users/login`,{
            email: username,
            password
        })
        .then((result)=>{
            if(!result.data.dataLogin) alert (result.data.message)
            console.log(result.data)
            localStorage.setItem("userDataEmmerce",JSON.stringify(result.data.dataLogin))
            dispatch({
                type: "USER_LOGIN",
                payload: result.data.dataLogin
            })
        })
    }
    
}

export const logoutUser = ()=>{
    localStorage.removeItem("userDataEmmerce")
    return {
        type: "USER_LOGOUT"
    }
}

export const userKeepLogin = (userData) => {
    return (dispatch) => {
        console.log(userData.username)
        Axios.get(`${API_URL}/users/get`,{
            params: {
                username : userData.username
            }
        })
        .then ((result)=>{
            delete result.data[0].password

            localStorage.setItem("userDataEmmerce",JSON.stringify(result.data[0]))

            dispatch({
                type: "USER_LOGIN",
                payload: result.data[0] 
                })
        })
    }
}

export const checkStorage = ()=>{
    return {
        type: "CHECK_STORAGE"
    }
}