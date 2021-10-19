import React from 'react'
import Axios from 'axios'
import { API_URL } from '../constants/API'
import { connect } from 'react-redux'
import { getCartData } from '../redux/actions/cart'

class ProductDetail extends React.Component {
    state ={
        productData: {},
        productNotFound: false,
        quantity: 1,
        harga:0
    }

    fetchProductData = () => {
        Axios.get(`${API_URL}/parcels/get`,{
            params:{
                id_parcel: this.props.match.params.productId
            }
        })
        .then((result)=>{
            if (result.data.length){
                this.setState({ productData: result.data[0], harga: result.data[0].harga_jual })
            } else {
                this.setState({ productNotFound: true})
            }
        })
        .catch(()=>{
            alert("Terjadi kesalahan di Server")
        })
    }

    componentDidMount(){
        this.fetchProductData()
    }

    qtyBtnHandler = (action) => {
        if (action === "increment"){
            this.setState({quantity: this.state.quantity + 1})
        } else if (action === "decrement" && this.state.quantity > 1){
            this.setState({quantity: this.state.quantity - 1})
        }
    }
 
    addToCartHandler = () => {
        Axios.get(`${API_URL}/carts`,{
            params: {
                userId: this.props.userGlobal.id,
                productId: this.state.productData.id
            }
        })
        .then((result)=>{
            if (result.data.length){
                Axios.patch(`${API_URL}/carts/${result.data[0].id}`,{
                    quantity: result.data[0].quantity + this.state.quantity
                })
                .then (() =>{ alert("berhasil menambahkan barang")
                    this.props.getCartData(this.props.userGlobal.id)
                })

            } else {
                Axios.post(`${API_URL}/carts`,{
                    userId : this.props.userGlobal.id,
                    productId : this.state.productData.id,
                    price : this.state.productData.price,
                    productName : this.state.productData.productName,
                    productImage : this.state.productData.productImage,
                    quantity : this.state.quantity
                })
                .then(()=>{alert("berhasil menambahkan barang")
                    this.props.getCartData(this.props.userGlobal.id)
                })
            }
        })
    }

    render(){
        console.log(this.state.productData.harga_jual);
        return (
           <div className="container">
               {
                   this.state.productNotFound ? 
                   <div className="alert alert-warning mt-3">Product with ID {this.props.match.params.productId} has not been found</div>
                   :
               <div className="row mt-3">
                   <div className="col-sm-4">
                       <img
                       style ={{width:"100%", "max-width":350, "min-width":150}}
                       src={this.state.productData.photo_parcel}
                       alt="parcel"
                       />
                   </div>
                   <div className="col-sm-5 d-flex flex-column justify-content-center">
                        <ul class="">
                            <li>mix & match gift items</li>
                            <li>get free exclusive & beautiful card</li>
                            <li>gift delivery to all Indonesia area</li>
                            <li>sameday delivery available for Jabodetabek</li>
                        </ul>
                   </div>
                   <div className="col-sm-3 d-flex flex-column justify-content-center">
                       <h5>{this.state.productData.parcel_name}</h5>
                       <h5>Rp {this.state.harga.toLocaleString()}</h5>
                       
                       {         
                           this.state.productData.category =="customized parcel"?
                           <p>oke</p>
                           :
                           <>
                       
                            <div className="d-flex flex-row align-item-center">
                                <button onClick={()=>this.qtyBtnHandler("decrement")} className="btn btn-primary">
                                    -
                                </button>
                                <div className="m-2"> {this.state.quantity} </div>
                                <button onClick={()=>this.qtyBtnHandler("increment")} className="btn btn-primary">
                                    +
                                </button>
                            </div>
                            <button onClick={this.addToCartHandler} className="btn btn-success mt-3">
                                Add To Cart
                            </button>
                            </>
                        }
                   </div>
               </div>
               }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)