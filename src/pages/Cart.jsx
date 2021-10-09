import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import { API_URL } from '../constants/API'
import { getCartData } from '../redux/actions/cart'

class Cart extends React.Component {
    state = {
        isCheckoutMode: false,
        recipientName: "",
        address:"",
        payment:0
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
                    <td className="align-middle">{val.productName}</td>
                    <td className="align-middle">{val.price}</td>
                    <td className="align-middle">
                        <img src={val.productImage} alt="" style={{height:"120px"}} />
                    </td>
                    <td className="align-middle">{val.quantity}</td>
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

        if (this.state.payment < 1.05*this.renderSubtotalPrice()){
            alert(`uang Anda kurang ${1.05*this.renderSubtotalPrice()-this.state.payment}`)
            return
        }

        if (this.state.payment > 1.05*this.renderSubtotalPrice()){
            alert(`Terima Kasih, uang kembalian Anda ${this.state.payment-1.05*this.renderSubtotalPrice()}`)
        } else if (this.state.payment === 1.05*this.renderSubtotalPrice()){
            alert(`Terima Kasih sudah membayar dengan uang pas`)
        }

        const d = new Date()
        Axios.post(`${API_URL}/transaction`,{
            userId : this.props.userGlobal.id,
            adress : this.state.adress,
            recipientName : this.state.recipientName,
            totalPrice : parseInt(1.05*this.renderSubtotalPrice()), 
            totalPayment : parseInt(this.state.payment),
            transactionDate : `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()} `,
            transactionItem : this.props.cartGlobal.cartList
        })
        .then((result)=>{
            alert ("berhasil melakukan pembayaran")
            result.data.transactionItem.forEach((val)=>{
                this.deleteCartHandler(val.id)
            })

        })
    }

    render(){
        return (
            <div className="p-5 text-center">
                 <h1>Cart</h1>
                <div className="row mt-5">
                    <div className="col-9 text-center">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
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
                                    <span>Sub Total Price</span>
                                    <span>Rp {this.renderSubtotalPrice()}</span>
                                </div>
                                <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                                    <span>Tax 5%</span>
                                    <span>Rp {0.05*this.renderSubtotalPrice()} </span>
                                </div>
                                <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                                    <span>Total Price</span>
                                    <span>Rp {1.05*this.renderSubtotalPrice()}</span>
                                </div>
                            </div>
                            <div className="card-body border-top">
                                <label htmlFor="recipientName">Recipient Name</label>
                                <input onChange={this.inputHandler} type="text" className="form-control mb-3" name="recipientName" />
                                <label htmlFor="address">Address</label>
                                <input onChange={this.inputHandler} type="text" className="form-control" name="address" />
                            </div>
                            <div className="card-footer">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                <input onChange={this.inputHandler} name="payment" type="number" className="form-control mx-1"/>
                                <button onClick={this.payBtnHandler} className="btn btn-success mx-1">pay</button>
                                </div>
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