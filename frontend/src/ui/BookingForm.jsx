import React, { useState, useCallback, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormControl } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getAllRooms, postAddRoom, patchUpdateRoom, delDeleteRoom, getAllRoomTypes, getAllCustomerTypes, addBooking, postAddCustomer, getAllCustomer } from '../service/apiServices';

const RoomBookingForm = () => {

    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [roomType, setRoomType] = useState('');
    const [roomAvailable, setRoomAvailable] = useState([]);
    const [price, setPrice] = useState('');
    const [search, setSearch] = useState('');
    const [searchField, setSearchField] = useState('');
    const [sortField, setSortField] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRooms, setTotalRooms] = useState(0);
    const [totalRoomTypes, setTotalRoomTYpes] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageInput, setPageInput] = useState(1);
    const [errors, setErrors] = useState({});
    const [newBooking, setNewBooking] = useState([]);
    const [maxGuests, setMaxGuests] = useState('1');
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState([]);
    const [customerTypes, setCustomerTypes] = useState([]);
    const [listCustomer, setListCustomer] = useState([]);
    const [totalCustomers, setTotalCustomers] = useState(0);

    useEffect(() => {
        const fetchCustomerTypes = async () => {
            try {
                const response = await getAllCustomerTypes();
                if (response.data.success) {
                    const formattedData = response.data.data.map((item) => ({
                        id: item._id,
                        type: item.name,
                        coefficient: item.coefficient,
                    }));
                    setCustomerTypes(formattedData);
                }
            } catch (error) {
                console.error("Failed to fetch customer types:", error);
            }
        };

        fetchCustomerTypes();
    }, []);

    const fetchListRoom = useCallback(async () => {
        try {
            const queryParams = {
                limit: totalRooms,
                page: 1,
            };

            const res = await getAllRooms(queryParams);
            if (res && res.data && res.data.data) {
                setRooms(res.data.data);
                setTotalRooms(res.data.total);

            }
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }

    }, [totalRooms]);

    const fetchListRoomTypes = useCallback(async () => {
        try {
            const queryParams = {
                limit: totalRoomTypes,
                page: 1,

            };
            const res = await getAllRoomTypes(queryParams);
            if (res && res.data && res.data.data) {
                setRoomTypes(res.data.data);

                setTotalRoomTYpes(res.data.total);

            }
        } catch (error) {
            console.error("Error fetching roomtypes:", error);
        }
    }, [totalRoomTypes]);

    const fetchListCustomer = useCallback(async () => {
        try {
            const queryParams = {
                limit: totalCustomers,
                page: 1,
            };
            const res = await getAllCustomer(queryParams);
            if (res && res.data && res.data.data) {
                setListCustomer(res.data.data);
                setTotalCustomers(res.data.total);
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    }, [totalCustomers]);

    useEffect(() => {
        fetchListRoom();
        fetchListRoomTypes();
        fetchListCustomer();
    }, [fetchListRoom, fetchListRoomTypes, fetchListCustomer]);

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


    const handleInputChange = (index, field, value) => {
        const updatedCustomers = [...customers];
        updatedCustomers[index][field] = value;
        setCustomers(updatedCustomers);
    };

    const handleRoomTypeChange = (event) => {
        const selectedRoomType = event.target.value;
        setRoomType(selectedRoomType);
        // Tìm maxGuests dựa trên roomType đã chọn
        const selectedType = roomTypes.find(type => type._id === selectedRoomType);
        setRoomAvailable(rooms.filter(room => room.roomTypeId && room.roomTypeId._id === selectedRoomType));
        if (selectedType) {
            setMaxGuests(selectedType.maxOccupancy);
            setPrice(selectedType.price);
        }
    };

    const handleAddCustomer = () => {
        if (customers.length >= maxGuests) {
            toast.error(`Maximum number of customers reached.(${maxGuests})`, { autoClose: 2000 });
            return;
        }

        // Thêm một bộ trường mới với dữ liệu mặc định
        setCustomers([
            ...customers,
            { id: customers.length + 1, fullName: '', customerTypeId: '', idNumber: '', address: '', phone: '' }
        ]);


    };
    const handleRemoveCustomer = (index) => {
        const updatedCustomers = [...customers];
        updatedCustomers.splice(index, 1); // Xóa phần tử tại vị trí index
        setCustomers(updatedCustomers);
    };

    const handleSubmit = async () => {
        try {
            const customerIds = [];

            for (const customer of customers) {
                // Kiểm tra khách hàng tồn tại thông qua idNumber
                const existingCustomer = listCustomer.find(
                    (c) => c.idNumber === customer.idNumber
                );

                let customerId;

                if (existingCustomer) {
                    // Nếu khách hàng đã tồn tại, sử dụng ID của khách hàng đó
                    customerId = existingCustomer._id;
                } else {
                    // Nếu chưa tồn tại, tạo khách hàng mới
                    const customerData = {
                        fullName: customer.fullName,
                        customerTypeId: customer.customerTypeId,
                        idNumber: customer.idNumber,
                        phone: customer.phone,
                        address: customer.address || "Vietnam",
                    };

                    const response = await postAddCustomer(customerData);

                    if (response && response.data && response.data.data) {
                        customerId = response.data.data._id;
                    } else {
                        throw new Error(`Failed to create customer: ${customer.fullName}`);
                    }
                }

                customerIds.push(customerId);
            }

            // Kiểm tra thông tin đặt phòng
            const checkInDate = document.getElementById("checkIn").value;
            const checkOutDate = document.getElementById("checkOut").value;

            if (!newBooking.roomId || !checkInDate || !checkOutDate) {
                toast.error("Please select room and dates", { autoClose: 2000 });
                return;
            }

            // Tạo booking details
            const bookingDetails = [{
                roomId: newBooking.roomId,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                numberOfGuests: customers.length
            }];

            // Gửi yêu cầu đặt phòng
            const bookingResponse = await addBooking({ customerIds, bookingDetails });

            if (bookingResponse?.data?.success) {
                toast.success("Booking successfully created!", { autoClose: 2000 });
                // Reset form sau khi đặt phòng thành công
                setCustomers([]);
                setNewBooking({});
                document.getElementById("checkIn").value = '';
                document.getElementById("checkOut").value = '';
            } else {
                throw new Error("Failed to create booking");
            }

        } catch (error) {
            console.error("Error submitting booking:", error);
            toast.error(error.message || "An error occurred while processing the booking", { autoClose: 2000 });
        }
    };


    return (
        <div className="pt-16 pb-8 pr-8 mt-2 ">
            <ToastContainer />

            {/* Reservation Details Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold mb-4">Reservation Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Form.Group controlId="checkIn">
                            <Form.Label>Check In <span className="text-red-500">*</span></Form.Label>
                            <FormControl
                                type="date"
                                className="w-full border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group controlId="checkOut">
                            <Form.Label>Check Out <span className="text-red-500">*</span></Form.Label>
                            <FormControl
                                type="date"
                                className="w-full border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </Form.Group>
                    </div>

                </div>
            </div>

            {/* Room Details Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm mt-4">
                <h2 className="text-lg font-bold mb-4">Room Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Form.Group controlId="roomType">
                            <Form.Label>Room Type <span className="text-red-500">*</span></Form.Label>
                            <Form.Select
                                name="roomTypeId"
                                value={newBooking.roomTypeId}
                                onChange={(e) => {

                                    handleRoomTypeChange(e);       // Gọi handleRoomTypeChange để cập nhật số khách tối đa
                                }}
                                isInvalid={!!errors.roomTypeId}
                            >
                                <option value="">Select room type</option>
                                {roomTypes.map((type) => (
                                    <option key={type._id} value={type._id}>
                                        {type.name}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.roomTypeId}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group controlId="room">
                            <Form.Label>Room <span className="text-red-500">*</span></Form.Label>
                            <Form.Select
                                name="room"
                                value={newBooking.roomId}
                                onChange={(e) => { setNewBooking({ ...newBooking, roomId: e.target.value }) }}
                                isInvalid={!!errors.roomId}
                            >
                                <option value="">Select room</option>
                                {roomAvailable.map((type) => (
                                    <option key={type._id} value={type._id}>
                                        {type.roomName}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.roomId}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group controlId="adults">
                            <Form.Label>Max of Guests</Form.Label>
                            <FormControl
                                type="number"
                                value={maxGuests}
                                readOnly  // Không cho phép người dùng thay đổi trực tiếp
                                className="w-full border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group controlId="children">
                            <Form.Label>Price</Form.Label>
                            <FormControl
                                type="text"
                                value={`${price.toLocaleString("en-US")} VND`}
                                readOnly  // Không cho phép người dùng thay đổi trực tiếp
                                className="w-full border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </Form.Group>
                    </div>
                </div>
            </div>

            {/* Customer Details Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm mt-4">
                <h2 className="text-lg font-bold mb-4">Customer Details</h2>
                {customers.map((customer, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 mb-6 border-b pb-4">
                        <h3 className="text-md font-medium text-gray-700 col-span-2">
                            Customer no. {index + 1}
                            <Button
                                variant="error"
                                className="text-red-600 mr-2"
                                onClick={() => handleRemoveCustomer(index)}
                            >
                                ✖
                            </Button>
                        </h3>
                        <div>
                            <Form.Group controlId={`customerName-${index}`}>
                                <Form.Label>Name <span className="text-red-500">*</span></Form.Label>
                                <FormControl
                                    type="text"
                                    value={customer.fullName}
                                    onChange={(e) => handleInputChange(index, 'fullName', e.target.value)}
                                    placeholder="Enter customer name"
                                />
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Group controlId={`customerType-${index}`}>
                                <Form.Label>Customer Type <span className="text-red-500">*</span></Form.Label>
                                <Form.Select
                                    name={`customerType-${index}`}
                                    value={customer.customerTypeId}
                                    onChange={(e) => handleInputChange(index, 'customerTypeId', e.target.value)}
                                >
                                    <option value="">Select customer type</option>
                                    {customerTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.type}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Group controlId={`customerIdNumber-${index}`}>
                                <Form.Label>ID-Number</Form.Label>
                                <FormControl
                                    type="text"
                                    value={customer.idNumber}
                                    onChange={(e) => handleInputChange(index, 'idNumber', e.target.value)}
                                    placeholder="Enter ID-Number"
                                />
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Group controlId={`customerAddress-${index}`}>
                                <Form.Label>Address</Form.Label>
                                <FormControl
                                    type="text"
                                    value={customer.address}
                                    onChange={(e) => handleInputChange(index, 'address', e.target.value)}
                                    placeholder="Enter Address"
                                />
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Group controlId={`customerAddress-${index}`}>
                                <Form.Label>Phone</Form.Label>
                                <FormControl
                                    type="text"
                                    value={customer.phone}
                                    onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                                    placeholder="Enter Phone number"
                                />
                            </Form.Group>
                        </div>
                    </div>
                ))}
                <div className="flex justify-end mt-4">
                    <Button variant="dark" onClick={handleAddCustomer}>
                        Add Customer
                    </Button>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
                <Button variant="dark" type="button" onClick={handleSubmit}>
                    Submit
                </Button>

            </div>
        </div>
    );
};

export default RoomBookingForm;
