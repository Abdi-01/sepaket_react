import React, { useState, useEffect } from "react";
import { API_URL } from "../constants/API";
import Axios from "axios";
import "../assets/styles/parcel.css";
import CategoryParcel from "../components/CategoryParcel";

function AddParcel() {
  const [parcelList, setParcelList] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);
  const [avgHargaBeli, setAvgHargaBeli] = useState([]);
  const [jmlCategory, setJmlCategory] = useState(1);
  const [price, setPrice] = useState(0);
  const [hargaRekom, setHargaRekom] = useState(0);
  const [categorySelected, setCategorySelected] = useState(1);
  let sisaOption = avgHargaBeli.length;
  const [toggleBtnOption, setToggleBtnOption] = useState(false);

  const fetchParcel = () => {
    Axios.get(`${API_URL}/parcels-admin/get`)
      .then((result) => {
        setParcelList(result.data);
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

  const fetchAvgCapitalProduct = () => {
    Axios.get(`${API_URL}/products/get-avg`)
      .then((result) => {
        setAvgHargaBeli(result.data);
      })
      .catch((err) => {
        alert("Gagal mendapatkan rata-rata Harga Beli");
      });
  };

  const inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "jml-cat-1") {
      setJmlCategory(value);
    }

    if (name === "cat-1") {
      setCategorySelected(value);
    }
    setPrice(parseInt(avgHargaBeli[categorySelected].averageHargaBeli));
  };

  const addOption = () => {
    sisaOption--;
    if (sisaOption) {
      //   console.log(sisaOption);
      return renderCategoryOption();
    } else {
      console.log("Option sudah habis");
      setToggleBtnOption(true);
    }
    // let optionLeft = avgHargaBeli.length - 1;
    // console.log(avgHargaBeli);

    // if (sisaOption) {
    //   //   let optionLeft = avgHargaBeli.length - 1;
    //   if (optionLeft) {
    //     setSisaOption();
    //     console.log(sisaOption);
    //     return renderCategoryOption();
    //   }
    // } else {
    //   console.log("sisa Option habis");
    //   setToggleBtnOption(true);
    // }
  };

  //   const priceRecommendation = () => {};

  const renderCategoryOption = () => (
    <select
      name="cat-1"
      onChange={inputHandler}
      class="form-select"
      aria-label="Default select example"
    >
      {CategoryList.map((val) => (
        <option value={val.id_cat}>{val.category_name}</option>
      ))}
    </select>
  );

  useEffect(() => {
    fetchParcel();
    fetchCategory();
    fetchAvgCapitalProduct();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bd-highlight mb-3">
      <h1 className="col-12 text-center">Parcel's Creation</h1>
      <div className="form-parcel">
        <div className="mb-3">
          <label className="form-label">ID Parcel</label>
          <input
            type="number"
            className="form-control"
            value={parcelList.length + 1}
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Parcel Name</label>
          <input
            class="form-control"
            type="text"
            aria-label="default input example"
          />
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label">
            Upload Image Parcel
          </label>
          <input class="form-control" type="file" id="formFile" />
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label">
            Set Category(s) with Quantity
          </label>
          <CategoryParcel />
          {/* <div class="input-group mb-3">
            <select
              name="cat-1"
              onChange={inputHandler}
              class="form-select"
              aria-label="Default select example"
            >
              {CategoryList.map((val) => (
                <option value={val.id_cat}>{val.category_name}</option>
              ))}
            </select>
            {() => renderCategoryOption()}

            <input
              type="number"
              class="form-control"
              onChange={inputHandler}
              name="jml-cat-1"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button
              onClick={() => addOption()}
              class="btn btn-success"
              type="button"
              id="button-addon2"
              disabled={toggleBtnOption}
            >
              Add
            </button>
          </div>
          <div className="mb-3">
            <label className="form-label">Price (Recommendation)</label>
            <input
              class="form-control"
              value={hargaRekom}
              type="number"
              aria-label="default input example"
            />
          </div> */}
          <div class="d-grid gap-2">
            <button class="btn btn-primary" type="button">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddParcel;
