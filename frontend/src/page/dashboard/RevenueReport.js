import React, { useState } from "react";
import DataTable from "react-data-table-component";

const RevenueReport = ({ data }) => {
  // State lưu trữ giá trị của form
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [filteredData, setFilteredData] = useState(data); // Dữ liệu đã lọc

  // Hàm xử lý khi nhấn nút "Search"
  const handleSearch = () => {
    const filtered = data.filter((item) => {
      const withinDateRange =
        (!startDate || new Date(item.date) >= new Date(startDate)) &&
        (!endDate || new Date(item.date) <= new Date(endDate));
      const matchesBookingStatus =
        !bookingStatus || item.bookingStatus === bookingStatus;
      const matchesPaymentStatus =
        !paymentStatus || item.paymentStatus === paymentStatus;

      return withinDateRange && matchesBookingStatus && matchesPaymentStatus;
    });
    setFilteredData(filtered);
  };

  // Định nghĩa cột cho bảng
  const columns = [
    {
      name: "Month",
      selector: (row) => row.month,
      sortable: true,
    },
    {
      name: "Revenue",
      selector: (row) => `$${row.revenue.toLocaleString()}`,
      sortable: true,
      right: true,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Form tìm kiếm */}
      <h2 className="text-xl font-semibold mb-4">Search Reports Here</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Ngày bắt đầu */}
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        {/* Ngày kết thúc */}
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        {/* Trạng thái booking */}
        <div>
          <label className="block text-sm font-medium mb-1">Booking Status</label>
          <select
            value={bookingStatus}
            onChange={(e) => setBookingStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Find Booking Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
          </select>
        </div>
        {/* Trạng thái thanh toán */}
        <div>
          <label className="block text-sm font-medium mb-1">Payment Status</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Find Payment Status</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>
      {/* Nút tìm kiếm */}
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Search
      </button>

      {/* Hiển thị bảng doanh thu */}
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          responsive
        />
      </div>
    </div>
  );
};

export default RevenueReport;
