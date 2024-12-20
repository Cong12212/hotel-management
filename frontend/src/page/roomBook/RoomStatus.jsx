import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, InputGroup, DropdownButton, Dropdown} from 'react-bootstrap';

function RoomStatus() {
    const navigate = useNavigate();

    const handleNavigateToBookingList = () => {
        navigate('/bookings'); // Đường dẫn tới trang BookingList
    };

    const initialRooms = [
        { id: 1, name: 'P.101', type: 'A', price: 4000, status: 'Check in' },
        { id: 2, name: 'P.102', type: 'A', price: 4000, status: 'Available' },
        { id: 3, name: 'P.103', type: 'B', price: 5000, status: 'Available' },
        { id: 4, name: 'P.104', type: 'B', price: 5000, status: 'Available' },
        { id: 5, name: 'P.105', type: 'C', price: 6000, status: 'Available' },
        { id: 6, name: 'P.106', type: 'C', price: 6000, status: 'Available' },
        { id: 7, name: 'P.107', type: 'A', price: 7000, status: 'Unavailable' },
        { id: 8, name: 'P.108', type: 'B', price: 7000, status: 'Available' },
        // { id: 9, name: 'P.109', type: 'C', price: 8000, status: 'Check in' },
        // { id: 10, name: 'P.110', type: 'C', price: 8000, status: 'Available' },
        // { id: 11, name: 'P.111', type: 'A', price: 4000, status: 'Available' },
        // { id: 12, name: 'P.112', type: 'A', price: 4000, status: 'Available' },
        // { id: 13, name: 'P.113', type: 'B', price: 5000, status: 'Available' },
        // { id: 14, name: 'P.114', type: 'B', price: 5000, status: 'Available' },
        // { id: 15, name: 'P.115', type: 'C', price: 6000, status: 'Available' },
        // { id: 16, name: 'P.116', type: 'C', price: 6000, status: 'Available' },
        // { id: 17, name: 'P.117', type: 'A', price: 7000, status: 'Unavailable' },
        // { id: 18, name: 'P.118', type: 'B', price: 7000, status: 'Available' },
        // { id: 19, name: 'P.119', type: 'C', price: 8000, status: 'Check in' },
        // { id: 20, name: 'P.120', type: 'C', price: 8000, status: 'Available' },
        // { id: 21, name: 'P.121', type: 'A', price: 4000, status: 'Available' },
        // { id: 22, name: 'P.122', type: 'A', price: 4000, status: 'Available' },
        // { id: 23, name: 'P.123', type: 'B', price: 5000, status: 'Available' },
        // { id: 24, name: 'P.124', type: 'B', price: 5000, status: 'Available' },
        // { id: 25, name: 'P.125', type: 'C', price: 6000, status: 'Available' },
        // { id: 26, name: 'P.126', type: 'C', price: 6000, status: 'Available' },
        // { id: 27, name: 'P.127', type: 'A', price: 7000, status: 'Unavailable' },
        // { id: 28, name: 'P.128', type: 'B', price: 7000, status: 'Available' },
        // { id: 29, name: 'P.129', type: 'C', price: 8000, status: 'Check in' },
        // { id: 30, name: 'P.130', type: 'C', price: 8000, status: 'Available' },
        // { id: 31, name: 'P.131', type: 'A', price: 4000, status: 'Available' },
        // { id: 32, name: 'P.132', type: 'A', price: 4000, status: 'Available' },
        // { id: 33, name: 'P.133', type: 'B', price: 5000, status: 'Available' },
        // { id: 34, name: 'P.134', type: 'B', price: 5000, status: 'Available' },
        // { id: 35, name: 'P.135', type: 'C', price: 6000, status: 'Available' },
        // { id: 36, name: 'P.136', type: 'C', price: 6000, status: 'Available' },
        // { id: 37, name: 'P.137', type: 'A', price: 7000, status: 'Unavailable' },
        // { id: 38, name: 'P.138', type: 'B', price: 7000, status: 'Available' },
        // { id: 39, name: 'P.139', type: 'C', price: 8000, status: 'Check in' },
        // { id: 40, name: 'P.140', type: 'C', price: 8000, status: 'Available' },
        // { id: 41, name: 'P.141', type: 'A', price: 4000, status: 'Available' },
        // { id: 42, name: 'P.142', type: 'A', price: 4000, status: 'Available' },
        // { id: 43, name: 'P.143', type: 'B', price: 5000, status: 'Available' },
        // { id: 44, name: 'P.144', type: 'B', price: 5000, status: 'Available' },
        // { id: 45, name: 'P.145', type: 'C', price: 6000, status: 'Available' },
        // { id: 46, name: 'P.146', type: 'C', price: 6000, status: 'Available' },
        // { id: 47, name: 'P.147', type: 'A', price: 7000, status: 'Check in' },
        // { id: 48, name: 'P.148', type: 'B', price: 7000, status: 'Available' },
        // { id: 49, name: 'P.149', type: 'C', price: 8000, status: 'Check in' },
        // { id: 50, name: 'P.150', type: 'C', price: 8000, status: 'Available' },
        // { id: 51, name: 'P.151', type: 'A', price: 4000, status: 'Available' },
        // { id: 52, name: 'P.152', type: 'A', price: 4000, status: 'Available' },
        // { id: 53, name: 'P.153', type: 'B', price: 5000, status: 'Available' },
        // { id: 54, name: 'P.154', type: 'B', price: 5000, status: 'Available' },
        // { id: 55, name: 'P.155', type: 'C', price: 6000, status: 'Available' },
        // { id: 56, name: 'P.156', type: 'C', price: 6000, status: 'Available' },
        // { id: 57, name: 'P.157', type: 'A', price: 7000, status: 'Check in' },
        // { id: 58, name: 'P.158', type: 'B', price: 7000, status: 'Available' },
        // { id: 59, name: 'P.159', type: 'C', price: 8000, status: 'Check in' },
        // { id: 60, name: 'P.160', type: 'C', price: 8000, status: 'Available' },
        // { id: 61, name: 'P.161', type: 'A', price: 4000, status: 'Available' },
        // { id: 62, name: 'P.162', type: 'A', price: 4000, status: 'Available' },
        // { id: 63, name: 'P.163', type: 'B', price: 5000, status: 'Available' },
        // { id: 64, name: 'P.164', type: 'B', price: 5000, status: 'Available' },
        // { id: 65, name: 'P.165', type: 'C', price: 6000, status: 'Available' },
        // { id: 66, name: 'P.166', type: 'C', price: 6000, status: 'Available' }
    ];

    const [rooms, setRooms] = useState(initialRooms);
    const [search, setSearch] = useState('');
    const [searchField, setSearchField] = useState('name');
    const [sortState, setSortState] = useState({
        id: { order: 'asc', active: false },
        price: { order: 'asc', active: false },
        status: { order: 'asc', active: false }
    });

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);  
  
    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };
    const handleSearchFieldChange = (field) => {
        setSearchField(field);
    };

    const handleRowsPerPageChange = (value) => {
        setRowsPerPage(Number(value));
        setCurrentPage(1);
    };
    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1);
        if (direction === 'next' && startIdx + rowsPerPage < filteredRooms.length) setCurrentPage(currentPage + 1);
    };
    const handleSort = (column) => {
        setSortState((prevState) => {
            const isAsc = prevState[column]?.order === 'asc';
            return {
                ...prevState,
                [column]: { order: isAsc ? 'desc' : 'asc', active: true },
                ...Object.keys(prevState)
                    .filter((key) => key !== column)
                    .reduce((acc, key) => {
                        acc[key] = { ...prevState[key], active: false };
                        return acc;
                    }, {}),
            };
        });
    };

    const toggleSortOrder = (column, newOrder) => {
        const newSortState = { ...sortState };
        if (newSortState[column].order === newOrder) {
            newSortState[column].order = ''; // reset nếu đã nhấn vào cùng một thứ tự
        } else {
            newSortState[column].order = newOrder;
        }
        setSortState(newSortState); // Cập nhật state với sortState mới
    };
    const getSortIcon = (column) => {
        const currentSort = sortState[column];
        if (currentSort.order === 'desc') {
            return (
                <>
                    ↑
                    <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleSortOrder(column, 'asc')}
                    >
                        ↓
                    </span>
                </>
            );
        } else if (currentSort.order === 'asc') {
            return (
                <>
                    <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleSortOrder(column, 'desc')}
                    >
                        ↑
                    </span>
                    ↓
                </>
            );
        } else {
            return (
                <>
                    ↑
                    <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleSortOrder(column, 'desc')}
                    >
                        ↓
                    </span>
                </>
            );
        }
    };



    const filteredRooms = rooms
        .filter((room) => room[searchField]?.toString().toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            const activeColumn = Object.keys(sortState).find((key) => sortState[key].active);
            if (!activeColumn) return 0;

            const sortOrder = sortState[activeColumn].order;
            if (activeColumn === 'price') {
                return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
            } else if (activeColumn === 'id') {
                return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
            } else if (activeColumn === 'status') {
                return sortOrder === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
            }
            return 0;
        });
    // Calculate Pagination
    const startIdx = (currentPage - 1) * rowsPerPage;
    const paginatedRooms = filteredRooms.slice(startIdx, startIdx + rowsPerPage);

    return (
        <div className="pt-16 pb-8 pr-8 mt-2 ">
            <div className="flex items-center mb-3 justify-between">
                <h2 className="font-bold text-3xl font-sans">Room Status</h2>
                <Button variant="dark" onClick={handleNavigateToBookingList}>Booking Room</Button>
            </div>

            <div className="bg-white font-dm-sans rounded-md shadow-sm p-3">
                <div className="flex justify-between">
                    <div className="d-flex">
                        {/* Search Input */}
                        <DropdownButton
                            id="dropdownSearch"
                            title={`Search by: ${searchField}`}
                            onSelect={handleSearchFieldChange}
                            variant="outline-secondary"
                            className="mr-3">
                            <Dropdown.Item eventKey="name">Room Name</Dropdown.Item>
                            <Dropdown.Item eventKey="type">Room Type</Dropdown.Item>
                            <Dropdown.Item eventKey="price">Room Price</Dropdown.Item>
                            <Dropdown.Item eventKey="status">Room Status</Dropdown.Item>
                        </DropdownButton>

                        <InputGroup>
                            <input
                                placeholder="Search"
                                className="outline-none focus:outline-dashed focus:outline-2 focus:outline-violet-500 border border-gray-300 rounded-md p-2"
                                value={search}
                                onChange={handleSearch}
                            />
                        </InputGroup>
                    </div>
                    <div className="flex ">
                        {/* Rows Per Page Dropdown */}
                        <DropdownButton
                            id="dropdownRowsPerPage"
                            title={`${rowsPerPage} rows`}
                            onSelect={handleRowsPerPageChange}
                            variant="outline-secondary"
                        >
                            {[10, 25, 50].map((value) => (
                                <Dropdown.Item eventKey={value} key={value}>
                                    {value} rows
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>

                </div>

                <Table className="text-center" bordered-y = "true" hover>
                    <colgroup>
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '20%' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>
                                ID
                                <button onClick={() => handleSort('id')} className="ml-2 text-l">
                                    {getSortIcon('id')}
                                </button>
                            </th>
                            <th>Room Name</th>
                            <th>Room Type</th>
                            <th>
                                Room Price
                                <button onClick={() => handleSort('price')} className="ml-2 text-l">
                                    {getSortIcon('price')}
                                </button>
                            </th>
                            <th>Status
                                <button onClick={() => handleSort('status')} className="ml-2 text-l">
                                    {getSortIcon('status')}
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedRooms.map((room) => (
                            <tr key={room.id}>
                                <td className="align-middle">{room.id}</td>
                                <td className="align-middle">{room.name}</td>
                                <td className="align-middle">{room.type}</td>
                                <td className="align-middle">{room.price}</td>
                                <td className="align-middle">
                                    <span
                                        style={{
                                            padding: '5px 10px',
                                            color: `${room.status === 'Check in' ? 'black' : 'white'}`,
                                            fontWeight: 'bold',
                                            backgroundColor: `${room.status === 'Available' ? 'green' :
                                                room.status === 'Check in' ? 'orange' :
                                                    room.status === 'Unavailable' ? 'red' : 'black'}`,
                                            borderRadius: '4px',  // Optional: to round the corners
                                        }}
                                    >
                                        {room.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {/* Pagination Controls */}
                <div className="flex items-center justify-end gap-3">
                    <Button variant="dark"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange('prev')}>
                        Previous
                    </Button>
                    <span>Page {currentPage}</span>
                    <Button variant="dark"
                        disabled={startIdx + rowsPerPage >= filteredRooms.length}
                        onClick={() => handlePageChange('next')}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default RoomStatus;
