import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Form, InputGroup, DropdownButton, Dropdown, Offcanvas } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllRooms } from '../../service/apiServices';


function RoomList() {
    const [rooms, setRooms] = useState([]);
    const [totalRooms, setTotalRooms] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState(null); //
    const [pageInput, setPageInput] = useState(currentPage); // Input để người dùng nhập



    const handlePagination = useCallback((totalRooms) => {
        setTotalRooms(totalRooms);
        setTotalPages(Math.ceil(totalRooms / rowsPerPage));
    }, [rowsPerPage]);


    const fetchListRoom = useCallback(async () => {
        try {
            const queryParams = {
                search: search.trim(),
                sort: sortField,
                limit: rowsPerPage,
                page: currentPage,
            };
            const res = await getAllRooms(queryParams);
            if (res && res.data && res.data.data) {
                setRooms(res.data.data);
                handlePagination(res.data.total);
            }
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
    }, [search, sortField, rowsPerPage, currentPage, handlePagination]);

    useEffect(() => {
        fetchListRoom();

    }, [fetchListRoom]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleRowsPerPageChange = (value) => {
        setRowsPerPage(Number(value));
        setCurrentPage(1); // Reset về trang 1 khi thay đổi số dòng trên 1 trang
    };

    const handlePageChange = (type) => {
        if (type === 'prev') {
            setCurrentPage((prev) => prev - 1);
        } else {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handleSort = (field, order) => {
        setSortField(order === 'asc' ? field : `-${field}`);
    };

    const handlePageInput = (e) => {
        setPageInput(e.target.value);
    };

    const handleGoToPage = () => {
        const page = parseInt(pageInput, 10);
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        } else {
            toast.error("Invalid page number!", { autoClose: 2000 });
            setPageInput(currentPage); // Reset input về trang hiện tại nếu không hợp lệ
        }
    };

    useEffect(() => {
        setPageInput(currentPage); // Đồng bộ input khi thay đổi trang
    }, [currentPage]);


    const [showModal, setShowModal] = useState(false);
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


    const handleEditClick = (room) => {
        setEditingRoom(room);
        setNewRoom(room);
        setShowModal(true);
    };

    // const filteredRooms = rooms
    //     .filter((room) => {
    //         if (!searchField || !room[searchField]) return true; // Nếu trường tìm kiếm không tồn tại
    //         return room[searchField]?.toString().toLowerCase().includes(search.toLowerCase());
    //     })
    //     .sort((a, b) => {
    //         const activeColumn = Object.keys(sortState).find((key) => sortState[key].active);

    //         if (!activeColumn) return 0; // Không có cột nào được chọn để sắp xếp

    //         const sortOrder = sortState[activeColumn]?.order;

    //         if (activeColumn === 'price' && a.roomTypeId?.price !== undefined && b.roomTypeId?.price !== undefined) {
    //             return sortOrder === 'asc' ? a.roomTypeId.price - b.roomTypeId.price : b.roomTypeId.price - a.roomTypeId.price;
    //         }
    //         return 0;
    //     });

    // // Xử lý phân trang
    // const startIdx = (currentPage - 1) * rowsPerPage;
    // const paginatedRooms = filteredRooms.slice(startIdx, startIdx + rowsPerPage);


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
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '5%' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>Room Name
                                <button
                                    onClick={() => handleSort('roomName', 'asc')}
                                    className="ml-1 text-l"
                                >
                                    ▲
                                </button>
                                <button
                                    onClick={() => handleSort('roomName', 'desc')}
                                    className=" text-l"
                                >
                                    ▼
                                </button>
                            </th>
                            <th>Room Type</th>
                            <th>
                                Room Price
                                <button
                                    onClick={() => handleSort('roomTypeId.price', 'asc')}
                                    className="ml-1 text-l"
                                >
                                    ▲
                                </button>
                                <button
                                    onClick={() => handleSort('roomTypeId.price', 'desc')}
                                    className=" text-l"
                                >
                                    ▼
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
                <div className="flex items-center justify-end gap-3">
                    <Button variant="dark"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange('prev')}>
                        Previous
                    </Button>
                    <span>Page </span>
                    <input
                        type="number"
                        value={pageInput}
                        onChange={handlePageInput}
                        className="text-center px-1 py-2 text-sm rounded-md border border-gray-500 w-12"
                        onKeyPress={(e) => e.key === "Enter" && handleGoToPage()}
                        onBlur={handleGoToPage}
                    />
                    <span> of {Math.ceil(totalRooms / rowsPerPage)}</span>
                    <Button variant="dark"
                        disabled={currentPage === totalPages}
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