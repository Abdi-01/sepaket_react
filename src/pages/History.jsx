import React from 'react'
import Axios from 'axios'
import { API_URL } from '../constants/API'
import { connect } from 'react-redux'

class History extends React.Component {
    state = {
        transactionList:[],
        transactionDetails:[],
        detail: false,
    }

    fetchTransactions = () =>{
        Axios.get(`${API_URL}/transaction`,{
            params:{
                userId: this.props.userGlobal.id
            }
        })
        .then((result)=>{
            console.log(result.data)
            this.setState({ transactionList: result.data})
        })
    }

    seeDetailsBtnHandler = (transactionDetails)=>{
        this.setState({
            detail: true,
            transactionDetails
        })
    }

    renderTransactions = () => {
        return this.state.transactionList.map(val => {
            return (
                <tr>
                    <td>{val.transactionDate}</td>
                    <td>{val.transactionItem.length} Item(s)</td>
                    <td>Rp {val.totalPrice}</td>
                    <td>
                        <button onClick={()=>this.seeDetailsBtnHandler(val.transactionItem)} className="btn btn-info">See Detail</button>
                    </td>
                </tr>
            )
        })
    }

    renderTransactionDetailItems = ()=>{
        return this.state.transactionDetails.map(val=>{
            return (
                <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                    <span className="font-weight-bold">{val.productName}({val.quantity})</span>
                    <span>{val.price*val.quantity}</span>
                </div>
            )
        })
    }

    componentDidMount() {
        this.fetchTransactions()
    }

    render(){
        return (
            <div className="p-5">
                <h1>Transaction History</h1>
                <div className="row mt-5">
                    <div className="col-8">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>Transaction Date</th>
                                    <th>Total Item</th>
                                    <th>Total Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTransactions()}
                            </tbody>
                        </table>
                    </div>
                    {
                    this.state.detail?
                        <div className="col-4">
                            <div className="card">
                                <div className="card-header">
                                    <strong>Transaction Detail</strong>
                                </div>
                                <div className="card-body">
                                    {this.renderTransactionDetailItems()}
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
        userGlobal: state.user
    }
}

export default connect(mapStateToProps)(History);