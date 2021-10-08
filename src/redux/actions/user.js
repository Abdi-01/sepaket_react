import Axios from 'axios'
import { API_URL } from '../../constants/API'

export const registerUser = ({ fullName, username, email, password }) => {
    return (dispatch) => {
        Axios.post(`${API_URL}/user`,{
            fullName,
            username,
            email,
            password,
            role: "user"
        })
        .then((result)=>{
            localStorage.setItem("userDataEmmerce",JSON.stringify(result.data))
            dispatch({
                type: "USER_LOGIN",
                payload: result.data
            })
            alert ('berhasil menambah user')
        })
    }
    
}

export const loginUser = ({ username, password }) => {
    return (dispatch)=>{
        Axios.get(`${API_URL}/user`,{
            params: {
                username,
            }
        })
        .then((result)=>{
            console.log(result.data)
            if(result.data.length){
                if (password===result.data[0].password){
                    delete result.data[0].password

                    localStorage.setItem("userDataEmmerce",JSON.stringify(result.data[0]))

                    dispatch({
                        type: "USER_LOGIN",
                        payload: result.data[0]
                        }) 
                } else {
                    dispatch({
                        type: "USER_ERROR",
                        payload: "Wrong password"
                    })
                }
            } else {
                Axios.get(`${API_URL}/user`,{
                    params: {
                        email : username,
                    }
                })
                .then((result)=>{
                    console.log(result.data)
                    if(result.data.length){
                        if (password===result.data[0].password){
                            delete result.data[0].password
        
                            localStorage.setItem("userDataEmmerce",JSON.stringify(result.data[0]))
        
                            dispatch({
                                type: "USER_LOGIN",
                                payload: result.data[0]
                                }) 
                        } else {
                            dispatch({
                                type: "USER_ERROR",
                                payload: "Wrong password"
                            })
                        }
                    } else {
                        dispatch({
                            type: "USER_ERROR",
                            payload: "User not found"
                        })
                    }
                })
            }
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
        Axios.get(`${API_URL}/user`,{
            params: {
                id : userData.id
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