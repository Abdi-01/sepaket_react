import React, { useState, useEffect } from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";

function RestockProductsAdmin() {
  const [productsStock, setProductsStock] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxpage] = useState(0);
  const itemPerPage = 11;
  const [editId, setEditId] = useState(0);
  const [editStock, setEditStock] = useState(0);

  const fetchProductsStock = () => {
    Axios.get(`${API_URL}/products/get-stock`).then((result) => {
      setProductsStock(result.data);
      setMaxpage(Math.ceil(result.data.length / itemPerPage));
    });
  };

  const nextPageHandler = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  const prevPageHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const editToggle = (editData) => {
    setEditId(editData.id_product);
    setEditStock(editData.stock);
  };

  const inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "editStock") {
      setEditStock(value);
    }
  };

  const cancelEdit = () => {
    setEditId(0);
  };

  const saveBtnHandler = () => {
    Axios.patch(`${API_URL}/products/edit-stock/${editId}`, {
      stock: editStock,
    })
      .then(() => {
        fetchProductsStock();
        cancelEdit();
      })
      .catch((err) => {
        alert("Gagal Memperbarui Product");
      });
  };

  const renderProduct = () => {
    const indexAwal = (page - 1) * itemPerPage;

    const dataTampil = productsStock.slice(indexAwal, indexAwal + itemPerPage);

    return dataTampil.map((val) => {
      if (val.id_product === editId) {
        return (
          <tr>
            <td>{val.id_product}</td>
            <td>{val.product_name}</td>
            <td>
              <input
                value={editStock}
                onChange={inputHandler}
                type="number"
                className="form-control"
                name="editStock"
              />
            </td>

            <td>
              <button onClick={saveBtnHandler} className="btn btn-success">
                Save
              </button>
              <button onClick={cancelEdit} className="btn btn-danger">
                Cancel
              </button>
            </td>
          </tr>
        );
      }
      return (
        <tr>
          <td>{val.id_product}</td>
          <td>{val.product_name}</td>
          <td>{val.stock} Pcs</td>

          <td>
            <button
              onClick={() => editToggle(val)}
              className="btn btn-secondary"
            >
              Restock
            </button>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    fetchProductsStock();
  }, []);

  return (
    <div>
      <div className="p-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1> Restock Product </h1>
            <div className="mt-3">
              <div className="d-flex flex-row justify-content-around align-items-center">
                <button
                  disabled={page === 1}
                  onClick={prevPageHandler}
                  className="btn btn-dark"
                >
                  {"<"}
                </button>
                <div className="text-center">
                  Page {page} of {maxPage}
                </div>
                <button
                  disabled={page === maxPage}
                  onClick={nextPageHandler}
                  className="btn btn-dark"
                >
                  {">"}
                </button>
              </div>
            </div>
            <table className="table table-hover mt-4">
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Stock</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>{renderProduct()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

export default connect(mapStateToProps)(RestockProductsAdmin);
