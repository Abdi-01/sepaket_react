import React from 'react'
import Axios from 'axios'
import { API_URL } from '../constants/API'
import { connect } from 'react-redux'
import { getCartData } from '../redux/actions/cart'
import ItemCard from '../components/ItemCard'
import BoxCard from '../components/BoxCard'
import { Redirect } from 'react-router-dom'

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

        pageCoklat: 1,
        pageDrink: 1,
        pageSnack: 1,
        
        maxPageCoklat: 0,
        maxPageDrink: 0,
        maxPageSnack: 0,
        itemPerPage: 6,

        searchCoklat: "",
        searchDrink: "",
        searchSnack: "",

        boxData:[]
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
            maxPageCoklat : Math.ceil(itemDataCoklat.length / this.state.itemPerPage),pageCoklat:1,
            maxPageDrink : Math.ceil(itemDataDrink.length / this.state.itemPerPage), pageDrink:1,
            maxPageSnack : Math.ceil(itemDataSnack.length / this.state.itemPerPage), pageSnack: 1,
        })
    }
    
    componentDidMount(){
        this.fetchParcelData()
        this.fetchItemData()
        
    }
    
    renderProduct = (filteredData,page, addToBoxHandler, deleteFunc) =>{
        const indexAwal = (page - 1)*this.state.itemPerPage
        let rawData =[...filteredData]

        const dataTampil = rawData.slice(indexAwal, indexAwal+this.state.itemPerPage)

        return dataTampil.map((val)=>{
            return <ItemCard productData={val}  addToBoxFunc={addToBoxHandler} />
        })
    }


    nextPageHandlerCoklat = () => {
        if (this.state.pageCoklat < this.state.maxPageCoklat) {
            this.setState({pageCoklat: this.state.pageCoklat + 1})
        }
    }
    nextPageHandlerDrink = () => {
        if (this.state.pageDrink < this.state.maxPageDrink) {
            this.setState({pageDrink: this.state.pageDrink + 1})
        }
    }
    nextPageHandlerSnack = () => {
        if (this.state.pageSnack < this.state.maxPageSnack) {
            this.setState({pageSnack: this.state.pageSnack + 1})
        }
    }

    prevPageHandlerCoklat = () => {
        if (this.state.pageCoklat > 1) {
            this.setState({pageCoklat: this.state.pageCoklat - 1})
        }
    }
    prevPageHandlerDrink = () => {
        if (this.state.pageDrink > 1) {
            this.setState({pageDrink: this.state.pageDrink - 1})
        }
    }
    prevPageHandlerSnack = () => {
        if (this.state.pageSnack > 1) {
            this.setState({pageSnack: this.state.pageSnack - 1})
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

        this.setState({ filterCoklat, maxPageCoklat : Math.ceil(filterCoklat.length / this.state.itemPerPage), pageCoklat: 1})
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

    addToBoxHandler = (item_data) => {
        if(item_data.id_cat===3){this.setState({itemCoklat:this.state.itemCoklat+1})}
        else if(item_data.id_cat===2){this.setState({itemDrink:this.state.itemDrink+1})}
        else if(item_data.id_cat===1){this.setState({itemSnack:this.state.itemSnack+1})}
        
        let exist = false
        this.state.boxData.forEach((val,idx)=>{
            if(val.id_product === item_data.id_product){
                exist = true
                this.state.boxData.splice(idx, 1, {...val, qty:val.qty+1})
            }
        })
        if(!exist){this.state.boxData.push({...item_data, qty:1})}
        
    }

    deleteBoxHandler = (id,cat,qty) => {
        const boxData= this.state.boxData.filter((val)=>{

            return val.id_product !== id
        })

        if(cat===3){this.setState({ boxData, itemCoklat:this.state.itemCoklat - qty})}
        else if(cat===2){this.setState({ boxData, itemDrink:this.state.itemDrink - qty})}
        else if(cat===1){this.setState({ boxData, itemSnack:this.state.itemSnack - qty})}
    }

    qtyBtnHandler = (action,item_data) => {
        if (action === "increment"){
            if(item_data.id_cat===3 && this.state.itemCoklat < this.state.productData.coklat){
                this.setState({itemCoklat:this.state.itemCoklat+1})
                this.state.boxData.forEach((val,idx)=>{
                    if(val.id_product === item_data.id_product){
                        this.state.boxData.splice(idx, 1, {...val, qty:val.qty+1})
                    }
                })
            }
            else if(item_data.id_cat===2 && this.state.itemDrink < this.state.productData.drink){
                this.setState({itemDrink:this.state.itemDrink+1})
                this.state.boxData.forEach((val,idx)=>{
                    if(val.id_product === item_data.id_product){
                        this.state.boxData.splice(idx, 1, {...val, qty:val.qty+1})
                    }
                })
            }
            else if(item_data.id_cat===1 && this.state.itemSnack < this.state.productData.snack){
                this.setState({itemSnack:this.state.itemSnack+1})
                this.state.boxData.forEach((val,idx)=>{
                    if(val.id_product === item_data.id_product){
                        this.state.boxData.splice(idx, 1, {...val, qty:val.qty+1})
                    }
                })
            }

        } else if (action === "decrement"){
            if(item_data.id_cat===3 && this.state.itemCoklat > 1){
                this.state.boxData.forEach((val,idx)=>{
                    if(val.id_product === item_data.id_product){
                        if(val.qty>1){
                            this.state.boxData.splice(idx, 1, {...val, qty:val.qty-1})
                            this.setState({itemCoklat:this.state.itemCoklat-1})
                        }
                    }
                })
            }
            else if(item_data.id_cat===2 && this.state.itemDrink > 1){
                this.state.boxData.forEach((val,idx)=>{
                    if(val.id_product === item_data.id_product){
                        if(val.qty>1){
                            this.state.boxData.splice(idx, 1, {...val, qty:val.qty-1})
                            this.setState({itemDrink:this.state.itemDrink-1})
                        }
                    }
                })
            }
            else if(item_data.id_cat===1 && this.state.itemSnack > 1){
                this.state.boxData.forEach((val,idx)=>{
                    if(val.id_product === item_data.id_product){
                        if(val.qty>1){
                            this.state.boxData.splice(idx, 1, {...val, qty:val.qty-1})
                            this.setState({itemSnack:this.state.itemSnack-1})
                        }
                    }
                })
            }
        }
    }
    
    addToCartHandler = () => {
        const d = new Date()
        const tahun = d.getFullYear()
        const bulan = d.getMonth() + 1
        const hari = d.getDate()

        Axios.post(`${API_URL}/carts/add-cart`,{
            id_parcel : this.props.match.params.productId,
            id_user : this.props.userGlobal.id_user,
            cart_date :  `${tahun}-${bulan}-${hari}`
        })
        .then((res)=>{alert("berhasil menambahkan barang")
            console.log(res.data.hasil.insertId)
            Axios.post(`${API_URL}/carts/detail-cart`,{
                id_cart : res.data.hasil.insertId,
                boxData : this.state.boxData
            })
            // this.props.getCartData(this.props.userGlobal.id)
        })

        // Axios.get(`${API_URL}/carts`,{
        //     params: {
        //         userId: this.props.userGlobal.id,
        //         productId: this.state.productData.id
        //     }
        // })
        // .then((result)=>{
        //     if (result.data.length){
        //         Axios.patch(`${API_URL}/carts/${result.data[0].id}`,{
        //             quantity: result.data[0].quantity + this.state.quantity
        //         })
        //         .then (() =>{ alert("berhasil menambahkan barang")
        //             this.props.getCartData(this.props.userGlobal.id)
        //         })

        //     } else {
        //         Axios.post(`${API_URL}/carts`,{
        //             userId : this.props.userGlobal.id,
        //             productId : this.state.productData.id,
        //             price : this.state.productData.price,
        //             productName : this.state.productData.productName,
        //             productImage : this.state.productData.productImage,
        //             quantity : this.state.quantity
        //         })
        //         .then(()=>{alert("berhasil menambahkan barang")
        //             this.props.getCartData(this.props.userGlobal.id)
        //         })
        //     }
        // })
    }
    

    render(){
        if (this.props.userGlobal.status !== "verified"){
            return <Redirect to="/Login" />
        }
        console.log(this.state.boxData);
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
                                            {
                                                this.state.itemCoklat === this.state.productData.coklat ?
                                                <div class="d-grid gap-2">
                                                    <button class="btn d-flex panel-title disabled  " type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapseExample">
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
                                                :
                                                <>
                                                <div class="d-grid gap-2">
                                                    <button class="btn d-flex panel-title  " type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapseExample">
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
                                                            {this.renderProduct(this.state.filterCoklat,this.state.pageCoklat, this.addToBoxHandler)}
                                                        </div>
                                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                                            <button disabled={this.state.pageCoklat ===1} onClick={this.prevPageHandlerCoklat} className="btn btn-dark">
                                                                {"<"}
                                                            </button>
                                                            <div className="text-center">Page {this.state.pageCoklat} of {this.state.maxPageCoklat}</div>
                                                            <button disabled={this.state.pageCoklat === this.state.maxPageCoklat}onClick={this.nextPageHandlerCoklat} className="btn btn-dark">
                                                                {">"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                </>
                                            }
                                    </div>

                                    <div class="panel">
                                            {
                                                this.state.itemDrink === this.state.productData.drink ?
                                                <div class="d-grid gap-2">
                                                    <button class="btn d-flex panel-title disabled  " type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
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
                                                :
                                                <>
                                                <div class="d-grid gap-2">
                                                    <button class="btn d-flex panel-title  " type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
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
                                                            {this.renderProduct(this.state.filterDrink,this.state.pageDrink,this.addToBoxHandler)}
                                                        </div>
                                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                                            <button disabled={this.state.pageDrink ===1} onClick={this.prevPageHandlerDrink} className="btn btn-dark">
                                                                {"<"}
                                                            </button>
                                                            <div className="text-center">Page {this.state.pageDrink} of {this.state.maxPageDrink}</div>
                                                            <button disabled={this.state.pageDrink === this.state.maxPageDrink}onClick={this.nextPageHandlerDrink} className="btn btn-dark">
                                                                {">"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                </>
                                            }
                                    </div>

                                    <div class="panel">
                                            {
                                                this.state.itemSnack === this.state.productData.snack ?
                                                <div class="d-grid gap-2">
                                                    <button class="btn d-flex panel-title disabled  " type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
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
                                                :
                                                <>
                                                <div class="d-grid gap-2">
                                                    <button class="btn d-flex panel-title  " type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
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
                                                            {this.renderProduct(this.state.filterSnack,this.state.pageSnack, this.addToBoxHandler)}
                                                        </div>
                                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                                            <button disabled={this.state.pageSnack ===1} onClick={this.prevPageHandlerSnack} className="btn btn-dark">
                                                                {"<"}
                                                            </button>
                                                            <div className="text-center">Page {this.state.pageSnack} of {this.state.maxPageSnack}</div>
                                                            <button disabled={this.state.pageSnack === this.state.maxPageSnack}onClick={this.nextPageHandlerSnack} className="btn btn-dark">
                                                                {">"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                </>
                                            }
                                    </div>
                                   

                                </div>
                            </div>
                        </div>

                        <div class="mt-5 text-center">
                        <h1>Box</h1>
                        <div className="text-center">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Quantity</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.boxData.map((val)=>{
                                        return <BoxCard BoxData={val} delete={this.deleteBoxHandler} qtyFunc={this.qtyBtnHandler}/>
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                            

                    <div className="bg-light text-center">
                        {
                            this.state.itemCoklat === this.state.productData.coklat && this.state.itemDrink === this.state.productData.drink && this.state.itemSnack === this.state.productData.snack ?
                            <button onClick={this.addToCartHandler} className="btn btn-success">Add To Cart</button>
                            : null
                        }
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