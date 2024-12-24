import React, { useEffect, useState } from 'react';
import { getInvoices } from "../../service/apiServices";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Transaction.css';

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
        <div className="pt-5 pb-8 px-4 mt-4">
            <div className="mb-4 text-center">
                <h2 className="font-bold text-3xl font-sans">Transaction</h2>
            </div>

            <div className="search-bar mb-4 d-flex align-items-center">
                <label htmlFor="search" className="me-2 fw-bold">Search:</label>
                <input
                    type="text"
                    id="search"
                    className="form-control w-50"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-light text-center">
                        <tr>
                            <th scope="col">ID</th>
                            <th
                                scope="col"
                                className="sortable-column"
                                onClick={() => handleSortChange('customer')}
                            >
                                Customer {sort === 'customer' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th
                                scope="col"
                                className="sortable-column"
                                onClick={() => handleSortChange('createdAt')}
                            >
                                Date {sort === 'createdAt' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th scope="col">Total</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <React.Fragment key={item.id}>
                                <tr className={index % 2 === 0 ? 'bg-light' : ''}>
                                    <td className="text-center">{item.id}</td>
                                    <td>{item.customers.split('\n').map((name, idx) => (
                                        <div key={idx}>{name}</div>
                                    ))}</td>
                                    <td className="text-center">{item.date}</td>
                                    <td className="text-center">{item.total.toLocaleString('en-US')} VND</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-link text-black text-decoration-none"
                                            onClick={() => toggleDetails(item.id)}
                                        >
                                            {expandedRow === item.id ? 'Hide Details' : 'Show Details'}
                                        </button>
                                    </td>
                                </tr>
                                {expandedRow === item.id && (
                                    <tr>
                                        <td colSpan="5">
                                            <div className="p-3 bg-white shadow rounded">
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
