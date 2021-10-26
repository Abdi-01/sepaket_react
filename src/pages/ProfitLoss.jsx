import React, { useState, useEffect } from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import {useSelector} from "react-redux" 

function ProfitLoss() {
  const globalState = useSelector((state)=>state.user)

  const [trxProfitLoss, setTrxProfitLoss] = useState([]);

  const fetchTrxProfitLoss = () => {
    Axios(`${API_URL}/transaction/get-profitloss`).then((result) => {
      setTrxProfitLoss(result.data);
    });
  };

  const renderTrx = () => {
    return trxProfitLoss.map((val) => {
      let profit = val.harga_jual - val.totalModal;
      return (
        <tr>
          <td>{val.id_parcel}</td>
          <td>{val.parcel_name}</td>
          <td>{val.id_trx}</td>
          <td>Rp. {val.harga_jual}</td>
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

  useEffect(() => {
    fetchTrxProfitLoss();
  }, []);

  if (globalState.role !== "admin"){ return <Redirect to="/" /> }
  
  return (
    <div className="col-12 text-center">
      <h1>Profit Loss Report</h1>
      <table className="table table-hover mt-4">
        <thead className="thead-light">
          <tr>
            <th>ID Parcel</th>
            <th>Parcel Name</th>
            <th>ID Trx</th>
            <th>Harga Jual</th>
            <th>T. Harga Beli</th>
            <th>Profit/Loss</th>
          </tr>
        </thead>
        <tbody>{renderTrx()}</tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

export default connect(mapStateToProps)(ProfitLoss);
