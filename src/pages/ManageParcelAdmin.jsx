import React, { useState, useEffect } from "react";
import "../assets/styles/admin.css";
import "bootstrap/dist/css/bootstrap.css";
// import ProductCardAdmin from "../components/ProductCardAdmin";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import {useSelector} from "react-redux" 

function ManageParcelAdmin() {
  const globalState = useSelector((state)=>state.user)

  const [parcelList, setParcelList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxpage] = useState(0);
  const itemPerPage = 4;
  const [editId, setEditId] = useState(0);
  const [editIdSpek, setEditIdSpek] = useState(0);
  const [editParcelName, setEditParcelName] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const [addFile, setAddFile] = useState();
  const [addFileName, setAddFileName] = useState("");
  const [editCategory, setEditCategory] = useState(0);
  const [editJml, setEditJml] = useState(0);

  const fetchParcelDetail = () => {
    Axios.get(`${API_URL}/parcels-admin/get-parcel-detail`)
      .then((result) => {
        setParcelList(result.data);
        setMaxpage(Math.ceil(result.data.length / itemPerPage));
      })
      .catch((err) => {
        alert("Gagal mendapatkan data Parcel");
      });
  };

  const fetchCategory = () => {
    Axios.get(`${API_URL}/categories/get`).then((res) => {
      setCategoryList(res.data);
    });
  };

  const renderParcel = () => {
    const indexAwal = (page - 1) * itemPerPage;

    const dataTampil = parcelList.slice(indexAwal, indexAwal + itemPerPage);

    return dataTampil.map((val) => {
      if (val.id_parcel === editId && val.id_spek === editIdSpek) {
        return (
          <tr>
            <td>{val.id_parcel}</td>
            <td>
              <input
                value={editParcelName}
                onChange={inputHandler}
                type="text"
                className="form-control"
                name="editParcelName"
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
                // value={editParcelImage}
                onChange={editImageHandler}
                type="file"
                className="form-control"
                name="editParcelImage"
              />
            </td>
            <td>{val.id_spek}</td>
            <td>
              <select
                value={editCategory}
                onChange={inputHandler}
                name="editCategory"
                className="form-control"
              >
                {categoryList.map((option) => (
                  <option value={option.id_cat}>{option.category_name}</option>
                ))}
              </select>
            </td>
            <td>
              <input
                value={editJml}
                onChange={inputHandler}
                type="number"
                className="form-control"
                name="editJml"
              />
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
          <td>{val.id_parcel}</td>
          <td>{val.parcel_name}</td>
          <td>Rp. {val.harga_jual}</td>
          <td>
            <img
              className="admin-product-image"
              src={API_URL + val.photo_parcel}
              alt={val.photo_parcel}
            />
          </td>
          <td>{val.id_spek}</td>
          <td>{val.id_cat}</td>
          <td>{val.jml}</td>
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
              onClick={() => deleteBtnHandler(val.id_parcel)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  const inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "editParcelName") {
      setEditParcelName(value);
    }
    if (name === "editPrice") {
      setEditPrice(value);
    }
    if (name === "editCategory") {
      setEditCategory(parseInt(value));
    }
    if (name === "editJml") {
      setEditJml(parseInt(value));
    }
  };

  const editImageHandler = (e) => {
    if (e.target.files[0]) {
      setAddFileName(e.target.files[0].name);
      setAddFile(e.target.files[0]);
      let preview = document.getElementById("imagepreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  const cancelEdit = () => {
    setEditId(0);
    setAddFile();
  };

  const editToggle = (editData) => {
    setEditId(editData.id_parcel);
    setEditIdSpek(editData.id_spek);
    setEditParcelName(editData.parcel_name);
    setEditPrice(editData.harga_jual);
    setEditCategory(editData.id_cat);
    setEditJml(editData.jml);
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

  const deleteBtnHandler = (deleteId) => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete this product?"
    );
    if (confirmDelete) {
      Axios.delete(`${API_URL}/parcels-admin/delete-parcel/${deleteId}`)
        .then(() => {
          fetchParcelDetail();
        })
        .catch((err) => {
          alert("Terjadi kesalahan di server!");
        });
    } else {
      alert("Cancel delete barang");
    }
  };

  const saveBtnHandler = () => {
    if (addFile) {
      let formData = new FormData();

      let obj = {
        parcel_name: editParcelName,
        harga_jual: editPrice,
      };
      formData.append("data", JSON.stringify(obj));
      formData.append("file", addFile);

      Axios.patch(`${API_URL}/parcels-admin/edit-parcelwi/${editId}`, formData)
        .then((res) => {
          alert(res.data.message);

          setAddFile();
          setEditParcelName("");
          setEditPrice(0);
          setEditId(0);
        })
        .catch((err) => {
          console.log(err);
        });
      Axios.patch(`${API_URL}/parcels-admin/edit-spek/${editIdSpek}`, {
        id_cat: editCategory,
        jml: editJml,
      }).then((res) => {
        alert(res);
        fetchParcelDetail();
        setEditCategory(0);
        setEditJml(0);
        setEditIdSpek(0);
      });
    } else {
      Axios.patch(`${API_URL}/parcels-admin/edit-parcel/${editId}`, {
        parcel_name: editParcelName,
        harga_jual: parseInt(editPrice),
      })
        .then(() => {
          fetchParcelDetail();
          cancelEdit();
          setEditParcelName("");
          setEditPrice(0);
          setEditId(0);
        })
        .catch((err) => {
          alert("Gagal Memperbarui Product");
        });
      Axios.patch(`${API_URL}/parcels-admin/edit-spek/${editIdSpek}`, {
        id_cat: editCategory,
        jml: editJml,
      }).then((res) => {
        alert(res);
        fetchParcelDetail();
        setEditCategory(0);
        setEditJml(0);
        setEditIdSpek(0);
      });
    }
  };

  useEffect(() => {
    fetchParcelDetail();
    fetchCategory();
  }, []);

  if (globalState.role !== "admin"){ return <Redirect to="/" /> }
  
  return (
    <div>
      <div className="p-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1> Manage Parcel </h1>
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
                  <th>Parcel Name</th>
                  <th>Harga Jual</th>
                  <th>Image</th>
                  <th>ID Spek</th>
                  <th>Category</th>
                  <th>Jumlah</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>{renderParcel()}</tbody>
            </table>
            <di>
              <img id="imagepreview" width="10%" alt="image preview" />
            </di>
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

export default connect(mapStateToProps)(ManageParcelAdmin);
