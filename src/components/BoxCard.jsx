import React from 'react'
import "../assets/styles/product_card.css" 

import Axios from 'axios'
import { API_URL } from '../constants/API'
import { connect } from 'react-redux'
import { getCartData } from '../redux/actions/cart'

class BoxCard extends React.Component {
    
    addToCartHandler = (a,b,c,d) => {
        Axios.get(`${API_URL}/carts/add-cart`,{
            params: {
                userId: this.props.userGlobal.id,
                productId: a
            }
        })
        .then((result)=>{
            if (result.data.length){
                Axios.patch(`${API_URL}/carts/${result.data[0].id}`,{
                    quantity: result.data[0].quantity + 1
                })
                .then (() =>{ alert("berhasil menambahkan barang")
                    this.props.getCartData(this.props.userGlobal.id)
                })
  
            } else {
                Axios.post(`${API_URL}/carts`,{
                    userId : this.props.userGlobal.id,
                    productId : a,
                    price : b,
                    productName : c,
                    productImage : d,
                    quantity : 1
                })
                .then(()=>{alert("berhasil menambahkan barang")
                    this.props.getCartData(this.props.userGlobal.id)
                })
            }
        })
    }

    render (){
        return (
            <div className="text-center">

                <table className="table">
                    <tbody>
                        <tr>
                            <td className="align-middle">{this.props.BoxData.product_name}</td>
                            <td className="align-middle">
                                <img src={this.props.BoxData.photo_product} alt="" style={{height:"120px"}} />
                            </td>
                            <td className="align-middle">1</td>
                            <td className="align-middle">
                                <button className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userGlobal: state.user
    }
}

const mapDispatchToProps = {
    getCartData,
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxCard)