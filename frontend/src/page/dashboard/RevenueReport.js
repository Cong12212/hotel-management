import React, { useState, useEffect } from 'react';
import { fetchMonthlyReport } from "../../service/apiServices";

import 'bootstrap/dist/css/bootstrap.min.css';

const MonthlyRevenueReport = () => {
    const [data, setData] = useState(null);
    const [month, setMonth] = useState('12'); // Default to December
    const [year, setYear] = useState('2024'); // Default to 2024
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReportData = async () => {
        setLoading(true);
        setError(null);
        try {
            const reportData = await fetchMonthlyReport(`${month}-${year}`);
            setData(reportData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReportData();
    }, [month, year]);

    const handleMonthChange = (e) => setMonth(e.target.value);
    const handleYearChange = (e) => setYear(e.target.value);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Monthly Revenue Report</h2>

            <div className="row mb-4">
                <div className="col-md-4">
                    <label htmlFor="month" className="form-label">Select Month:</label>
                    <select id="month" className="form-select" value={month} onChange={handleMonthChange}>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                {new Date(0, i).toLocaleString('en', { month: 'long' })}
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

            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-danger text-center">{error}</p>}

            {data && (
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Total Bookings</th>
                                <th>Total Amount (VND)</th>
                                <th>Total New Customers</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.totalBookings || 0}</td>
                                <td>{data.totalAmount?.toLocaleString('en-US') || '0'}</td>
                                <td>{data.totalNewCustomer || 0}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h4 className="mt-4">Daily Data</h4>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Total Amount (VND)</th>
                                <th>Total Bookings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.dailyData && data.dailyData.length > 0 ? (
                                data.dailyData.map((day, index) => (
                                    <tr key={index}>
                                        <td>{new Date(day.date).toLocaleDateString('en-US')}</td>
                                        <td>{day.totalAmount.toLocaleString('en-US')}</td>
                                        <td>{day.totalBookings}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center">
                                        No data available for the selected month and year.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MonthlyRevenueReport;