import React, { useState, useEffect } from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function UserTransaction(props) {
  const [dataTransaksi, setDataTransaksi] = useState([]);

  const ongoingBtn = (idTrx) => {
    Axios.patch(`${API_URL}/transaction/parcel-diterima/${idTrx}`)
      .then((result) => {
        alert("Data sudah diperbaharui");
        <Redirect to="/transaction" />;
      })
      .catch((err) => {
        alert("Terjadi Kesalahan di Server");
      });
  };

  const renderTrx = () => {
    return dataTransaksi.map((val) => {
      return (
        <tr>
          <td>{val.id}</td>
          <td>{val.date}</td>
          <td>{val.shipping_address}</td>
          <td>Rp. {val.total_trx}</td>
          <td>{val.status}</td>
          <td>
            <button
              onClick={() => ongoingBtn(val.id)}
              className="btn btn-success"
              disabled={val.status !== "ongoing"}
            >
              Parcel Diterima
            </button>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    const fetchDataTransaksi = () => {
      Axios.get(
        `${API_URL}/transaction/get-usertransactions/${props.userGlobal.id_user}`
      )
        .then((result) => {
          setDataTransaksi(result.data);
        })
        .catch((err) => {
          alert("Gagal Mendapatkan data Transksi");
        });
    };
    fetchDataTransaksi();
  }, [props.userGlobal.id_user]);

  return (
    <div>
      <div className="col-12 text-center mb-4">
        <h1>Transaction</h1>
        <table className="table table-hover mt-4">
          <thead className="thead-light">
            <tr>
              <th>ID Transaksi</th>
              <th>Date</th>
              <th>Shipping Address</th>
              <th>Total Transaksi</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderTrx()}</tbody>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

export default connect(mapStateToProps)(UserTransaction);
