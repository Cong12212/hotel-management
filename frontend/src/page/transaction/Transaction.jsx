import React, { useEffect, useState } from 'react';
import { getInvoices } from "../../service/apiServices";
import './Transaction.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Transaction = () => {
    const [data, setData] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState('totalAmount'); // Default sort by totalAmount
    const [sortOrder, setSortOrder] = useState('asc'); // Default ascending order
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = {
                    page: currentPage,
                    limit: itemsPerPage,
                    search: searchTerm || undefined,
                    sort: `${sortOrder === 'asc' ? '' : '-'}${sort}`, // Dynamic sort parameter
                };

                const response = await getInvoices(params);
                const invoicesData = response.data.data;
                const totalItems = response.data.total;

                const combinedData = invoicesData.map((invoice, index) => ({
                    id: (currentPage - 1) * itemsPerPage + index + 1, // Sequential ID
                    customers: invoice.bookingId.customerIds.map(c => c.fullName).join('\n'),
                    date: new Date(invoice.createdAt).toLocaleString('en-US', { timeZone: 'UTC' }),
                    total: invoice.totalAmount,
                    details: invoice.bookingId.bookingDetails.map(detail => ({
                        roomName: detail.roomId?.roomName || 'N/A',
                        roomPrice: detail.roomPrice || 0,
                    })),
                }));

                setData(combinedData);
                setTotalPages(Math.ceil(totalItems / itemsPerPage));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [currentPage, searchTerm, sort, sortOrder]);

    const toggleDetails = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const handleSortChange = (field) => {
        if (sort === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSort(field);
            setSortOrder('asc');
        }
    };

    return (
        <div className="pt-16 pb-8 pr-8 mt-2">
            <div className="flex items-center mb-3 justify-between">
                <h2 className="font-bold text-3xl font-sans">Transaction</h2>
            </div>

            <div className="search-bar mb-3">
                <label htmlFor="search" className="me-2 fw-bold">Search:</label>
                <input
                    type="text"
                    id="search"
                    className="form-control d-inline-block w-auto"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="table-responsive table-wrapper">
                <table className="table table-bordered custom-table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Customer</th>
                            <th
                                scope="col"
                                onClick={() => handleSortChange('createdAt')}
                                className="sortable-column"
                            >
                                Date {sort === 'createdAt' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th
                                scope="col"
                                onClick={() => handleSortChange('totalAmount')}
                                className="sortable-column"
                            >
                                Total {sort === 'totalAmount' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <React.Fragment key={item.id}>
                                <tr className="border-bottom"> {/* Using Bootstrap's border-bottom */}
                                    <td>{item.id}</td>
                                    <td>{item.customers.split('\n').map((name, idx) => (
                                        <div key={idx}>{name}</div>
                                    ))}</td>
                                    <td>{item.date}</td>
                                    <td>{item.total.toLocaleString('en-US')} VND</td>
                                    <td>
                                        <button
                                            className="btn btn-link"
                                            style={{ fontWeight: 'bold', textDecoration: 'underline', color: 'black' }}
                                            onClick={() => toggleDetails(item.id)}
                                        >
                                            {expandedRow === item.id ? 'Hide Details' : 'Show Details'}
                                        </button>
                                    </td>
                                </tr>
                                {expandedRow === item.id && (
                                    <tr>
                                        <td colSpan="5">
                                            <div className="details-table p-3 bg-white shadow rounded">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Room Name</th>
                                                            <th>Room Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {item.details.map((detail, i) => (
                                                            <tr key={i}>
                                                                <td>{detail.roomName}</td>
                                                                <td>{detail.roomPrice.toLocaleString('en-US')} VND</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <nav aria-label="Pagination">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                        </li>
                        {[...Array(totalPages)].map((_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Transaction;
