import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import hook để điều hướng

const BookingList = () => {
    const navigate = useNavigate(); // Khởi tạo hook navigate

    const bookings = [
        { name: 'Frank Baker', roomType: 'Single', checkIn: '12/03/2024', checkOut: '13/03/2024', paidAmount: 0, dueAmount: 230, paymentStatus: 'Pending' },
        { name: 'Phil Glover', roomType: 'Studio', checkIn: '12/03/2024', checkOut: '21/03/2024', paidAmount: 0, dueAmount: 4450, paymentStatus: 'Pending' },
        { name: 'Rya Randall', roomType: 'Deluxe', checkIn: '12/03/2024', checkOut: '24/03/2024', paidAmount: 0, dueAmount: 430, paymentStatus: 'Pending' },
        { name: 'Sally Graham', roomType: 'Queen', checkIn: '12/03/2024', checkOut: '17/03/2024', paidAmount: 1550, dueAmount: 0, paymentStatus: 'Success' },
        { name: 'Victor Rampling', roomType: 'Junior Suite', checkIn: '12/03/2024', checkOut: '15/03/2024', paidAmount: 0, dueAmount: 530, paymentStatus: 'Pending' },
        { name: 'Robert Anderson', roomType: 'Cabana', checkIn: '03/05/2021', checkOut: '10/07/2021', paidAmount: 0, dueAmount: 1780, paymentStatus: 'Pending' },
        { name: 'Ryan Stewart', roomType: 'Connecting', checkIn: '10/07/2021', checkOut: '18/08/2021', paidAmount: 0, dueAmount: 1230, paymentStatus: 'Pending' },
        { name: 'Joan Dyer', roomType: 'Queen', checkIn: '12/03/2021', checkOut: '14/03/2021', paidAmount: 0, dueAmount: 2230, paymentStatus: 'Pending' },
        { name: 'Liam Berry', roomType: 'King', checkIn: '11/04/2021', checkOut: '12/04/2021', paidAmount: 0, dueAmount: 400, paymentStatus: 'Pending' },
        { name: 'Dean Otto', roomType: 'Quad', checkIn: '11/04/2021', checkOut: '12/04/2021', paidAmount: 0, dueAmount: 950, paymentStatus: 'Success' },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen mt-8"> {/* Thêm margin-top */}
            {/* Tiêu đề và nút Room Book */}
            <div className="flex justify-between items-center mb-6 mt-4">
                <h1 className="text-xl font-semibold text-gray-800">Room Booking List</h1>
                <button
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                    onClick={() => navigate('/room-book')} // Điều hướng sang RoomBookingForm
                >
                    Room Book
                </button>
            </div>

            {/* Bảng */}
            <table className="table-auto w-full border border-gray-300 bg-white shadow-md rounded-lg text-sm">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left text-gray-600">Name</th>
                        <th className="px-4 py-2 text-left text-gray-600">Room Type</th>
                        <th className="px-4 py-2 text-left text-gray-600">Check In</th>
                        <th className="px-4 py-2 text-left text-gray-600">Check Out</th>
                        <th className="px-4 py-2 text-left text-gray-600">Paid Amount</th>
                        <th className="px-4 py-2 text-left text-gray-600">Due Amount</th>
                        <th className="px-4 py-2 text-left text-gray-600">Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                            <td className="px-4 py-2">{booking.name}</td>
                            <td className="px-4 py-2">{booking.roomType}</td>
                            <td className="px-4 py-2">{booking.checkIn}</td>
                            <td className="px-4 py-2">{booking.checkOut}</td>
                            <td className="px-4 py-2">${booking.paidAmount.toFixed(2)}</td>
                            <td className="px-4 py-2">${booking.dueAmount.toFixed(2)}</td>
                            <td className="px-4 py-2">
                                <span
                                    className={`px-2 py-1 rounded-lg text-white ${
                                        booking.paymentStatus === 'Success'
                                            ? 'bg-green-500'
                                            : 'bg-yellow-500'
                                    } text-xs`}
                                >
                                    {booking.paymentStatus}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingList;
