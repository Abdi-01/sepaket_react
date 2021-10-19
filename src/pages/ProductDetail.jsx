import React from 'react'
import Axios from 'axios'
import { API_URL } from '../constants/API'
import { connect } from 'react-redux'
import { getCartData } from '../redux/actions/cart'
import ProductCard from '../components/ItemCard'

class ProductDetail extends React.Component {
    state ={
        productData: {},
        productNotFound: false,
        quantity: 1,
        harga:0,
        customItem:false,
        itemCoklat:0,
        itemDrink:0,
        itemSnack:0,

        itemData: [],
        itemDataCoklat: [],
        itemDataDrink: [],
        itemDataSnack: [],
        filterCoklat: [],
        filterDrink: [],
        filterSnack: [],

        page: 1,
        maxPageCoklat: 0,
        maxPageDrink: 0,
        maxPageSnack: 0,
        itemPerPage: 6,

        searchCoklat: "",
        searchDrink: "",
        searchSnack: "",
    }

    fetchParcelData = () => {
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

    fetchItemData = () => {
        Axios.get(`${API_URL}/products/get`).then((result) => {
            this.setState({
                itemData: result.data,maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
                
            })
        })
    };

    fetchPerItem = ()=> {
        const itemDataCoklat = this.state.itemData.filter((val)=>{return val.id_cat===3})
        const itemDataDrink = this.state.itemData.filter((val)=>{return val.id_cat===2})
        const itemDataSnack = this.state.itemData.filter((val)=>{return val.id_cat===1})

        this.setState({
            itemDataCoklat, itemDataDrink, itemDataSnack,customItem: true,
            filterCoklat: itemDataCoklat ,filterDrink: itemDataDrink ,filterSnack: itemDataSnack,
            maxPageCoklat : Math.ceil(itemDataCoklat.length / this.state.itemPerPage),
            maxPageDrink : Math.ceil(itemDataDrink.length / this.state.itemPerPage),
            maxPageSnack : Math.ceil(itemDataSnack.length / this.state.itemPerPage), page: 1,
        })
    }
    
    componentDidMount(){
        this.fetchParcelData()
        this.fetchItemData()
        
    }
    
    renderProduct = (filteredData) =>{
        const indexAwal = (this.state.page - 1)*this.state.itemPerPage
        let rawData =[...filteredData]

        const dataTampil = rawData.slice(indexAwal, indexAwal+this.state.itemPerPage)

        return dataTampil.map((val)=>{
            return <ProductCard productData={val}/>
        })
    }


    nextPageHandler = () => {
        if (this.state.page < this.state.maxPage) {
            this.setState({page: this.state.page + 1})
        }
    }

    prevPageHandler = () => {
        if (this.state.page > 1 ) {
            this.setState({page: this.state.page - 1})
        }
    }

    searchInputHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        this.setState({[name]:value})
    }
    
    searchBtnHandlerCoklat = () => {
        const filterCoklat= this.state.itemDataCoklat.filter((val)=>{

            return val.product_name.toLowerCase().includes(this.state.searchCoklat.toLowerCase())
        })

        this.setState({ filterCoklat, maxPage : Math.ceil(filterCoklat.length / this.state.itemPerPage), page: 1})
    }

    searchBtnHandlerDrink = () => {
        const filterDrink= this.state.itemDataDrink.filter((val)=>{

            return val.product_name.toLowerCase().includes(this.state.searchDrink.toLowerCase())
        })

        this.setState({ filterDrink, maxPage : Math.ceil(filterDrink.length / this.state.itemPerPage), page: 1})
    }

    searchBtnHandlerSnack = () => {
        const filterSnack= this.state.itemDataSnack.filter((val)=>{

            return val.product_name.toLowerCase().includes(this.state.searchSnack.toLowerCase())
        })

        this.setState({ filterSnack, maxPage : Math.ceil(filterSnack.length / this.state.itemPerPage), page: 1})
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
        console.log(this.state.itemDataCoklat);
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
                                <li>{ this.state.productData.category}</li>
                                <li>get free exclusive & beautiful card</li>
                                <li>gift delivery to all Indonesia area</li>
                                <li>sameday delivery available for Jabodetabek</li>
                            </ul>
                    </div>
                    <div className="col-sm-3 d-flex flex-column justify-content-center ">
                        <h5>{this.state.productData.parcel_name}</h5>
                        <h5>Rp {this.state.harga.toLocaleString()}</h5>
                        
                        {         
                            this.state.productData.category ==="customized parcel"?
                            <>
                                <ul class="">
                                    <li>Item Coklat - { this.state.productData.coklat} pcs</li>
                                    <li>Item Drink - { this.state.productData.drink} pcs</li>
                                    <li>Item Snack - { this.state.productData.snack} pcs</li>
                                </ul>
                            <button onClick={this.fetchPerItem} className="btn btn-success mt-3">
                            Custom Item
                            </button>
                            </>
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

                    {
                        this.state.customItem?
                        <>
                        <div class="container mt-5">
                            <div id="faq" class=" col-lg-12 mx-auto ">
                                <div class="panel-group accordion-main" id="accordion">

                                    <div class="panel">
                                        <div class="d-grid gap-2">
                                            <button class="btn d-flex panel-title " type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapseExample">
                                                <div class="me-5">
                                                    <div>Coklat</div>
                                                    <div>{this.state.itemCoklat} / {this.state.productData.coklat}</div> 
                                                </div>
                                                
                                                <input
                                                    onChange={this.searchInputHandler}
                                                    name="searchCoklat"
                                                    type="text"
                                                    className="form-control ms-5"
                                                />
                                                <button onClick={this.searchBtnHandlerCoklat} className="btn btn-primary">
                                                    Search
                                                </button>
                                            </button>
                                        </div>
                                        <div id="collapse1" class="panel-collapse collapse">
                                            <div class="panel-body">
                                            <div className="d-flex flex-wrap flex-row">
                                                {this.renderProduct(this.state.filterCoklat)}
                                            </div>
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                <button disabled={this.state.page ===1} onClick={this.prevPageHandler} className="btn btn-dark">
                                                    {"<"}
                                                </button>
                                                <div className="text-center">Page {this.state.page} of {this.state.maxPage}</div>
                                                <button disabled={this.state.page === this.state.maxPage}onClick={this.nextPageHandler} className="btn btn-dark">
                                                    {">"}
                                                </button>
                                            </div>
                                                
                                            </div>
                                        </div>
                                    </div>

                                    <div class="panel">
                                        <div class="d-grid gap-2">
                                            <button class="btn d-flex panel-title " type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapseExample">
                                                <div class="me-5">
                                                    <div>Drink</div>
                                                    <div>{this.state.itemDrink} / {this.state.productData.drink}</div> 
                                                </div>
                                                
                                                <input
                                                    onChange={this.searchInputHandler}
                                                    name="searchDrink"
                                                    type="text"
                                                    className="form-control ms-5"
                                                />
                                                <button onClick={this.searchBtnHandlerDrink} className="btn btn-primary">
                                                    Search
                                                </button>
                                            </button>
                                        </div>
                                        <div id="collapse2" class="panel-collapse collapse">
                                            <div class="panel-body">
                                            <div className="d-flex flex-wrap flex-row">
                                                {this.renderProduct(this.state.filterDrink)}
                                            </div>
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                <button disabled={this.state.page ===1} onClick={this.prevPageHandler} className="btn btn-dark">
                                                    {"<"}
                                                </button>
                                                <div className="text-center">Page {this.state.page} of {this.state.maxPage}</div>
                                                <button disabled={this.state.page === this.state.maxPage}onClick={this.nextPageHandler} className="btn btn-dark">
                                                    {">"}
                                                </button>
                                            </div>
                                                
                                            </div>
                                        </div>
                                    </div>

                                    <div class="panel">
                                        <div class="d-grid gap-2">
                                            <button class="btn d-flex panel-title " type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapseExample">
                                                <div class="me-5">
                                                    <div>Snack</div>
                                                    <div>{this.state.itemSnack} / {this.state.productData.snack}</div> 
                                                </div>
                                                
                                                <input
                                                    onChange={this.searchInputHandler}
                                                    name="searchSnack"
                                                    type="text"
                                                    className="form-control ms-5"
                                                />
                                                <button onClick={this.searchBtnHandlerSnack} className="btn btn-primary">
                                                    Search
                                                </button>
                                            </button>
                                        </div>
                                        <div id="collapse3" class="panel-collapse collapse">
                                            <div class="panel-body">
                                            <div className="d-flex flex-wrap flex-row">
                                                {this.renderProduct(this.state.filterSnack)}
                                            </div>
                                            <div className="d-flex flex-row justify-content-between align-items-center">
                                                <button disabled={this.state.page ===1} onClick={this.prevPageHandler} className="btn btn-dark">
                                                    {"<"}
                                                </button>
                                                <div className="text-center">Page {this.state.page} of {this.state.maxPage}</div>
                                                <button disabled={this.state.page === this.state.maxPage}onClick={this.nextPageHandler} className="btn btn-dark">
                                                    {">"}
                                                </button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                   

                                </div>
                            </div>
                        </div>
                        </>
                        : null
                    }

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