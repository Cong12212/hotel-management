import React, { useState } from "react";


const RoomBookingForm = () => {
    const [roomNumber, setRoomNumber] = useState("");
    const [startDate, setStartDate] = useState("");
    const [customers, setCustomers] = useState([
        { id: 1, name: "", customerType: "Local", idNumber: "", address: "" },
    ]);

    // Thêm khách hàng vào bảng
    const handleAddCustomer = () => {
        setCustomers([
            ...customers,
            {
                id: customers.length + 1,
                name: "",
                customerType: "Local",
                idNumber: "",
                address: "",
            },
        ]);
    };

    // Xóa khách hàng khỏi bảng
    const handleRemoveCustomer = (id) => {
        setCustomers(customers.filter((customer) => customer.id !== id));
    };

    // Cập nhật thông tin khách hàng
    const handleCustomerChange = (id, field, value) => {
        setCustomers(
            customers.map((customer) =>
                customer.id === id ? { ...customer, [field]: value } : customer
            )
        );
    };

    // Xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Room Number:", roomNumber);
        console.log("Start Date:", startDate);
        console.log("Customer List:", customers);
        alert("Form submitted successfully!");
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Tiêu đề */}
            <h1 className="text-xl font-semibold text-gray-800 mb-6">
                Room Booking Form
            </h1>

            {/* Form nhập thông tin */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow-md rounded-lg border border-gray-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nhập số phòng */}
                    <div>
                        <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">
                            Room Number
                        </label>
                        <input
                            type="text"
                            id="roomNumber"
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                            placeholder="Enter room number"
                        />
                    </div>

                    {/* Ngày bắt đầu thuê */}
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                        />
                    </div>
                </div>

                {/* Bảng danh sách khách hàng */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Customer List
                    </h2>
                    <table className="table-auto w-full border border-gray-300 bg-white shadow-md rounded-lg text-sm">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border text-left">STT</th>
                                <th className="px-4 py-2 border text-left">Name</th>
                                <th className="px-4 py-2 border text-left">Customer Type</th>
                                <th className="px-4 py-2 border text-left">ID/Passport</th>
                                <th className="px-4 py-2 border text-left">Address</th>
                                <th className="px-4 py-2 border text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer, index) => (
                                <tr key={customer.id} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-2 border">{index + 1}</td>
                                    <td className="px-4 py-2 border">
                                        <input
                                            type="text"
                                            value={customer.name}
                                            onChange={(e) =>
                                                handleCustomerChange(customer.id, "name", e.target.value)
                                            }
                                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                                            placeholder="Enter name"
                                        />
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <select
                                            value={customer.customerType}
                                            onChange={(e) =>
                                                handleCustomerChange(customer.id, "customerType", e.target.value)
                                            }
                                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                                        >
                                            <option value="Local">Local</option>
                                            <option value="Foreign">Foreign</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <input
                                            type="text"
                                            value={customer.idNumber}
                                            onChange={(e) =>
                                                handleCustomerChange(customer.id, "idNumber", e.target.value)
                                            }
                                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                                            placeholder="Enter ID/Passport"
                                        />
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <input
                                            type="text"
                                            value={customer.address}
                                            onChange={(e) =>
                                                handleCustomerChange(customer.id, "address", e.target.value)
                                            }
                                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                                            placeholder="Enter address"
                                        />
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveCustomer(customer.id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Thêm khách hàng */}
                <div className="mt-4">
                    <button
                        type="button"
                        onClick={handleAddCustomer}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                    >
                        Add Customer
                    </button>
                </div>

                {/* Nút Submit */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                    >
                        Submit Booking
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RoomBookingForm;
