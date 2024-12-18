import React from "react";
import Card from "./Card"; // Đường dẫn đã chính xác
import Table from "./Table"; // Đường dẫn đã chính xác

const Dashboard = () => {
  // Dữ liệu mẫu cho Today Booking List
  const data = [
    {
      name: "Frank Baker",
      roomType: "Single",
      checkIn: "12/03/2024",
      checkOut: "13/03/2024",
      paidAmount: 0.0,
      dueAmount: 230,
      status: "Pending",
    },
    {
      name: "Phil Glover",
      roomType: "Studio",
      checkIn: "12/03/2024",
      checkOut: "21/03/2024",
      paidAmount: 0.0,
      dueAmount: 4450,
      status: "Pending",
    },
    {
      name: "Rya Randall",
      roomType: "Deluxe",
      checkIn: "12/03/2024",
      checkOut: "24/03/2024",
      paidAmount: 0.0,
      dueAmount: 430,
      status: "Pending",
    },
    {
      name: "Sally Graham",
      roomType: "Queen",
      checkIn: "12/03/2024",
      checkOut: "17/03/2024",
      paidAmount: 1550,
      dueAmount: 0.0,
      status: "Success",
    },
    {
      name: "Victor Rampling",
      roomType: "Junior Suite",
      checkIn: "12/03/2024",
      checkOut: "15/03/2024",
      paidAmount: 0.0,
      dueAmount: 530,
      status: "Pending",
    },
    {
      name: "Aictor Sterling",
      roomType: "Studio",
      checkIn: "22/03/2024",
      checkOut: "29/03/2024",
      paidAmount: 0.0,
      dueAmount: 530,
      status: "Pending",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Today Booking" value="1,587" change="+10%" />
        <Card title="Total Amount" value="$2,258" change="+40%" />
        <Card title="Total Customer" value="2.3k" change="+15%" />
        <Card title="Total Revenue" value="11,587" change="+22%" />
      </div>

      {/* Booking List */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Today Booking List</h2>
        <Table data={data} /> {/* Truyền data làm props */}
      </div>
    </div>
  );
};

export default Dashboard;
