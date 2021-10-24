import React from "react";
// import AdminNavbar from "../components/AdminNavbar";
import ChartSalesReport from "../components/ChartSalesReport";
import { Redirect } from 'react-router-dom'
import {useSelector} from "react-redux" 


const Admin = (props) => {
  const globalState = useSelector((state)=>state.user)

  if (globalState.role !== "admin"){ return <Redirect to="/" /> }
  return (
    <div>
      {/* <AdminNavbar /> */}
      <ChartSalesReport />
    </div>
  );
};

export default Admin;
