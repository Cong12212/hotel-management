import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Form, InputGroup, DropdownButton, Dropdown, Modal } from 'react-bootstrap';

function RoomList() {
    const initialRooms = [
        { id: 1, name: 'P.101', type: 'A', price: 4000, note: '2 bed' },
        { id: 2, name: 'P.102', type: 'A', price: 4000, note: '2 bed' },
        { id: 3, name: 'P.103', type: 'B', price: 5000, note: '1 bed' },
        { id: 4, name: 'P.104', type: 'B', price: 5000, note: '2 bed' },
        { id: 5, name: 'P.105', type: 'C', price: 6000, note: '1 bed' },
        { id: 6, name: 'P.106', type: 'C', price: 6000, note: '2 bed' },
        { id: 7, name: 'P.107', type: 'A', price: 7000, note: '3 bed' },
        { id: 8, name: 'P.108', type: 'B', price: 7000, note: '2 bed' },
        { id: 9, name: 'P.109', type: 'C', price: 8000, note: '4 bed' },
        { id: 10, name: 'P.110', type: 'C', price: 8000, note: '2 bed' },
        { id: 11, name: 'P.111', type: 'A', price: 4000, note: '2 bed' },
        { id: 12, name: 'P.112', type: 'A', price: 4000, note: '2 bed' },
        { id: 13, name: 'P.113', type: 'B', price: 5000, note: '1 bed' },
        { id: 14, name: 'P.114', type: 'B', price: 5000, note: '2 bed' },
        { id: 15, name: 'P.115', type: 'C', price: 6000, note: '1 bed' },
        { id: 16, name: 'P.116', type: 'C', price: 6000, note: '2 bed' },
        { id: 17, name: 'P.117', type: 'A', price: 7000, note: '3 bed' },
        { id: 18, name: 'P.118', type: 'B', price: 7000, note: '2 bed' },
        { id: 19, name: 'P.119', type: 'C', price: 8000, note: '4 bed' },
        { id: 20, name: 'P.120', type: 'C', price: 8000, note: '2 bed' },
        { id: 21, name: 'P.121', type: 'A', price: 4000, note: '2 bed' },
        { id: 22, name: 'P.122', type: 'A', price: 4000, note: '2 bed' },
        { id: 23, name: 'P.123', type: 'B', price: 5000, note: '1 bed' },
        { id: 24, name: 'P.124', type: 'B', price: 5000, note: '2 bed' },
        { id: 25, name: 'P.125', type: 'C', price: 6000, note: '1 bed' },
        { id: 26, name: 'P.126', type: 'C', price: 6000, note: '2 bed' },
        { id: 27, name: 'P.127', type: 'A', price: 7000, note: '3 bed' },
        { id: 28, name: 'P.128', type: 'B', price: 7000, note: '2 bed' },
        { id: 29, name: 'P.129', type: 'C', price: 8000, note: '4 bed' },
        { id: 30, name: 'P.130', type: 'C', price: 8000, note: '2 bed' },
        { id: 31, name: 'P.131', type: 'A', price: 4000, note: '2 bed' },
        { id: 32, name: 'P.132', type: 'A', price: 4000, note: '2 bed' },
        { id: 33, name: 'P.133', type: 'B', price: 5000, note: '1 bed' },
        { id: 34, name: 'P.134', type: 'B', price: 5000, note: '2 bed' },
        { id: 35, name: 'P.135', type: 'C', price: 6000, note: '1 bed' },
        { id: 36, name: 'P.136', type: 'C', price: 6000, note: '2 bed' },
        { id: 37, name: 'P.137', type: 'A', price: 7000, note: '3 bed' },
        { id: 38, name: 'P.138', type: 'B', price: 7000, note: '2 bed' },
        { id: 39, name: 'P.139', type: 'C', price: 8000, note: '4 bed' },
        { id: 40, name: 'P.140', type: 'C', price: 8000, note: '2 bed' },
        { id: 41, name: 'P.141', type: 'A', price: 4000, note: '2 bed' },
        { id: 42, name: 'P.142', type: 'A', price: 4000, note: '2 bed' },
        { id: 43, name: 'P.143', type: 'B', price: 5000, note: '1 bed' },
        { id: 44, name: 'P.144', type: 'B', price: 5000, note: '2 bed' },
        { id: 45, name: 'P.145', type: 'C', price: 6000, note: '1 bed' },
        { id: 46, name: 'P.146', type: 'C', price: 6000, note: '2 bed' },
        { id: 47, name: 'P.147', type: 'A', price: 7000, note: '3 bed' },
        { id: 48, name: 'P.148', type: 'B', price: 7000, note: '2 bed' },
        { id: 49, name: 'P.149', type: 'C', price: 8000, note: '4 bed' },
        { id: 50, name: 'P.150', type: 'C', price: 8000, note: '2 bed' },
        { id: 51, name: 'P.151', type: 'A', price: 4000, note: '2 bed' },
        { id: 52, name: 'P.152', type: 'A', price: 4000, note: '2 bed' },
        { id: 53, name: 'P.153', type: 'B', price: 5000, note: '1 bed' },
        { id: 54, name: 'P.154', type: 'B', price: 5000, note: '2 bed' },
        { id: 55, name: 'P.155', type: 'C', price: 6000, note: '1 bed' },
        { id: 56, name: 'P.156', type: 'C', price: 6000, note: '2 bed' },
        { id: 57, name: 'P.157', type: 'A', price: 7000, note: '3 bed' },
        { id: 58, name: 'P.158', type: 'B', price: 7000, note: '2 bed' },
        { id: 59, name: 'P.159', type: 'C', price: 8000, note: '4 bed' },
        { id: 60, name: 'P.160', type: 'C', price: 8000, note: '2 bed' },
        { id: 61, name: 'P.161', type: 'A', price: 4000, note: '2 bed' },
        { id: 62, name: 'P.162', type: 'A', price: 4000, note: '2 bed' },
        { id: 63, name: 'P.163', type: 'B', price: 5000, note: '1 bed' },
        { id: 64, name: 'P.164', type: 'B', price: 5000, note: '2 bed' },
        { id: 65, name: 'P.165', type: 'C', price: 6000, note: '1 bed' },
        { id: 66, name: 'P.166', type: 'C', price: 6000, note: '2 bed' }
    ];

    const [rooms, setRooms] = useState(initialRooms);
    const [search, setSearch] = useState('');
    const [searchField, setSearchField] = useState('name');
    const [sortState, setSortState] = useState({
        id: { order: 'asc', active: false },
        price: { order: 'asc', active: false },
    });
    const [showModal, setShowModal] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [newRoom, setNewRoom] = useState({
        name: '',
        type: '',
        price: '',
        note: ''
    });
    const [errors, setErrors] = useState({});
    const [duplicateError, setDuplicateError] = useState('');
    const [editingRoom, setEditingRoom] = useState(null);


    const handleDelete = (id) => {
        setRooms(rooms.filter((room) => room.id !== id));
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };
    const handleSearchFieldChange = (field) => {
        setSearchField(field);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRoom({
            ...newRoom,
            [name]: value
        });
    };


    const validateForm = () => {
        const newErrors = {};
        if (!newRoom.name) newErrors.name = 'Room name is required';
        if (!newRoom.type) newErrors.type = 'Room type is required';
        if (!newRoom.price || isNaN(newRoom.price)) newErrors.price = 'Price must be a valid number';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isRoomDuplicate = () => {
        return rooms.some((room) => room.name === newRoom.name);
    };

    const handleAddRoom = () => {
        setDuplicateError('');
    
        // Kiểm tra nếu không có thay đổi gì trong việc chỉnh sửa phòng
        if (editingRoom && newRoom.name === editingRoom.name && newRoom.type === editingRoom.type && newRoom.price === editingRoom.price && newRoom.note === editingRoom.note) {
            alert("No changes were made.");
            setShowModal(false);
            return;
        }
    
        if (validateForm()) {
            const findMissingId = () => {
                const sortedIds = rooms.map((room) => room.id).sort((a, b) => a - b);
                for (let i = 1; i <= sortedIds.length; i++) {
                    if (sortedIds[i - 1] !== i) return i; 
                }
                return sortedIds.length + 1;
            };
            if (isRoomDuplicate()) {
                setDuplicateError('Room with this name or ID already exists.');
                return;
            }
    
            if (editingRoom) {
                setRooms(
                    rooms.map((room) =>
                        room.id === editingRoom.id ? { ...editingRoom, ...newRoom, price: Number(newRoom.price) } : room
                    )
                );
            } else {
                const newRoomId = findMissingId();
                setRooms([...rooms, { ...newRoom, id: newRoomId, price: Number(newRoom.price) }]);
            }
            setEditingRoom(null);
            setNewRoom({ name: '', type: '', price: '', note: '' });
            setShowModal(false);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setEditingRoom(null);
        setNewRoom({ name: '', type: '', price: '', note: '' }); 
        setErrors({}); 
        setDuplicateError('');
    };
    const handleModalShow = () => setShowModal(true);

    const handleRowsPerPageChange = (value) => {
        setRowsPerPage(Number(value));
        setCurrentPage(1);
    };
    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1);
        if (direction === 'next' && startIdx + rowsPerPage < filteredRooms.length) setCurrentPage(currentPage + 1);
    };

    const handleEditClick = (room) => {
        setEditingRoom(room);
        setNewRoom(room);
        setShowModal(true);
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

    const getSortIcon = (column) => {
        return sortState[column].order === 'asc' ? '↑' : '↓';
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
            }
            return 0;
        });
    // Calculate Pagination
    const startIdx = (currentPage - 1) * rowsPerPage;
    const paginatedRooms = filteredRooms.slice(startIdx, startIdx + rowsPerPage);

    return (
        <div className="pt-16 pb-8 pr-8 mt-2 ">
            <div className="flex items-center mb-3 justify-between overflow-auto">
                <h2 className="font-bold text-2xl font-sans">Room List</h2>
                <Button variant="dark" onClick={handleModalShow}>Add Room</Button>
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
                            className="mr-3"
                        >
                            <Dropdown.Item eventKey="name">Room Name</Dropdown.Item>
                            <Dropdown.Item eventKey="type">Room Type</Dropdown.Item>
                            <Dropdown.Item eventKey="price">Room Price</Dropdown.Item>
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

                <Table className="text-center" bordered-y hover>
                    <colgroup>
                        <col style={{ width: '5%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '10%' }} />
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
                            <th>Note</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedRooms.map((room) => (
                            <tr key={room.id}>
                                <td className="align-middle">{room.id}</td>
                                <td className="align-middle">{room.name}</td>
                                <td className="align-middle">{room.type}</td>
                                <td className="align-middle">{room.price}</td>
                                <td className="align-middle">{room.note}</td>
                                <td className="flex justify-center gap-2 p-3 align-middle">
                                    <button className="hover:text-blue-800 text-blue-500 text-xl" onClick={() => handleEditClick(room)}>✎</button>
                                    <button className="hover:text-red-800 text-red-500 font-bold text-xl" onClick={() => handleDelete(room.id)}>🗑</button>
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
            {/* Modal for adding room */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title onClick={handleAddRoom}>
                        {editingRoom ? 'Update Room' : 'Add Room'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formRoomName">
                            <Form.Label className="text-muted">
                                Room Name <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter room name"
                                name="name"
                                value={newRoom.name}
                                onChange={handleInputChange}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formRoomType">
                            <Form.Label className="text-muted">
                                Room Type <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter room type"
                                name="type"
                                value={newRoom.type}
                                onChange={handleInputChange}
                                isInvalid={!!errors.type}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.type}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formRoomPrice">
                            <Form.Label className="text-muted">
                                Price <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter room price"
                                name="price"
                                value={newRoom.price}
                                onChange={handleInputChange}
                                isInvalid={!!errors.price}
                                step="100"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.price}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formRoomNote">
                            <Form.Label className="text-muted"> Note </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter note"
                                name="note"
                                value={newRoom.note}
                                onChange={handleInputChange}
                                isInvalid={!!errors.note}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.note}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={handleAddRoom}>
                        {editingRoom ? 'Update Room' : 'Add Room'}
                    </Button>

                    {duplicateError && (
                        <div className="alert alert-danger" role="alert">
                            {duplicateError}
                        </div>
                    )}
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default RoomList;
