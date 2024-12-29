// <<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllBookings } from '../../service/apiServices';
import { useNavigate } from 'react-router-dom';

const BookingList = () => {
    const navigate = useNavigate();
    const [expandedRow, setExpandedRow] = useState(null);

    const [bookings, setBookings] = useState([]);
    const [totalBookings, setTotalBookings] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState(null); //
    const [pageInput, setPageInput] = useState(currentPage); // Input để người dùng nhập

    const toggleDetails = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };
    const handlePagination = useCallback((totalBookings) => {
        setTotalBookings(totalBookings);
        setTotalPages(Math.ceil(totalBookings / rowsPerPage));
    }, [rowsPerPage]);

    const fetchListBooking = useCallback(async () => {
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
                const combinedData = data.map((booking, index) => ({
                    id: booking._id, // Sequential ID
                    index: index + 1,
                    status: booking.status,
                    customers: booking.customerIds.map(c => c.fullName).join('\n'),
                    bookingDetails: booking.bookingDetails,
                    employee: booking.userId.username,
                    date: new Date(booking.createdAt).toLocaleString('vi-VN', { timeZone: 'UTC' }),
                }));
                setBookings(combinedData);
                handlePagination(res.data.total);

            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    }, [search, sortField, rowsPerPage, currentPage, handlePagination]);

    useEffect(() => {
        fetchListBooking();
    }, [fetchListBooking]);

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


    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setNewRoom((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };


    // const handleAddRoom = async () => {

    //     try {
    //         const requiredFields = ['roomName', 'roomTypeId', 'status'];
    //         const fieldsToCompare = ['roomName', 'status', 'notes'];

    //         const fieldNamesMap = {
    //             roomName: "Room Name",
    //             status: "Status",
    //             roomTypeId: "Room Type",
    //         };

    //         let isRoomChanged = true;
    //         const emptyFields = requiredFields.filter((field) => !newRoom[field] || newRoom[field].trim() === '');

    //         if (emptyFields.length > 0) {
    //             const readableFieldNames = emptyFields.map((field) => fieldNamesMap[field]);
    //             toast.error(`The following fields are required: ${readableFieldNames.join(', ')}`, { autoClose: 2000 });
    //         }
    //         let res;
    //         if (editingRoom) {
    //             isRoomChanged = fieldsToCompare.some(
    //                 (field) => newRoom[field] !== editingRoom[field]
    //             ) || newRoom.roomTypeId !== editingRoom.roomTypeId._id;
    //             if (!isRoomChanged) {
    //                 toast.info('No changes detected.', { autoClose: 2000 });

    //             } else {
    //                 res = await patchUpdateRoom({ ...newRoom, id: editingRoom._id });
    //             }
    //         } else {
    //             res = await postAddRoom(newRoom);
    //             if (res.error && res.error.error.toLowerCase().includes('already exists')) {
    //                 toast.error('Room already exists. Please use a different name.', { autoClose: 2000 });
    //             }
    //         }
    //         if (res.success) {
    //             toast.success(`${editingRoom ? 'Room updated' : 'Room added'} successfully!`, { autoClose: 2000 });
    //             fetchListBooking();
    //             handleModalClose();

    //         } else {
    //             toast.error(res.error || 'Operation failed', { autoClose: 2000 });
    //         }
    //     } catch (error) {
    //         toast.error('Error while saving room', { autoClose: 2000 });
    //         console.error(error);
    //     }
    // };

    // const handleEditClick = (room) => {
    //     setEditingRoom(room);
    //     setNewRoom({
    //         roomName: room.roomName,
    //         roomTypeId: room.roomTypeId,
    //         status: room.roomTypeId,
    //         notes: room.notes || '',
    //     });
    //     setShowModal(true);
    // };

    // const handleDelete = async (id) => {
    //     if (window.confirm('Are you sure you want to delete this room?')) {
    //         const res = await delDeleteRoom(id);
    //         if (res.success) {
    //             toast.success('Room deleted successfully!');
    //             fetchListBooking();
    //         } else {
    //             toast.error(res.error || 'Failed to delete room');
    //         }
    //     }
    // };


    // const handleModalClose = () => {
    //     setShowModal(false);
    //     setEditingRoom(null);
    //     setNewRoom({ roomName: '', roomTypeId: '', status: '', notes: '' });
    //     setErrors({});
    // };

    // const handleModalShow = () => setShowModal(true);


    return (
        <div className="pt-16 pb-8 pr-8 mt-2 ">
            <ToastContainer />
            <div className="flex items-center mb-3 justify-between">
                <h2 className="font-bold text-3xl font-sans">Booking List</h2>
                <Button variant="dark" onClick={() => navigate('/room-book')}>Add Booking</Button>
            </div>

            <div className="bg-white font-dm-sans rounded-md shadow-sm p-3">
                <div className="flex justify-between">
                    <div className="d-flex items-center">
                        <InputGroup>
                            <input
                                placeholder="Search"
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
                            {[5, 10, 25, 50].map((value) => (
                                <Dropdown.Item eventKey={value} key={value}>
                                    {value} rows
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>

                </div>

                <Table className="text-center align-middle" bordered-y="true" hover>
                    <colgroup>
                        <col style={{ width: '5%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '5%' }} />
                        <col style={{ width: '10%' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>Customers</th>
                            <th>User

                            </th>
                            <th>Number of Rooms</th>    
                            <th>
                                Date

                            </th>
                            <th>Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings &&
                            bookings.length > 0 &&
                            bookings.map((booking) =>
                                <React.Fragment key={booking.id}>
                                    <tr key={`${booking.id}`}>
                                        <td className="py-3">{booking.index}</td>
                                        <td>
                                            {booking.customers.split("\n").map((name, idx) => (
                                                <div key={idx}>{name}</div>
                                            ))}
                                        </td>
                                        <td className="py-3">{booking.employee}</td>
                                        <td className="py-3">{booking.bookingDetails?.length}</td>
                                        <td className="py-3">{booking.date}</td>
                                        <td className="py-3">
                                        <span
                                        className={`px-2 py-2 font-medium rounded-lg text-white ${booking.status === 'completed'
                                            ? 'bg-green-600'
                                            : booking.status === 'confirmed'
                                                ? 'bg-amber-600'
                                                : booking.status === 'cancelled'
                                                    ? 'bg-red-600'
                                                    : 'bg-blue-600'
                                            }`}
                                    >
                                        {booking.status}
                                    </span>
                                        </td>
                                        <td>
                                            <Button
                                                variant="link"
                                                className="p-0 text-decoration-none"
                                                onClick={() => toggleDetails(booking.id)}
                                            >
                                                {expandedRow === booking.id ? "Hide Details" : "Show Details"}
                                            </Button>
                                        </td>
                                    </tr>
                                    {expandedRow === booking.id && (
                                        <tr>
                                            <td colSpan="7" className='p-0'>
                                                <div className="p-3 bg-white shadow-md">
                                                    <Table bordered-y="true" className="text-center align-middle mb-10">
                                                        <colgroup>
                                                            <col style={{ width: '5%' }} />
                                                            <col style={{ width: '20%' }} />
                                                            <col style={{ width: '20%' }} />
                                                            <col style={{ width: '20%' }} />
                                                            <col style={{ width: '20%' }} />
                                                            <col style={{ width: '20%' }} />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>ID</th>
                                                                <th>Room Name</th>
                                                                <th>Room Price</th>
                                                                <th>Number of Guests</th>
                                                                <th>CheckIn Date</th>
                                                                <th>CheckOut Date</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {booking.bookingDetails.map((detail, index) => (
                                                                <tr key={detail._id}>
                                                                    <td className="py-3">{index + 1}</td>
                                                                    <td className="py-3">{detail.roomId.roomName}</td>
                                                                    <td className="py-3">{detail.roomPrice.toLocaleString("en-US")} VND</td>
                                                                    <td className="py-3">{detail.numberOfGuests}</td>
                                                                    <td className="py-3">{new Date(detail.checkInDate).toLocaleString('vi-VN', { timeZone: 'UTC' })}</td>
                                                                    <td className="py-3">{new Date(detail.checkOutDate).toLocaleString('vi-VN', { timeZone: 'UTC' })}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            )
                        }
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
