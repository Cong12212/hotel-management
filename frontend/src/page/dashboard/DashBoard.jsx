import React from "react";
import { Bar } from "react-chartjs-2";

const DashBoard = () => {
  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>

      {/* Doanh thu báo cáo tháng */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Monthly Revenue Reports
        </h2>
        <Bar data={monthlyRevenueData} options={options} />
      </div>

      {/* Các phần khác của Dashboard */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Other Reports or Widgets
        </h2>
        {/* Add other components here */}
      </div>
    </div>
  );
};

export default DashBoard;
