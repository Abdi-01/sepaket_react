import React from 'react'
import "../assets/styles/product_card.css" 
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { API_URL } from '../constants/API'
import { connect } from 'react-redux'
import { getCartData } from '../redux/actions/cart'

class ProductCard extends React.Component {
    
    addToCartHandler = (a,b,c,d) => {
        Axios.get(`${API_URL}/carts`,{
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
            <div className="card product-card">
                <img src={this.props.productData.productImage}/>
            <div className="mt-2">
                <div>
                    <Link to={`/ProductDetail/${this.props.productData.id}`} style={{ textDecoration:"none", color: "inherit" }}>
                    <h6>{this.props.productData.productName}</h6>
                    </Link>
                    <span className="text-muted">Rp. {this.props.productData.price}</span>
                </div>
                <div className="d-flex flex-row justify-content-end">
                    <button onClick={()=>this.addToCartHandler(this.props.productData.id,this.props.productData.price,this.props.productData.productName,this.props.productData.productImage)} className="btn btn-primary mt-2">Add To Cart</button>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)