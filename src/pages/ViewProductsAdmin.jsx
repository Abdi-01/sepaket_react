import React from "react";

const ViewProductsAdmin = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-3">
          <div className="card">
            <div className="card-header">
              <strong>Filter Product</strong>
            </div>
            <div className="card-body">
              <label htmlFor="searchProductName">Product Name</label>
              <input
                type="text"
                name="searchProductName"
                className="form-control mb-3"
              />
              <label htmlFor="searchCategory">Product Category</label>
              <select name="searchCategory" className="form-control">
                <option value="">All items</option>
                <option value="kaos">Kaos</option>
                <option value="celana">Celana</option>
                <option value="aksesoris">Aksesoris</option>
              </select>
              <button
                onClick={this.searchBtnHandler}
                className="btn btn-primary mt-3"
              >
                Search
              </button>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-header">
              <strong>Sort Products</strong>
            </div>
            <div className="card-body">
              <label htmlFor="sortBy">Sort by</label>
              <select name="sortBy" className="form-control">
                <option value="">Default</option>
                <option value="low-price">Lowest Price</option>
                <option value="high-price">Highest Price</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <button
                onClick={this.prevPageHandler}
                className="btn btn-dark"
                disabled={this.state.page === 1}
              >
                {"<"}
              </button>
              <div className="text-center">
                Page {this.state.page} of {this.state.maxPage}
              </div>
              <button
                onClick={this.nextPageHandler}
                className="btn btn-dark"
                disabled={this.state.page === this.state.maxPage}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="d-flex flex-wrap flex-row">
            {/* Render Proct here */}
            {/* {this.renderProduct()} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductsAdmin;
