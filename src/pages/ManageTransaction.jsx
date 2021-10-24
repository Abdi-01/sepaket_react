import React, { useState, useEffect } from "react";
import "../assets/styles/managetransaction.css";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";

function ManageTransaction() {
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [statusOption, setStatusOption] = useState([]);
  const [dataTrxProducts, setDataTrxProducts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectData, setSelectData] = useState("");

  const fetchTransaction = () => {
    Axios.get(`${API_URL}/transaction/get`)
      .then((result) => {
        setDataTransaksi(result.data);
      })
      .catch((err) => {
        alert("Gagal mendapatkan data Transaction User");
      });
  };

  const fetchStatus = () => {
    Axios.get(`${API_URL}/transaction/get-status`)
      .then((result) => {
        setStatusOption(result.data);
      })
      .catch((err) => {
        alert("Gagal mendapatkan data Status Transaction");
      });
  };

  const fetchTrxProductsStock = () => {
    Axios.get(`${API_URL}/transaction/get-trxproducts`)
      .then((result) => {
        setDataTrxProducts(result.data);
      })
      .catch((err) => {
        alert("Gagal mendapatkan data Transaction Products");
      });
  };

  const selectHandler = (event) => {
    const { value } = event.target;
    setSelectData(value);
  };

  const getTrxData = () => {
    const fromDate = startDate.getDate();
    const fromMonth = (startDate.getMonth() + 1).toString();
    const fromYear = startDate.getFullYear().toString();
    const untilDate = endDate.getDate();
    const untilMonth = (endDate.getMonth() + 1).toString();
    const untilYear = endDate.getFullYear().toString();
    let from =
      fromYear +
      "-" +
      fromMonth +
      "-" +
      (fromDate <= 9 ? "0" + fromDate.toString() : fromDate.toString());
    let until =
      untilYear +
      "-" +
      untilMonth +
      "-" +
      (untilDate <= 9 ? "0" + untilDate.toString() : untilDate.toString());

    if (selectData === "all") {
      Axios.get(`${API_URL}/transaction/get-trxmanageall/${from + " " + until}`)
        .then((result) => {
          setDataTransaksi(result.data);
        })
        .catch((err) => {
          alert("Gagal mendapatkan data Transaksi");
        });
    } else {
      Axios.get(
        `${API_URL}/transaction/get-trxmanage/${
          selectData + " " + from + " " + until
        }`
      )
        .then((result) => {
          setDataTransaksi(result.data);
        })
        .catch((err) => {
          alert("Gagal mendapatkan data Transaksi");
        });
    }
  };

  const renderTransaksi = () => {
    return dataTransaksi.map((val) => {
      return (
        <tr>
          <td>{val.id_trx}</td>
          <td>{val.date}</td>
          <td>{val.username}</td>
          <td>Rp. {val.total_trx}</td>
          <td>
            <img
              className="admin-product-image"
              src={API_URL + val.transfer_receipt}
              alt={val.transfer_receipt}
            />
          </td>
          <td>{val.transfer_date}</td>
          <td>{val.status}</td>
          <td>
            <button
              onClick={() => confirmTransaction(val.id_trx)}
              className="btn btn-success"
              disabled={val.status !== "pending"}
            >
              Confirm
            </button>
          </td>
          <td>
            <button
              onClick={() => rejectTransaction(val.id_trx)}
              className="btn btn-danger"
              disabled={val.status !== "pending"}
            >
              Reject
            </button>
          </td>
        </tr>
      );
    });
  };

  const confirmTransaction = (id) => {
    console.log(id);
    const confirm = window.confirm(
      "Are you sure want to Confirm this Transaction?"
    );
    if (confirm) {
      Axios.patch(`${API_URL}/transaction/confirm-transaction/${id}`)
        .then(() => {
          fetchTransaction();
        })
        .catch(() => {
          alert("Terjadi kesalahan di server!");
        });
    } else {
      alert("Cancel confirm transaction");
    }
  };
  const rejectTransaction = (id) => {
    console.log(id);
    const reject = window.confirm(
      "Are you sure want to Reject this Transaction?"
    );
    if (reject) {
      let dataTransactionProduct = dataTrxProducts.filter((val) => {
        return val.id_trx === id;
      });

      // console.log(dataTransactionProduct);
      Axios.patch(`${API_URL}/transaction/reject-transaction/${id}`)
        .then(() => {
          fetchTransaction();
        })
        .catch(() => {
          alert("Terjadi kesalahan di server!");
        });
      Axios.patch(`${API_URL}/products/revert-stock`, dataTransactionProduct)
        .then(() => {
          alert("Stock dari transaksi tersebut sudah dikembalikan");
        })
        .catch(() => {
          alert("Terjadi kesalahan di server!");
        });
    } else {
      alert("Cancel reject transaction");
    }
  };

  useEffect(() => {
    fetchTransaction();
    fetchTrxProductsStock();
    fetchStatus();
  }, []);
  return (
    <div>
      <div className="col-12 text-center mb-4">
        <h1>Manage Transaction</h1>
      </div>
      <div className="d-flex justify-content-between align-items-center col-12 date">
        <label>from: </label>
        <DatePicker
          dateFormat="dd-MM-yyyy"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <label>until: </label>
        <DatePicker
          dateFormat="dd-MM-yyyy"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
        <select
          className="form-select ml-2"
          aria-label="Default select example"
          onChange={selectHandler}
        >
          <option value="all">All Status</option>
          {statusOption.map((val) => (
            <option value={val.status}>{val.status}</option>
          ))}
        </select>
        <button onClick={getTrxData} type="button" class="btn btn-info">
          Show
        </button>
      </div>
      <div className="text-center data">
        <table className="table table-hover">
          <thead className="thead-light">
            <th>ID Trx</th>
            <th>Trx Date</th>
            <th>User Name</th>
            <th>Total Trx</th>
            <th>Transfer Receipt</th>
            <th>Transfer Date</th>
            <th>Status</th>
            <th colSpan="2">Action</th>
          </thead>
          <tbody>{renderTransaksi()}</tbody>
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

export default connect(mapStateToProps)(ManageTransaction);
