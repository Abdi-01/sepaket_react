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

function Revenue() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dataTampil, setDataTampil] = useState([]);

  const fetchTrxRevenue = () => {
    Axios.get(`${API_URL}/transaction/get-revenue`)
      .then((result) => {
        setDataTampil(result.data);
      })
      .catch((err) => {
        alert("Gagal mendapatkan data Transaksi Parcel");
      });
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

    Axios.get(`${API_URL}/transaction/get-revenue-date/${from + " " + until}`)
      .then((result) => {
        setDataTampil(result.data);
      })
      .catch((err) => {
        alert("Gagal mendapatkan data Transaksi Parcel");
      });
  };

  const renderTransaksi = () => {
    return dataTampil.map((val) => {
      let profit = val.pendapatan - val.totalModal;
      return (
        <tr>
          <td>{val.id}</td>
          <td>{val.date}</td>
          <td>Rp. {val.pendapatan}</td>
          <td>Rp. {val.totalModal}</td>
          {profit < 0 ? (
            <td className="table-danger">Rp. {profit}</td>
          ) : (
            <td className="table-success">Rp. {profit}</td>
          )}
        </tr>
      );
    });
  };

  const renderTotal = () => {
    let totalPendapatan = dataTampil
      .map((obj) => obj.pendapatan)
      .reduce((x, y) => {
        return x + y;
      }, 0);

    let totalModal = dataTampil
      .map((obj) => obj.totalModal)
      .reduce((x, y) => {
        return x + y;
      }, 0);

    let totalProfit = totalPendapatan - totalModal;

    return (
      <tr>
        <td></td>
        <td>TOTAL</td>
        <td>Rp. {totalPendapatan}</td>
        <td>Rp. {totalModal}</td>
        <td>Rp. {totalProfit}</td>
      </tr>
    );
  };

  useEffect(() => {
    fetchTrxRevenue();
  }, []);

  return (
    <div>
      <div className="col-12 text-center mb-4">
        <h1>Revenue</h1>
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
        <button onClick={getTrxData} type="button" class="btn btn-info">
          Show
        </button>
      </div>
      <div className="d-flex text-center">
        <div className="table-tampil">
          <table className="table table-hover">
            <thead className="thead-light">
              <th>ID</th>
              <th>Date</th>
              <th>Pendapatan</th>
              <th>Modal</th>
              <th>Profit</th>
            </thead>
            <tbody>{renderTransaksi()}</tbody>
            <tfoot>{renderTotal()}</tfoot>
          </table>
        </div>
        <div className="chart-tampil">
          <ComposedChart
            width={800}
            height={400}
            data={dataTampil}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Tooltip />
            <Bar dataKey="pendapatan" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="totalModal" stroke="#ff7300" />
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

export default connect(mapStateToProps)(Revenue);
