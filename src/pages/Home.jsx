import React from 'react'
import ProductCard from '../components/ProductCard'
import Axios from 'axios'
import { API_URL } from '../constants/API'
import { connect } from 'react-redux'

class Home extends React.Component {
    state = {
        productList: [],
        filteredProductList: [],
        page: 1,
        maxPage: 0,
        itemPerPage: 3,
        searchParcel_name: "",
        searchCategory: "",
        sortBy: "",
    }
 
    fetchProduct = () => {
        Axios.get(`${API_URL}/parcels/get`)
        .then((result)=>{
            this.setState({ productList: result.data, maxPage: Math.ceil(result.data.length / this.state.itemPerPage), filteredProductList: result.data })
        })
    }
 
    renderProduct = () =>{
        const indexAwal = (this.state.page - 1)*this.state.itemPerPage
        let rawData =[...this.state.filteredProductList]

        const compareString = (a,b) => {
            if (a.parcel_name < b.parcel_name){
                return -1;
            }
            if (a.parcel_name > b.parcel_name){
                return 1;
            }
            return 0;
        }

        switch (this.state.sortBy){
            case "lowPrice":
                rawData.sort((a,b)=> a.harga_jual - b.harga_jual);
                break
            case "highPrice":
                rawData.sort((a,b)=> b.harga_jual - a.harga_jual);
                break
            case "az":
                rawData.sort(compareString);
                break
            case "za":
                rawData.sort((a,b) => compareString(b,a));
                break
            default :
                rawData = [...this.state.filteredProductList]
                break
        }

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

    searchBtnHandler = () => {
        console.log(this.state.productList)
        const filteredProductList = this.state.productList.filter((val)=>{

            return val.parcel_name.toLowerCase().includes(this.state.searchParcel_name.toLowerCase()) && val.category.toLowerCase().includes(this.state.searchCategory.toLowerCase())
        })

        this.setState({ filteredProductList, maxPage : Math.ceil(filteredProductList.length / this.state.itemPerPage), page: 1})
    }

    componentDidMount() {
        this.fetchProduct()
    }

    render(){
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-3">
                        <div className="card">
                            <div className="card-header">
                                <strong>Filter Product</strong>
                            </div>
                            <div className="card-body">
                                <label htmlFor="searchParcel_name">Parcel Name</label>
                                <input
                                    onChange={this.searchInputHandler}
                                    name="searchParcel_name"
                                    type="text"
                                    className="form-control mb-3"
                                />
                        <label htmlFor="searchCategory">Product Category</label>
                        <select onChange={this.searchInputHandler} name="searchCategory" className="form-control">
                            <option value="">All Item</option>
                            <option value="quick parcel">Quick Parcel </option>
                            <option value="customized parcel">Customized parcel</option>
                        </select>
                        <button onClick={this.searchBtnHandler} className="btn btn-primary mt-3">
                            Search
                        </button>
                    </div>
                    </div>
                    <div className="card mt-4">
                        <div className="card-header">
                            <strong>Sort Product</strong>
                        </div>
                        <div className="card-body">
                            <label htmlFor="sortBy">Sort By</label>
                            <select onChange={this.searchInputHandler} name="sortBy" className="form-control">
                                <option value="">Default</option>
                                <option value="lowPrice">Lowest Price</option>
                                <option value="highPrice">Highest Price</option>
                                <option value="az">A-Z</option>
                                <option value="za">Z-A</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-3">
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
                <div className="col-9">
                    <div className="d-flex flex-wrap flex-row">
                        {/* <ProductCard/> */}
                        {this.renderProduct()}
                    </div>
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


export default connect(mapStateToProps)(Home)
