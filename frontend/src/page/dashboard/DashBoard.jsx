import React from "react";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  // Dữ liệu doanh thu giả lập
  const monthlyRevenueData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Monthly Revenue (USD)",
        data: [5000, 4000, 8000, 10000, 7000, 9000, 11000, 12000, 9500, 8000, 10500, 13000],
        backgroundColor: [
          "#4caf50",
          "#2196f3",
          "#ff9800",
          "#f44336",
          "#9c27b0",
          "#3f51b5",
          "#00bcd4",
          "#8bc34a",
          "#ffc107",
          "#ff5722",
          "#607d8b",
          "#e91e63",
        ],
      },
    ],
  };

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

export default Dashboard;
