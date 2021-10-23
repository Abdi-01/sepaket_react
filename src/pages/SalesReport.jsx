import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../assets/styles/salesreport.css";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
  Bar,
  Line,
} from "recharts";

function SalesReport() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectData, setSelectData] = useState("parcels");
  const [dataTampil, setDataTampil] = useState([]);
  const [chartTampil, setChartTampil] = useState([]);

  const fetchTrxParcelAll = () => {
    Axios.get(`${API_URL}/transaction/get-trxparcel`)
      .then((result) => {
        setDataTampil(result.data);
      })
      .catch((err) => {
        alert("Gagal mendapatkan data Transaksi Parcel");
      });
  };

  const fetchTrxParcelChart = () => {
    Axios.get(`${API_URL}/transaction/get-trxparchart`)
      .then((result) => {
        setChartTampil(result.data);
      })
      .catch((err) => {
        alert("Gagal mendapatkan data Transaksi Parcel untuk Chart");
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

    if (selectData === "parcels") {
      Axios.get(
        `${API_URL}/transaction/get-trxparcel-date/${from + " " + until}`
      )
        .then((result) => {
          setDataTampil(result.data);
        })
        .catch((err) => {
          alert("Gagal mendapatkan data Transaksi Parcel");
        });
      Axios.get(
        `${API_URL}/transaction/get-trxparchart-date/${from + " " + until}`
      )
        .then((result) => {
          setChartTampil(result.data);
        })
        .catch((err) => {
          alert("Gagal mendapatkan data Transaksi Parcel untuk Chart");
        });
    }

    if (selectData === "products") {
      Axios.get(
        `${API_URL}/transaction/get-trxproduct-date/${from + " " + until}`
      )
        .then((result) => {
          setDataTampil(result.data);
        })
        .catch((err) => {
          alert("Gagal mendapatkan data Transaksi Product");
        });
      Axios.get(
        `${API_URL}/transaction/get-trxprochart-date/${from + " " + until}`
      )
        .then((result) => {
          setChartTampil(result.data);
        })
        .catch((err) => {
          alert("Gagal mendapatkan data Transaksi Product untuk Chart");
        });
    }
  };

  const renderTransaksi = () => {
    return dataTampil.map((val) => {
      return (
        <tr>
          <td>{val.date}</td>
          <td>{val.id}</td>
          <td>{val.name}</td>
          <td>{val.qty}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    fetchTrxParcelAll();
    fetchTrxParcelChart();
  }, []);

  return (
    <div>
      <div className="col-12 text-center mb-4">
        <h1>Sales Report</h1>
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
          <option value="parcels">Parcels</option>
          <option value="products">Products</option>
        </select>
        <button onClick={getTrxData} type="button" class="btn btn-info">
          Show
        </button>
      </div>
      <div className="d-flex text-center">
        <div className="table-tampil">
          <table className="table table-hover">
            <thead className="thead-light">
              <th>Trx Date</th>
              <th>ID Parcel/Product</th>
              <th>Name</th>
              <th>Qty Sold</th>
            </thead>
            <tbody>{renderTransaksi()}</tbody>
          </table>
        </div>
        <div className="chart-tampil">
          <ComposedChart
            width={800}
            height={400}
            data={chartTampil}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Tooltip />
            <Bar dataKey="qty" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="qty" stroke="#ff7300" />
          </ComposedChart>
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

export default connect(mapStateToProps)(SalesReport);
