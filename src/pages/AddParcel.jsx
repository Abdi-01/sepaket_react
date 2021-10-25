import React, { useState, useEffect } from "react";
import { API_URL } from "../constants/API";
import Axios from "axios";
import "../assets/styles/parcel.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function AddParcel() {
  const globalState = useSelector((state) => state.user);

  const [parcelList, setParcelList] = useState([]);
  const [idParcel, setIdParcel] = useState(0);
  const [addNameParcel, setAddNameParcel] = useState("");
  const [addPriceParcel, setAddPriceParcel] = useState(0);
  const [addFileName, setAddFileName] = useState("");
  const [addFile, setAddFile] = useState();
  const [avgHargaBeli, setAvgHargaBeli] = useState([]);
  const [jmlCategory1, setJmlCategory1] = useState(0);
  const [jmlCategory2, setJmlCategory2] = useState(0);
  const [jmlCategory3, setJmlCategory3] = useState(0);
  const [jmlCategory4, setJmlCategory4] = useState(0);
  const [price, setPrice] = useState(0);
  const [toggleBtnOption, setToggleBtnOption] = useState(false);
  const [categoryRender, setCategoryRender] = useState([]);
  const [catJml, setCatJml] = useState([]);
  const [modal, setModal] = useState(0);

  const fetchParcel = () => {
    Axios.get(`${API_URL}/parcels-admin/get`)
      .then((result) => {
        setParcelList(result.data);
      })
      .catch((err) => {
        alert("Gagal mendapatkan data Parcel");
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

  const categoryOption = () => (
    <Select
      components={makeAnimated()}
      isMulti
      onChange={setCategoryRender}
      name="cat"
      value={categoryRender}
      className="basic-multi-select"
      classNamePrefix="select"
      options={avgHargaBeli}
    />
  );

  const saveBtnHandler = () => {
    if (addFile) {
      let formData = new FormData();

      let obj = {
        parcel_name: addNameParcel,
        harga_jual: addPriceParcel,
        spek: catJml,
      };

      formData.append("data", JSON.stringify(obj));
      formData.append("file", addFile);

      Axios.post(`${API_URL}/parcels-admin/add-parcel`, formData)
        .then((res) => {
          alert(res.data.message);
          <Redirect to="/admin/addparcel" />;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;

    if (name === "jml0") {
      setJmlCategory1(parseInt(value));
    }
    if (name === "jml1") {
      setJmlCategory2(parseInt(value));
    }
    if (name === "jml2") {
      setJmlCategory3(parseInt(value));
    }
    if (name === "jml3") {
      setJmlCategory4(parseInt(value));
    }

    if (name === "addPriceParcel") {
      setAddPriceParcel(parseInt(value));
    }
    if (name === "addNameParcel") {
      setAddNameParcel(value);
    }
  };

  const renderJml = () => {
    return categoryRender.map((val, index) => (
      <div class="input-group mb-3">
        <input
          type="number"
          class="form-control"
          placeholder={"set Quantity for " + val.label}
          onChange={inputHandler}
          name={"jml" + index}
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
      </div>
    ));
  };

  const checkPriceHandler = () => {
    setIdParcel(parcelList[parcelList.length - 1].id_parcel + 1);

    setToggleBtnOption(!toggleBtnOption);
    if (categoryRender.length === 1) {
      setPrice(
        Math.ceil(
          categoryRender[0].rataRata * jmlCategory1 +
            categoryRender[0].rataRata * jmlCategory1 * 0.3
        )
      );
      setCatJml([
        {
          id_cat: categoryRender[0].value,
          id_parcel: idParcel,
          jml: jmlCategory1,
        },
      ]);
      setModal(categoryRender[0].rataRata * jmlCategory1);
    }
    if (categoryRender.length === 2) {
      setPrice(
        Math.ceil(
          categoryRender[0].rataRata * jmlCategory1 +
            categoryRender[0].rataRata * jmlCategory1 * 0.3 +
            categoryRender[1].rataRata * jmlCategory2 +
            categoryRender[1].rataRata * jmlCategory2 * 0.3
        )
      );
      setCatJml([
        {
          id_cat: categoryRender[0].value,
          id_parcel: idParcel,
          jml: jmlCategory1,
        },
        {
          id_cat: categoryRender[1].value,
          id_parcel: idParcel,
          jml: jmlCategory2,
        },
      ]);
      setModal(
        categoryRender[0].rataRata * jmlCategory1 +
          categoryRender[1].rataRata * jmlCategory2
      );
    }
    if (categoryRender.length === 3) {
      setPrice(
        Math.ceil(
          categoryRender[0].rataRata * jmlCategory1 +
            categoryRender[0].rataRata * jmlCategory1 * 0.3 +
            categoryRender[1].rataRata * jmlCategory2 +
            categoryRender[1].rataRata * jmlCategory2 * 0.3 +
            categoryRender[2].rataRata * jmlCategory3 +
            categoryRender[2].rataRata * jmlCategory3 * 0.3
        )
      );
      setCatJml([
        {
          id_cat: categoryRender[0].value,
          id_parcel: idParcel,
          jml: jmlCategory1,
        },
        {
          id_cat: categoryRender[1].value,
          id_parcel: idParcel,
          jml: jmlCategory2,
        },
        {
          id_cat: categoryRender[2].value,
          id_parcel: idParcel,
          jml: jmlCategory3,
        },
      ]);
      setModal(
        categoryRender[0].rataRata * jmlCategory1 +
          categoryRender[1].rataRata * jmlCategory2 +
          categoryRender[2].rataRata * jmlCategory3
      );
    }
    if (categoryRender.length === 4) {
      setPrice(
        Math.ceil(
          categoryRender[0].rataRata * jmlCategory1 +
            categoryRender[0].rataRata * jmlCategory1 * 0.3 +
            categoryRender[1].rataRata * jmlCategory2 +
            categoryRender[1].rataRata * jmlCategory2 * 0.3 +
            categoryRender[2].rataRata * jmlCategory3 +
            categoryRender[2].rataRata * jmlCategory3 * 0.3 +
            categoryRender[3].rataRata * jmlCategory4 +
            categoryRender[3].rataRata * jmlCategory4 * 0.3
        )
      );
      setCatJml([
        {
          id_cat: categoryRender[0].value,
          id_parcel: idParcel,
          jml: jmlCategory1,
        },
        {
          id_cat: categoryRender[1].value,
          id_parcel: idParcel,
          jml: jmlCategory2,
        },
        {
          id_cat: categoryRender[2].value,
          id_parcel: idParcel,
          jml: jmlCategory3,
        },
        {
          id_cat: categoryRender[3].value,
          id_parcel: idParcel,
          jml: jmlCategory4,
        },
      ]);
      setModal(
        categoryRender[0].rataRata * jmlCategory1 +
          categoryRender[1].rataRata * jmlCategory2 +
          categoryRender[2].rataRata * jmlCategory3 +
          categoryRender[3].rataRata * jmlCategory4
      );
    }
  };

  const onBtnAddFile = (e) => {
    if (e.target.files[0]) {
      setAddFileName(e.target.files[0].name);
      setAddFile(e.target.files[0]);
      let preview = document.getElementById("imagepreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    fetchParcel();
    fetchAvgCapitalProduct();
  }, []);

  if (globalState.role !== "admin") {
    return <Redirect to="/" />;
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bd-highlight mb-3">
      <h1 className="col-12 text-center">Parcel's Creation</h1>
      <div className="form-parcel">
        <div className="mb-3">
          <label className="form-label">ID Parcel</label>
          <input
            type="number"
            className="form-control"
            value={idParcel}
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Parcel Name</label>
          <input
            name="addNameParcel"
            value={addNameParcel}
            onChange={inputHandler}
            class="form-control"
            type="text"
            aria-label="default input example"
          />
        </div>
        <di>
          <img id="imagepreview" width="100%" alt="image preview" />
        </di>
        <div class="mb-3">
          <label for="formFile" class="form-label">
            Upload Image Parcel
          </label>
          <input
            // value={addFile}
            class="form-control"
            onChange={onBtnAddFile}
            type="file"
            id="formFile"
          />
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label">
            Set Category(s) with Quantity
          </label>

          <div class="input-group mb-3">{categoryOption()}</div>
          {renderJml()}
          <div className="mb-3">
            <label className="form-label">Price (Recommendation)</label>
          </div>
          {toggleBtnOption ? (
            <div>
              <label>Modal :</label>
              <input
                width="30%"
                value={modal}
                type="number"
                aria-label="default input example"
                name="modal"
                disabled
              />
              <label>Margin :</label>
              <input
                width="30%"
                value={price - modal}
                type="number"
                aria-label="default input example"
                name="modal"
                disabled
              />
            </div>
          ) : (
            " "
          )}
          <div class="input-group mb-3">
            <input
              onChange={inputHandler}
              value={toggleBtnOption ? price : addPriceParcel}
              class="form-control"
              type="number"
              aria-label="default input example"
              name="addPriceParcel"
            />
            {toggleBtnOption ? (
              <button
                onClick={() => checkPriceHandler()}
                class="btn btn-success"
                type="button"
                id="button-addon2"
              >
                OK
              </button>
            ) : (
              <button
                onClick={() => checkPriceHandler()}
                class="btn btn-info"
                type="button"
                id="button-addon2"
              >
                Check Recommendation
              </button>
            )}
          </div>
          <div class="d-grid gap-2">
            <button
              onClick={() => saveBtnHandler()}
              class="btn btn-primary"
              type="button"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddParcel;
