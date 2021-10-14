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
        // .then((result)=>{
        //     console.log(result.data[0])
        //     localStorage.setItem("userDataEmmerce",JSON.stringify(result.data[0]))
        //     dispatch({
        //         type: "USER_LOGIN",
        //         payload: result.data[0]
        //     })
        //     alert (`Please check email and let's verification your Sepaket account`)
        // })
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
    //     return (dispatch)=>{
//         Axios.get(`${API_URL}/users/get`,{
//             params: {
//                 username,
//             }
//         })
//         .then((result)=>{
//             console.log(result.data[0])
//             if(result.data.length){
//                 if (password===result.data[0].password){
//                     delete result.data[0].password

//                     localStorage.setItem("userDataEmmerce",JSON.stringify(result.data[0]))
//                     console.log(localStorage)

//                     dispatch({
//                         type: "USER_LOGIN",
//                         payload: result.data[0]
//                         }) 
                    
//                 } else {
//                     dispatch({
//                         type: "USER_ERROR",
//                         payload: "Wrong password"
//                     })
//                 }
//             } else {
//                 Axios.get(`${API_URL}/users/get`,{
//                     params: {
//                         email : username,
//                     }
//                 })
//                 .then((result)=>{
//                     console.log(result.data)
//                     if(result.data.length){
//                         if (password===result.data[0].password){
//                             delete result.data[0].password
        
//                             localStorage.setItem("userDataEmmerce",JSON.stringify(result.data[0]))
        
//                             dispatch({
//                                 type: "USER_LOGIN",
//                                 payload: result.data[0]
//                                 }) 
//                         } else {
//                             dispatch({
//                                 type: "USER_ERROR",
//                                 payload: "Wrong password"
//                             })
//                         }
//                     } else {
//                         dispatch({
//                             type: "USER_ERROR",
//                             payload: "User not found"
//                         })
//                     }
//                 })
//             }
//         })
//     }
// }

export const logoutUser = ()=>{
    localStorage.removeItem("userDataEmmerce")
    return {
        type: "USER_LOGOUT"
    }
}

export const userKeepLogin = (userData) => {
    return (dispatch) => {
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