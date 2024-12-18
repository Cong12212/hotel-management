import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RoomCheckout = () => {
    const bills = [
        {
            customer: {
                name: "Hau",
                email: "caubengaytho@gmail.com",
                mobile: "+84 859987184",
                address: "346B, Nguyen Dinh Chieu Street, Tan An city, Long An province",
                customerType: "Inland",
            },
            billDetails: [
                {
                    no: "1",
                    roomID: "A102",
                    roomType: "A",
                    rentdays: "3",
                    customersinroom: "2",
                    coefficient: "1",
                    surcharge: "25%",
                    startdate: "2024-12-16",
                    priceperday: "150.000 VNĐ",
                    Total: "562.000 VNĐ",
                },
                {
                    no: "2",
                    roomID: "B205",
                    roomType: "B",
                    rentdays: "2",
                    customersinroom: "2",
                    coefficient: "1",
                    surcharge: "0",
                    startdate: "2024-12-18",
                    priceperday: "200.000 VNĐ",
                    Total: "400.000 VNĐ",
                },
                {
                    no: "3",
                    roomID: "A206",
                    roomType: "A",
                    rentdays: "1",
                    customersinroom: "2",
                    coefficient: "1",
                    surcharge: "0",
                    startdate: "2024-12-18",
                    priceperday: "150.000 VNĐ",
                    Total: "150.000 VNĐ",
                },
            ],
        },
    ];

    const [roomID, setRoomID] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [error, setError] = useState("");
    const [foundBill, setFoundBill] = useState(null);
    const [successMessage, setSuccessMessage] = useState(""); // Thêm state mới

    const handleSearch = () => {
        setError("");
        setFoundBill(null);
        setSuccessMessage(""); // Xóa thông báo thành công khi tìm kiếm mới

        const bill = bills.find(bill => 
            bill.billDetails.some(detail => detail.roomID === roomID && bill.customer.name === customerName)
        );

        if (bill) {
            setFoundBill(bill);
        } else {
            setError("Customer not found in the specified room.");
        }
    };

    const handleCheckout = () => {
        setSuccessMessage("Checkout success"); // Cập nhật thông báo thành công
        setFoundBill(null); // Quay về trạng thái ban đầu
        setRoomID("");
        setCustomerName("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="pt-16 pb-8 pr-8 mt-2" >
            <div className="flex items-center mb-3 justify-between">
                <h2 className="font-bold text-3xl font-sans ">Room Checkout</h2>
            </div>
            

            {/* Hiển thị thông báo thành công */}
            {successMessage && (
                <div className="alert alert-success ms-4">{successMessage}</div>
            )}

            {/* Search Section */}
            <div className="card bg-white shadow mb-4 ms-4">
                <div className="card-header bg-white">
                    <h4 className="mb-0">Search for Customer</h4>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="roomID" className="form-label">Room ID</label>
                        <input
                            type="text"
                            id="roomID"
                            className="form-control"
                            value={roomID}
                            onChange={(e) => setRoomID(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerName" className="form-label">Customer Name</label>
                        <input
                            type="text"
                            id="customerName"
                            className="form-control"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                </div>
            </div>

            {error && <div className="alert alert-danger ms-4">{error}</div>}

            {foundBill && (
                <>
                    {/* Customer Details */}
                    <div className="card bg-white shadow mb-4 ms-4">
                        <div className="card-header bg-white">
                            <h4 className="mb-0">Customer Details</h4>
                        </div>
                        <div className="card-body overflow-x-auto">
                            <table className="table table-borderless mb-0">
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{foundBill.customer.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{foundBill.customer.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Mobile</th>
                                        <td>{foundBill.customer.mobile}</td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <td>{foundBill.customer.address}</td>
                                    </tr>
                                    <tr>
                                        <th>Customer Type</th>
                                        <td>{foundBill.customer.customerType}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Bill Details */}
                    <div className="card bg-white shadow ms-4">
                        <div className="card-header bg-white">
                            <h4 className="mb-0">Bill Details</h4>
                        </div>
                        <div className="card-body overflow-x-auto">
                            <table className="table table-striped text-center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Room ID</th>
                                        <th>Room Type</th>
                                        <th>Rent Days</th>
                                        <th>Customers In Room</th>
                                        <th>Coefficient</th>
                                        <th>Surcharge</th>
                                        <th>Start Date</th>
                                        <th>Price Per Day</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {foundBill.billDetails
                                        .filter(detail => detail.roomID === roomID)
                                        .map((bill, index) => (
                                            <tr key={index}>
                                                <td>{bill.no}</td>
                                                <td>{bill.roomID}</td>
                                                <td>{bill.roomType}</td>
                                                <td>{bill.rentdays}</td>
                                                <td>{bill.customersinroom}</td>
                                                <td>{bill.coefficient}</td>
                                                <td>{bill.surcharge}</td>
                                                <td>{bill.startdate}</td>
                                                <td>{bill.priceperday}</td>
                                                <td>{bill.Total}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="text-end mt-3 ms-4" style={{ marginBottom: '10px'}}>
                        <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default RoomCheckout;