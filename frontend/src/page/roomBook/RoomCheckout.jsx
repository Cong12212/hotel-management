    import React from "react";
    import './RoomCheckout.css'

    const RoomCheckout = () => {
        const customerDetails = {
            name: "Cau be ngay tho cung trai tim nhan hau",
            email: "caubengaytho@gmail.com",
            mobile: "+84 859987184",
            address: "346B, Nguyen Dinh Chieu Street, Tan An city, Long An province",
            customerType: "Inland",
        };

        const billDetails = [
            {
                No: "1",
                RoomID: "A102",
                RoomType: "A",
                "rent days": "3",
                coefficient: "1",
                surcharge: "25%",
                startdate: "2024-12-16",
                "Price/Date": "150.000 VNĐ",
                Total: "562.000 VNĐ",
            },
            {
            No: "2",
                RoomID: "B205",
                RoomType: "B",
                "rent days": "2",
                coefficient: "1",
                surcharge: "0",
                startdate: "2024-12-18",
                "Price/Date": "200.000 VNĐ",
                Total: "400.000 VNĐ",
            }
        ];

        const formatKey = (key) => {
            if(key === 'RoomID') return "ROOM ID";
            return key.replace(/([A-Z])/g, " $1").toUpperCase();
        }

        return (
            <div>
                <h2 className="check-out-title">Check Out</h2>
                <div className="room-checkout">
                <div className="customer-details">
                    <h3>Customer Details</h3>
                    <table>
                    <tbody>
                        {Object.entries(customerDetails).map(([key, value]) => (
                        <tr key={key}>
                            <th>{formatKey(key)}</th>
                            <td>{value}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            
                <div className="bill-details">
                    <h3>Bill Details</h3>
                    <div className="table-scroll">
                        <table>
                            <thead>
                            <tr>
                                {Object.keys(billDetails[0]).map((key) => (
                                <th key={key}>{formatKey(key)}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {billDetails.map((bill, index) => (
                                <tr key={index}>
                                {Object.values(bill).map((value, i) => (
                                    <td key={i}>{value}</td>
                                ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <button className="checkout">Check Out</button>
            </div>
            </div>
            
        );
    };

    export default RoomCheckout;