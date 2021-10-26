import Axios from 'axios'
import { API_URL } from '../../constants/API'

export const getCartData = (userId) => {
    console.log('getCartData Jalan')
    return(dispatch) => {
        Axios.get(`${API_URL}/carts/get`,{ 
            params:{userId}
        })
        .then((result)=>{
            dispatch ({
                type : "FILL_CART",
                payload : result.data
            })
        })
    }
}