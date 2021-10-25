import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import { API_URL } from '../constants/API'
import { getCartData } from '../redux/actions/cart'
import { Redirect } from 'react-router-dom'

class Cart extends React.Component {
    state = {
        isCheckoutMode: false,
        recipientName: "",
        address:"",
        payment:0
    }
    
    componentDidMount(){
        this.props.getCartData(this.props.userGlobal.id_user)
        console.log(this.props.cartGlobal.cartList)
        
        Axios.get(`${API_URL}/carts/get-detail`,{ 
            params:{userId: this.props.userGlobal.id_user}
        })
        .then((result)=>{
            this.setState({detailItem: result.data})
            console.log(this.state.detailItem)
        })
    }

    deleteCartHandler = (cartId) => {
        Axios.delete(`${API_URL}/carts/${cartId}`)
        .then(()=>{
            alert("berhasil menghapus item dari cart")
            this.props.getCartData(this.props.userGlobal.id)
        })
    }

    renderCart = () => {
        return this.props.cartGlobal.cartList.map((val)=>{
            return (
                <tr>
                    <td className="align-middle">{val.parcel_name}</td>
                    <td className="align-middle">Rp {val.harga_jual.toLocaleString()}</td>
                    <td className="align-middle">
                        <img src={val.photo_parcel} alt="" style={{height:"120px"}} />
                    </td>
                    <td className="align-middle">{val.qty_parcel}</td>
                    <td className="align-middle">{val.quantity * val.price}</td>
                    <td className="align-middle">
                        <button onClick={()=> this.deleteCartHandler(val.id) } className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })
    }

    renderSubtotalPrice = ()=>{
        let subtotal = 0
        for (let i = 0; i < this.props.cartGlobal.cartList.length; i++) {
            subtotal += this.props.cartGlobal.cartList[i].price * this.props.cartGlobal.cartList[i].quantity
        }
        return subtotal
    }

    checkoutModeToggle = ()=> {
        this.setState({isCheckoutMode: !this.state.isCheckoutMode})
    }

    inputHandler = (event)=>{
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    payBtnHandler = () =>{
        const d = new Date()
        Axios.post(`${API_URL}/user-transactions/add-transaction`,{
            cart_date :  `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`,
            total_trx : parseInt(this.renderSubtotalPrice()), 
            id_user : this.props.userGlobal.id_user,
            address : this.state.address,
        })
        .then((res)=>{alert("berhasil melakukan transaksi silahkan lakukan transfer")
            Axios.post(`${API_URL}/user-transactions/detail-transaction`,{
                id_trx : res.data.hasil.insertId,
                cartList : this.props.cartGlobal.cartList,
                detailItem : this.state.detailItem
            })

            this.props.cartGlobal.cartList.forEach((val)=>{
                this.deleteCartHandler(val.id_cart)
            })
        })
    }

    render(){
        if (this.props.userGlobal.status !== "verified"){
            return <Redirect to="/Login" />
        }
        return (
            <div className="p-5 text-center">
                 <h1>Cart</h1>
                <div className="row mt-5">
                    <div className="col-9 text-center">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>Nama Parcel</th>
                                    <th>Harga</th>
                                    <th>Image</th>
                                    <th>Quantity</th>
                                    <th>Detail</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                            </tbody>
                            <tfoot className="bg-light">
                                <tr>
                                    <td colSpan="6">
                                        <button onClick={this.checkoutModeToggle} className="btn btn-success">
                                            Checkout
                                        </button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                {
                    this.state.isCheckoutMode?
                    <div className="col-3">
                        <div className="card text-lg-start">
                            <div className="card-header">
                                <strong>Order Summary</strong>
                            </div>
                            <div className="card-body">
                                <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                                    <span>Total Price</span>
                                    <span>Rp {this.renderSubtotalPrice().toLocaleString()}</span>
                                </div>

                            </div>
                            <div className="card-body border-top">
                                <label htmlFor="recipientName">Recipient Name</label>
                                <input onChange={this.inputHandler} type="text" className="form-control mb-3" name="recipientName" />
                                <label htmlFor="address">Address</label>
                                <input onChange={this.inputHandler} type="text" className="form-control" name="address" />
                            </div>
                            <div className="card-footer">
                                <button onClick={this.payBtnHandler} className="btn btn-success mx-1">pay</button>
                            </div>
                        </div>
                    </div>
                    : null
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cartGlobal : state.cart,
        userGlobal : state.user
    }
}

const mapDispatchToProps = {
    getCartData
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);