// <<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Form, InputGroup, DropdownButton, Dropdown, Offcanvas } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllBookings, postAddRoom, patchUpdateRoom, delDeleteRoom, getAllRoomTypes } from '../../service/apiServices';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [roomtypes, setRoomTypes] = useState([]);
    const [totalBookings, setTotalBookings] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState(null); //
    const [pageInput, setPageInput] = useState(currentPage); // Input để người dùng nhập
    const [showModal, setShowModal] = useState(false);
    const [newRoom, setNewRoom] = useState({ roomName: '', roomTypeId: '', status: '', notes: '' });
    const [editingRoom, setEditingRoom] = useState(null);
    const [errors, setErrors] = useState({});


    const handlePagination = useCallback((totalBookings) => {
        setTotalBookings(totalBookings);
        setTotalPages(Math.ceil(totalBookings / rowsPerPage));
    }, [rowsPerPage]);

    const fetchListBooking = async () => {
        try {
            const queryParams = {
                search: search?.trim(),
                sort: sortField,
                limit: rowsPerPage,
                page: currentPage,
            };

            const res = await getAllBookings(queryParams);

            if (res && res.data && res.data.data) {
                const data = res.data.data;
                const combinedData = data.map((booking) => ({
                    id: booking._id, // Sequential ID
                    details: booking.bookingDetails.map((detail) => ({
                        bookingId: detail._id,
                        roomName: detail.roomId.roomName,
                        roomType: detail.roomId.roomTypeId,
                        numberOfGuests: detail.numberOfGuests,
                        checkInDate: new Date(detail.checkInDate).toLocaleString('vi-VN', { timeZone: 'UTC' }),
                        checkOutDate: new Date(detail.checkOutDate).toLocaleString('vi-VN', { timeZone: 'UTC' }),
                    }))
                }));
                if (JSON.stringify(combinedData) !== JSON.stringify(bookings)) {
                    setBookings(combinedData);
                    handlePagination(res.data.count);
                }
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const fetchListRoomTypes = useCallback(async () => {
        try {
            const queryParams = {
                search: search.trim(),
                sort: sortField,
                limit: rowsPerPage,
                page: currentPage,

            };
            const res = await getAllRoomTypes(queryParams);
            if (res && res.data && res.data.data) {

                setRoomTypes(res.data.data);
                handlePagination(res.data.count);

            }
        } catch (error) {
            console.error("Error fetching roomtypes:", error);
        }
    }, [search, sortField, rowsPerPage, currentPage, handlePagination]);


    useEffect(() => {
        fetchListBooking();
    }, [search, sortField, rowsPerPage, currentPage]);

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


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRoom((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleAddRoom = async () => {

        try {
            const requiredFields = ['roomName', 'roomTypeId', 'status'];
            const fieldsToCompare = ['roomName', 'status', 'notes'];

            const fieldNamesMap = {
                roomName: "Room Name",
                status: "Status",
                roomTypeId: "Room Type",
            };

            let isRoomChanged = true;
            const emptyFields = requiredFields.filter((field) => !newRoom[field] || newRoom[field].trim() === '');

            if (emptyFields.length > 0) {
                const readableFieldNames = emptyFields.map((field) => fieldNamesMap[field]);
                toast.error(`The following fields are required: ${readableFieldNames.join(', ')}`, { autoClose: 2000 });
            }
            let res;
            if (editingRoom) {
                isRoomChanged = fieldsToCompare.some(
                    (field) => newRoom[field] !== editingRoom[field]
                ) || newRoom.roomTypeId !== editingRoom.roomTypeId._id;
                if (!isRoomChanged) {
                    toast.info('No changes detected.', { autoClose: 2000 });

                } else {
                    res = await patchUpdateRoom({ ...newRoom, id: editingRoom._id });
                }
            } else {
                res = await postAddRoom(newRoom);
                if (res.error && res.error.error.toLowerCase().includes('already exists')) {
                    toast.error('Room already exists. Please use a different name.', { autoClose: 2000 });
                }
            }
            if (res.success) {
                toast.success(`${editingRoom ? 'Room updated' : 'Room added'} successfully!`, { autoClose: 2000 });
                fetchListBooking();
                handleModalClose();

            } else {
                toast.error(res.error || 'Operation failed', { autoClose: 2000 });
            }
        } catch (error) {
            toast.error('Error while saving room', { autoClose: 2000 });
            console.error(error);
        }
    };

    const handleEditClick = (room) => {
        setEditingRoom(room);
        setNewRoom({
            roomName: room.roomName,
            roomTypeId: room.roomTypeId,
            status: room.roomTypeId,
            notes: room.notes || '',
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            const res = await delDeleteRoom(id);
            if (res.success) {
                toast.success('Room deleted successfully!');
                fetchListBooking();
            } else {
                toast.error(res.error || 'Failed to delete room');
            }
        }
    };


    const handleModalClose = () => {
        setShowModal(false);
        setEditingRoom(null);
        setNewRoom({ roomName: '', roomTypeId: '', status: '', notes: '' });
        setErrors({});
    };

    const handleModalShow = () => setShowModal(true);


    return (
        <div className="pt-16 pb-8 pr-8 mt-2 ">
            <ToastContainer />
            <div className="flex items-center mb-3 justify-between">
                <h2 className="font-bold text-3xl font-sans">Booking List</h2>
                <Button variant="dark" onClick={handleModalShow}>Add Booking</Button>
            </div>

            <div className="bg-white font-dm-sans rounded-md shadow-sm p-3">
                <div className="flex justify-between">
                    <div className="d-flex items-center">
                        {/* <Button
                                variant="outline-secondary"
                                onClick={() => {
                                    setSearch('');
                                    setSearchField('');
                                    setCurrentPage(1);
                                }}
                                className="btn btn-outline-danger mr-2"
                            >
                                Clear
                            </Button>
                            <DropdownButton
                                id="dropdownSearch"
                                title={`Search by: ${searchField ? (searchField === 'roomName' ? 'Room Name' : 'Room Type') : 'Select a field'}`}
                                onSelect={(field) => setSearchField(field)}
                                variant="outline-secondary"
                                className="mr-3"
                            >
                                <Dropdown.Item eventKey="roomName">Room Name</Dropdown.Item>
                                <Dropdown.Item eventKey="roomTypeId.name">Room Type</Dropdown.Item>
                            </DropdownButton> */}
                        <InputGroup>
                            <input
                                placeholder="Search" //{/*`Enter ${searchField ? (searchField === 'roomName' ? 'Room Name' : 'Room Type') : ''}`*/}
                                className="outline-none focus:outline-dashed focus:outline-2 focus:outline-violet-500 border border-gray-300 rounded-md p-2"
                                value={search}
                                onChange={handleSearch}
                                type="text"
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

                <Table className="text-center align-middle" bordered-y="true" hover>
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

                            </th>
                            <th>
                                Number of Guests

                            </th>
                            <th>Check in date</th>
                            <th>Check out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings &&
                            bookings.length > 0 &&
                            bookings.map((booking, index) =>
                                booking.details.map((detail, detailIndex) => (
                                    <tr key={`${booking.id}-${detailIndex}`}>
                                        <td>{index + 1}</td>
                                        <td>{detail.roomName}</td>
                                        <td>{detail.numberOfGuests}</td>
                                        <td>{detail.checkInDate}</td>
                                        <td>{detail.checkOutDate}</td>
                                    </tr>
                                ))
                            )}

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
                    <span> of {Math.ceil(totalBookings / rowsPerPage)}</span>

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
                                name="roomName"
                                value={newRoom.roomName}
                                onChange={handleInputChange}
                                isInvalid={!!errors.roomName}
                                className="mb-3"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.roomName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formRoomType">
                            <Form.Label className="text-muted">
                                Room Type <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Form.Select
                                name="roomTypeId"
                                value={newRoom.roomTypeId}
                                onChange={handleInputChange}
                                isInvalid={!!errors.roomTypeId}
                                className="mb-3"
                            >
                                <option value="">Select room type</option>
                                {roomtypes.map((type) => (
                                    <option key={type._id} value={type._id}>
                                        {type.name}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.roomTypeId}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formRoomStatus">
                            <Form.Label className="text-muted">
                                Status <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Form.Select
                                placeholder="Select room status"
                                name="status"
                                value={newRoom.status}
                                onChange={handleInputChange}
                                isInvalid={!!errors.status}
                                className="mb-3"
                            >
                                <option value="">Select room status</option>
                                <>
                                    <option>
                                        available
                                    </option>
                                    <option>
                                        occupied
                                    </option>
                                    <option>
                                        maintenance
                                    </option>
                                </>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.status}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formRoomNote">
                            <Form.Label className="text-muted"> Note </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter note"
                                name="notes"
                                value={newRoom.notes}
                                onChange={handleInputChange}
                                isInvalid={!!errors.notes}
                                className="mb-3"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.notes}
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
// =======
// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Import hook để điều hướng

// const BookingList = () => {
//     const navigate = useNavigate(); // Khởi tạo hook navigate

//     const bookings = [
//         { name: 'Frank Baker', roomType: 'Single', checkIn: '12/03/2024', checkOut: '13/03/2024', paidAmount: 0, dueAmount: 230, paymentStatus: 'Pending' },
//         { name: 'Phil Glover', roomType: 'Studio', checkIn: '12/03/2024', checkOut: '21/03/2024', paidAmount: 0, dueAmount: 4450, paymentStatus: 'Pending' },
//         { name: 'Rya Randall', roomType: 'Deluxe', checkIn: '12/03/2024', checkOut: '24/03/2024', paidAmount: 0, dueAmount: 430, paymentStatus: 'Pending' },
//         { name: 'Sally Graham', roomType: 'Queen', checkIn: '12/03/2024', checkOut: '17/03/2024', paidAmount: 1550, dueAmount: 0, paymentStatus: 'Success' },
//         { name: 'Victor Rampling', roomType: 'Junior Suite', checkIn: '12/03/2024', checkOut: '15/03/2024', paidAmount: 0, dueAmount: 530, paymentStatus: 'Pending' },
//         { name: 'Robert Anderson', roomType: 'Cabana', checkIn: '03/05/2021', checkOut: '10/07/2021', paidAmount: 0, dueAmount: 1780, paymentStatus: 'Pending' },
//         { name: 'Ryan Stewart', roomType: 'Connecting', checkIn: '10/07/2021', checkOut: '18/08/2021', paidAmount: 0, dueAmount: 1230, paymentStatus: 'Pending' },
//         { name: 'Joan Dyer', roomType: 'Queen', checkIn: '12/03/2021', checkOut: '14/03/2021', paidAmount: 0, dueAmount: 2230, paymentStatus: 'Pending' },
//         { name: 'Liam Berry', roomType: 'King', checkIn: '11/04/2021', checkOut: '12/04/2021', paidAmount: 0, dueAmount: 400, paymentStatus: 'Pending' },
//         { name: 'Dean Otto', roomType: 'Quad', checkIn: '11/04/2021', checkOut: '12/04/2021', paidAmount: 0, dueAmount: 950, paymentStatus: 'Success' },
//     ];

//     return (
//         <div className="p-6 bg-gray-50 min-h-screen mt-8"> {/* Thêm margin-top */}
//             {/* Tiêu đề và nút Room Book */}
//             <div className="flex justify-between items-center mb-6 mt-4">
//                 <h1 className="text-xl font-semibold text-gray-800">Room Booking List</h1>
//                 <button
//                     className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
//                     onClick={() => navigate('/room-book')} // Điều hướng sang RoomBookingForm
//                 >
//                     Room Book
//                 </button>
//             </div>

//             {/* Bảng */}
//             <table className="table-auto w-full border border-gray-300 bg-white shadow-md rounded-lg text-sm">
//                 <thead>
//                     <tr className="bg-gray-200">
//                         <th className="px-4 py-2 text-left text-gray-600">Name</th>
//                         <th className="px-4 py-2 text-left text-gray-600">Room Type</th>
//                         <th className="px-4 py-2 text-left text-gray-600">Check In</th>
//                         <th className="px-4 py-2 text-left text-gray-600">Check Out</th>
//                         <th className="px-4 py-2 text-left text-gray-600">Paid Amount</th>
//                         <th className="px-4 py-2 text-left text-gray-600">Due Amount</th>
//                         <th className="px-4 py-2 text-left text-gray-600">Payment Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {bookings.map((booking, index) => (
//                         <tr key={index} className="border-b hover:bg-gray-100">
//                             <td className="px-4 py-2">{booking.name}</td>
//                             <td className="px-4 py-2">{booking.roomType}</td>
//                             <td className="px-4 py-2">{booking.checkIn}</td>
//                             <td className="px-4 py-2">{booking.checkOut}</td>
//                             <td className="px-4 py-2">${booking.paidAmount.toFixed(2)}</td>
//                             <td className="px-4 py-2">${booking.dueAmount.toFixed(2)}</td>
//                             <td className="px-4 py-2">
//                                 <span
//                                     className={`px-2 py-1 rounded-lg text-white ${
//                                         booking.paymentStatus === 'Success'
//                                             ? 'bg-green-500'
//                                             : 'bg-yellow-500'
//                                     } text-xs`}
//                                 >
//                                     {booking.paymentStatus}
//                                 </span>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
// >>>>>>> 86a83126c1f22df9b1930512a525127ecaf35ea3

export default BookingList;
