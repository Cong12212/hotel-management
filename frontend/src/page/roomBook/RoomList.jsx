import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Form, InputGroup, DropdownButton, Dropdown, Offcanvas } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getAllRooms} from '../../service/apiServices';


function RoomList() {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        fetchListRoom();
    }, [])

    const fetchListRoom = async () => {
        try {
            console.log("Fetching rooms...");
            let res = await getAllRooms();
            console.log("Response:", res);
    
            // Kiểm tra nếu res hoặc res.data là null
            if (res && res.data && res.data.data) {
                setRooms(res.data.data);
            } else {
                console.error("No data found in the response.");
            }
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
    };

    useEffect(() => {
        console.log("Rooms updated:", rooms);

    }, [rooms]);
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
        toast.success('Room deleted successfully', { autoClose: 2000 });
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

    const handleModalClose = () => {
        setShowModal(false);
        setEditingRoom(null);
        setNewRoom({ name: '', type: '', price: '', note: '' });
        setErrors({});
        setDuplicateError('');
    };
    const handleModalShow = () => setShowModal(true);

    const handleAddRoom = () => {
        setDuplicateError('');

        if (editingRoom && newRoom.name === editingRoom.name && newRoom.type === editingRoom.type && newRoom.price === editingRoom.price && newRoom.note === editingRoom.note) {
            toast.info("No changes were made.", { autoClose: 2000 });
            handleModalClose();
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
                toast.error('Room with this name already exists.', { autoClose: 2000 });
                return;
            }

            if (editingRoom) {
                setRooms(
                    rooms.map((room) =>
                        room.id === editingRoom.id ? { ...editingRoom, ...newRoom, price: Number(newRoom.price) } : room
                    )
                );
                toast.success('Room updated successfully', { autoClose: 1000 });
            } else {
                const newRoomId = findMissingId();
                setRooms([...rooms, { ...newRoom, id: newRoomId, price: Number(newRoom.price) }]);
                toast.success('Room added successfully', { autoClose: 2000 });
            }
            setEditingRoom(null);
            setNewRoom({ name: '', type: '', price: '', note: '' });
            setShowModal(false);
        }
    };

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
        .filter((room) => {
            if (!searchField || !room[searchField]) return true; // Nếu trường tìm kiếm không tồn tại
            return room[searchField]?.toString().toLowerCase().includes(search.toLowerCase());
        })
        .sort((a, b) => {
            const activeColumn = Object.keys(sortState).find((key) => sortState[key].active);
            
            if (!activeColumn) return 0; // Không có cột nào được chọn để sắp xếp

            const sortOrder = sortState[activeColumn]?.order;
            
            if (activeColumn === 'price' && a.roomTypeId?.price !== undefined && b.roomTypeId?.price !== undefined) {
                return sortOrder === 'asc' ? a.roomTypeId.price - b.roomTypeId.price : b.roomTypeId.price - a.roomTypeId.price;
            }
            return 0;
        });

    // Xử lý phân trang
    const startIdx = (currentPage - 1) * rowsPerPage;
    const paginatedRooms = filteredRooms.slice(startIdx, startIdx + rowsPerPage);
    
   
    return (
        <div className="pt-16 pb-8 pr-8 mt-2 ">
            <ToastContainer />
            <div className="flex items-center mb-3 justify-between">
                <h2 className="font-bold text-3xl font-sans">Room List</h2>
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

                <Table className="text-center" bordered-y="true" hover>
                    <colgroup>
                        <col style={{ width: '10%' }} />
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
                        {rooms.map((room, index) => (
                            <tr key={room._id}>
                                <td className="align-middle">{index + 1}</td>
                                <td className="align-middle">{room.roomName}</td>
                                <td className="align-middle">{room.roomTypeId.name}</td>
                                <td className="align-middle">{room.roomTypeId.price}</td>
                                <td className="align-middle">{new Date(room.createdAt).toLocaleString()}</td>
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
            <Offcanvas show={showModal} onHide={handleModalClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{editingRoom ? 'Update Room' : 'Add Room'}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
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
                </Offcanvas.Body>
                <div className="offcanvas-footer flex-row justify-between gap-8">
                    <div className="flex justify-between gap-8 p-3">
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                        <Button variant="dark" onClick={handleAddRoom}>
                            {editingRoom ? 'Save changes' : 'Add Room'}
                        </Button>
                    </div>
                </div>
            </Offcanvas>
        </div>
    );
}

export default RoomList;