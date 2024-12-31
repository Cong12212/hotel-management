import React, { useState, useEffect, useCallback } from "react";
import { fetchMonthlyReport } from "../../service/apiServices";
import "bootstrap/dist/css/bootstrap.min.css";

    const MonthlyRevenueReport = () => {
        const [data, setData] = useState(null); // Dữ liệu báo cáo
        const [month, setMonth] = useState("12"); // Tháng mặc định
        const [year, setYear] = useState("2024"); // Năm mặc định
        const [loading, setLoading] = useState(false); // Trạng thái đang tải
        const [error, setError] = useState(null); // Lỗi (nếu có)
        const [sortConfig, setSortConfig] = useState({ key: "date", direction: "asc" }); // Cấu hình sắp xếp

        const fetchReportData = useCallback(async () => {
            setLoading(true);
            setError(null);
        
            try {
                const response = await fetchMonthlyReport(month, year);
                if (response.success && response.data) {
                    setData(response.data);
                } else {
                    throw new Error(response.error || "No data available.");
                }
            } catch (err) {
                if (err.response && err.response.status === 403) {
                    setError("You do not have permission");
                } else {
                    setError(err.message || "Network error");
                }
                setData(null);
            } finally {
                setLoading(false);
            }
        }, [month, year]);
    

    useEffect(() => {
        fetchReportData(); // Tự động fetch dữ liệu khi component mount
    }, [fetchReportData]);

    const handleMonthChange = (e) => setMonth(e.target.value);
    const handleYearChange = (e) => setYear(e.target.value);

    const handleSort = (key) => {
        if (!data || !Array.isArray(data.dailyData)) return;

        const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
        setSortConfig({ key, direction });

        const sortedData = [...data.dailyData].sort((a, b) => {
            if (key === "date") {
                return direction === "asc"
                    ? new Date(a.date) - new Date(b.date)
                    : new Date(b.date) - new Date(a.date);
            } else {
                return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
            }
        });
        setData({ ...data, dailyData: sortedData });
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "asc" ? "↑" : "↓";
        }
        return "";
    };

    return (
        <div className="container mt-5">
            {/* Bộ lọc */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <label htmlFor="month" className="form-label">Select Month:</label>
                    <select id="month" className="form-select" value={month} onChange={handleMonthChange}>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                                {new Date(0, i).toLocaleString("en", { month: "long" })}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="year" className="form-label">Enter Year:</label>
                    <input
                        type="number"
                        id="year"
                        className="form-control"
                        value={year}
                        onChange={handleYearChange}
                        min="2000"
                        max="2100"
                    />
                </div>
                <div className="col-md-4 d-flex align-items-end">
                    <button className="btn btn-primary w-100" onClick={fetchReportData}>
                        Fetch Report
                    </button>
                </div>
            </div>

            {/* Trạng thái đang tải */}
            {loading && <p>Loading...</p>}

            {/* Hiển thị lỗi */}
            {error && <p className="text-danger">{error}</p>}

            {/* Hiển thị dữ liệu */}
            {data && typeof data === "object" && (
                <div>
                    <h4>Summary:</h4>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <th>Total Bookings</th>
                                <td>{data.totalBookings || 0}</td>
                            </tr>
                            <tr>
                                <th>Total Amount (VND)</th>
                                <td>{data.totalAmount?.toLocaleString() || "0"} VND</td>
                            </tr>
                            <tr>
                                <th>Total New Customers</th>
                                <td>{data.totalNewCustomer || 0}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h4 className="mt-4">Daily Revenue Data:</h4>
                    {Array.isArray(data.dailyData) && data.dailyData.length > 0 ? (
                        <table className="table table-bordered mt-3">
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
                                        Date {getSortIndicator("date")}
                                    </th>
                                    <th onClick={() => handleSort("totalAmount")} style={{ cursor: "pointer" }}>
                                        Total Amount (VND) {getSortIndicator("totalAmount")}
                                    </th>
                                    <th onClick={() => handleSort("totalBookings")} style={{ cursor: "pointer" }}>
                                        Total Bookings {getSortIndicator("totalBookings")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.dailyData.map((day, index) => (
                                    <tr key={index}>
                                        <td>{new Date(day.date).toLocaleDateString("en-GB") || "N/A"}</td>
                                        <td>{day.totalAmount?.toLocaleString() || "0"}</td>
                                        <td>{day.totalBookings || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-warning">No data available for the selected month and year.</p>
                    )}
                </div>
            )}

            {/* Khi không có dữ liệu */}
            {!loading && !data && !error && (
                <p className="text-warning">No data available for the selected month and year.</p>
            )}
        </div>
    );
};

export default MonthlyRevenueReport;
