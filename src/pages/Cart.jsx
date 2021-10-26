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
        payment:0,
        detailItem:[],

        editId: 0,
        editQty:1,
        selectedFile : null,
        id_trx:0
    }

    editToggle = (val) =>{
        this.setState({
            editId: val.id_cart,
            editQty: val.qty_parcel,
        })
    }

    saveBTnHandler = (id_cart) => {
        Axios.patch(`${API_URL}/carts/edit-cart/${id_cart}`,{
            qty_parcel:this.state.editQty
        })
        .then(()=>{
            this.setState({editId:0})
            this.componentDidMount()
        })
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

    deleteCartHandler = (id_cart) => {
        Axios.delete(`${API_URL}/carts/delete-cart/${id_cart}`)
        .then(()=>{
            alert("berhasil menghapus item dari cart")
            this.componentDidMount()
        })
    }

    renderCart = () => {
        return this.props.cartGlobal.cartList.map((val)=>{
            let item = this.state.detailItem.map((item)=>{
                        if(item.parcel_name === val.parcel_name) {
                            return item
                        } return null
                        })
            return (
                <tr>
                    <td className="align-middle">{val.parcel_name}</td>
                    <td className="align-middle">Rp {val.harga_jual.toLocaleString()}</td>
                    <td className="align-middle">
                        <img src={API_URL+val.photo_parcel} alt="" style={{height:"120px"}} />
                    </td>
                    <td className="align-middle">
                        {
                            this.state.editId === val.id_cart?
                            <>
                                <td>
                                    <input value={this.state.editQty} onChange={this.inputHandler} name="editQty" type="text" className="form-control" />
                                </td>
                                <button onClick={()=>this.saveBTnHandler(val.id_cart)}  className="btn btn-success">Save</button>
                            </>
                            :
                            <>
                                <div>{val.qty_parcel}</div>
                                <button onClick={()=> this.editToggle(val)} className="btn btn-secondary">Edit</button>
                            </>
                        }
                    </td>
                    {item.map((isi)=>{
                        if (isi){
                            return(
                                <td className="align-middle d-flex flex-row">
                                    <tr>
                                        <td>
                                            {isi.product_name}
                                        </td>
                                        <td>
                                            {isi.qty_product}pcs
                                        </td>
                                    </tr>
                                </td>
                            )
                        }
                        return null
                    })}
                    
                    <td className="align-middle">
                        <button onClick={()=> this.deleteCartHandler(val.id_cart) } className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })
    }

    renderSubtotalPrice = ()=>{
        let subtotal = 0
        for (let i = 0; i < this.props.cartGlobal.cartList.length; i++) {
            subtotal += this.props.cartGlobal.cartList[i].harga_jual 
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
            this.setState({id_trx: res.data.hasil.insertId})
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

    fileSelectedHandler = event =>{
        console.log(event.target.files)
        if (event.target.files[0]){
            this.setState({selectedFile: event.target.files[0]})
        }
    }

    fileUploadHandler = () =>{
        if(this.state.selectedFile){}
        const formData = new FormData();
        formData.append('file',this.state.selectedFile)
        Axios.patch(`${API_URL}/user-transactions/bukti-transfer/${this.state.id_trx}`, formData)

            .then(res=> {
                alert(res.data.message)
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
                        <div className="card text-lg-start">
                            <div className="card-header">
                                <strong>Bukti Transfer</strong>
                            </div>
                            <div className="card-body">
                                <div class="d-flex justify-content-center mx-4">
                                    <input type="file" onChange={this.fileSelectedHandler} />
                                    <button class="btn btn-primary" onClick={this.fileUploadHandler}>Upload</button>
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