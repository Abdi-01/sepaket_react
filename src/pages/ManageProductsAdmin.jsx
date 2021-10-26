import React, { useState, useEffect } from "react";
import "../assets/styles/admin.css";
import "bootstrap/dist/css/bootstrap.css";
// import ProductCardAdmin from "../components/ProductCardAdmin";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import {useSelector} from "react-redux" 

function ManageProductsAdmin() {
  const globalState = useSelector((state)=>state.user)

  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [page, setPage] = useState(1);
  const [maxPage, setMaxpage] = useState(0);
  const itemPerPage = 4;
  const [addProductName, setAddProductName] = useState("");
  const [addPrice, setAddPrice] = useState(0);
  const [addProductImage, setAddProductImage] = useState("");
  const [addCategory, setAddCategory] = useState(0);
  const addStock = 0;
  const [editId, setEditId] = useState(0);
  const [editProductName, setEditProductName] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const [editProductImage, setEditProductImage] = useState("");
  const [editCategory, setEditCategory] = useState(0);

  const fetchProduct = () => {
    Axios.get(`${API_URL}/products/get`).then((result) => {
      setProductList(result.data);
      setMaxpage(Math.ceil(result.data.length / itemPerPage));
    });
  };

  const fetchCategory = () => {
    Axios.get(`${API_URL}/categories/get`).then((res) => {
      setCategoryList(res.data);
    });
  };

  const renderProduct = () => {
    const indexAwal = (page - 1) * itemPerPage;

    const dataTampil = productList.slice(indexAwal, indexAwal + itemPerPage);

    return dataTampil.map((val) => {
      if (val.id_product === editId) {
        return (
          <tr>
            <td>{val.id_product}</td>
            <td>
              <input
                value={editProductName}
                onChange={inputHandler}
                type="text"
                className="form-control"
                name="editProductName"
              />
            </td>
            <td>
              <input
                value={editPrice}
                onChange={inputHandler}
                type="number"
                className="form-control"
                name="editPrice"
              />
            </td>
            <td>
              <input
                value={editProductImage}
                onChange={inputHandler}
                type="text"
                className="form-control"
                name="editProductImage"
              />
            </td>
            <td>
              <select
                value={editCategory}
                onChange={inputHandler}
                name="editCategory"
                className="form-control"
              >
                {categoryList.map((val) => (
                  <option value={val.id_cat}>{val.category_name}</option>
                ))}
              </select>
            </td>
            <td>
              <button onClick={saveBtnHandler} className="btn btn-success">
                Save
              </button>
            </td>
            <td>
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
          <td>Rp. {val.harga_beli}</td>
          <td>
            <img
              className="admin-product-image"
              src={val.photo_product}
              alt={val.photo_product}
            />
          </td>
          <td>{val.id_cat}</td>
          <td>
            <button
              onClick={() => editToggle(val)}
              className="btn btn-secondary"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              onClick={() => deleteBtnHandler(val.id_product)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    // return <ProductCardAdmin productData={val} action={deleteBtnHandler} />;
  };

  const editToggle = (editData) => {
    setEditId(editData.id_product);
    setEditProductName(editData.product_name);
    setEditPrice(editData.harga_beli);
    setEditCategory(editData.id_cat);
    setEditProductImage(editData.photo_product);
  };

  const cancelEdit = () => {
    setEditId(0);
  };

  const saveBtnHandler = () => {
    Axios.patch(`${API_URL}/products/edit-product/${editId}`, {
      product_name: editProductName,
      harga_beli: parseInt(editPrice),
      id_cat: editCategory,
      photo_product: editProductImage,
    })
      .then(() => {
        fetchProduct();
        cancelEdit();
      })
      .catch((err) => {
        alert("Gagal Memperbarui Product");
      });
  };

  const deleteBtnHandler = (deleteId) => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete this product?"
    );
    // console.log(deleteId);
    if (confirmDelete) {
      Axios.delete(`${API_URL}/products/delete-product/${deleteId}`)
        .then(() => {
          fetchProduct();
        })
        .catch(() => {
          alert("Terjadi kesalahan di server!");
        });
    } else {
      alert("Cancel delete barang");
    }
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
  const inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "addProductName") {
      setAddProductName(value);
    }
    if (name === "addPrice") {
      setAddPrice(value);
    }
    if (name === "addProductImage") {
      setAddProductImage(value);
    }
    if (name === "addCategory") {
      setAddCategory(value);
    }
    if (name === "editProductName") {
      setEditProductName(value);
    }
    if (name === "editPrice") {
      setEditPrice(value);
    }
    if (name === "editProductImage") {
      setEditProductImage(value);
    }
    if (name === "editCategory") {
      setEditCategory(value);
    }
  };

  const addNewProduct = () => {
    Axios.post(`${API_URL}/products/add-product`, {
      product_name: addProductName,
      harga_beli: parseInt(addPrice),
      id_cat: addCategory,
      stock: addStock,
      photo_product: addProductImage,
    })
      .then(() => {
        fetchProduct();
        setAddProductName("");
        setAddPrice(0);
        setAddCategory("");
        setAddProductImage("");
      })
      .catch((err) => {
        alert("Gagal Menambahkan Product");
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProduct();
    fetchCategory();
  }, []);

  if (globalState.role !== "admin"){ return <Redirect to="/" /> }

  return (
    <div>
      <div className="p-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1> Manage Product </h1>
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
              <tr style={{ borderBottom: "1pt solid black" }}>
                <td>{productList.length + 1}</td>
                <td>
                  <input
                    value={addProductName}
                    onChange={inputHandler}
                    name="addProductName"
                    type="text"
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    value={addPrice}
                    onChange={inputHandler}
                    name="addPrice"
                    type="number"
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    value={addProductImage}
                    onChange={inputHandler}
                    name="addProductImage"
                    type="text"
                    className="form-control"
                  />
                </td>
                <td>
                  <select
                    value={addCategory}
                    onChange={inputHandler}
                    name="addCategory"
                    className="form-control"
                  >
                    {categoryList.map((val) => (
                      <option value={val.id_cat}>{val.category_name}</option>
                    ))}
                  </select>
                </td>
                <td colSpan="2">
                  <button
                    type="button"
                    onClick={addNewProduct}
                    className="btn btn-info"
                  >
                    Add Product
                  </button>
                </td>
              </tr>
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Capital</th>
                  <th>Image</th>
                  <th>Category</th>
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

export default connect(mapStateToProps)(ManageProductsAdmin);
