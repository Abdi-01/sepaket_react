import React from 'react'
import "../assets/styles/product_card.css" 
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { API_URL } from '../constants/API'
import { connect } from 'react-redux'
import { getCartData } from '../redux/actions/cart'

class ProductCard extends React.Component {
    
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
            <div className="card product-card">
                <img src={API_URL+this.props.productData.photo_parcel} alt="foto parcel"/>
            <div className="mt-2">
                <div>
                    <Link to={`/ProductDetail/${this.props.productData.id_parcel}`} style={{ textDecoration:"none", color: "inherit" }}>
                    <h6>{this.props.productData.parcel_name}</h6>
                    </Link>
                    <span className="text-muted">Rp. {this.props.productData.harga_jual.toLocaleString()}</span>
                </div>
                <div className="d-flex flex-row justify-content-end">
                    <Link to={`/ProductDetail/${this.props.productData.id_parcel}`} style={{ textDecoration:"none", color: "inherit" }}>
                        <button className="btn btn-primary mt-2">Detail</button>
                    </Link>
                    {/* <button onClick={()=>this.addToCartHandler(this.props.productData.id_parcel,this.props.productData.harga_jual,this.props.productData.parcel_name,this.props.productData.photo_parcel)} className="btn btn-primary mt-2">Add To Cart</button> */}
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