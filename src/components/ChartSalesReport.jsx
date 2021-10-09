import React from "react";
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

const ChartSalesReport = () => {
  const data = [
    { name: "2021-01", uv: 590, pv: 800, amt: 1400 },
    { name: "2021-02", uv: 868, pv: 967, amt: 1506 },
    { name: "2021-03", uv: 1397, pv: 1098, amt: 989 },
    { name: "2021-04", uv: 1480, pv: 1200, amt: 1228 },
    { name: "2021-05", uv: 1520, pv: 1108, amt: 1100 },
    { name: "2021-07", uv: 1400, pv: 680, amt: 1700 },
    { name: "2021-08", uv: 1400, pv: 680, amt: 1700 },
    { name: "2021-09", uv: 1400, pv: 680, amt: 1700 },
  ];
  return (
    <div className="composed-chart-wrapper">
      <ComposedChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Tooltip />
        <Bar dataKey="pv" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="pv" stroke="#ff7300" />
      </ComposedChart>
    </div>
  );
};

export default ChartSalesReport;
