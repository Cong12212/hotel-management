import React, { useState, useCallback, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormControl } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getAllRooms, getAllRoomTypes, getAllCustomerTypes, addBooking, postAddCustomer, getAllCustomer, patchUpdateCustomer } from '../service/apiServices';

const RoomBookingForm = () => {
    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [roomAvailable, setRoomAvailable] = useState([]);
    const [price, setPrice] = useState(0);
    const [roomType, setRoomType] = useState('');
    const [totalRooms, setTotalRooms] = useState(0);
    const [totalRoomTypes, setTotalRoomTypes] = useState(0);
    const [errors, setErrors] = useState({});
    const [newBooking, setNewBooking] = useState({});
    const [maxGuests, setMaxGuests] = useState('1');
    const [customers, setCustomers] = useState([]);
    const [customerTypes, setCustomerTypes] = useState([]);
    const [listCustomer, setListCustomer] = useState([]);
    const [totalCustomers, setTotalCustomers] = useState(0);

    // Fetch customer types on component mount
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
                    console.log('Customer types loaded:', formattedData);
                }
            } catch (error) {
                console.error("Failed to fetch customer types:", error);
                toast.error("Failed to load customer types", { autoClose: 2000 });
            }
        };

        fetchCustomerTypes();
    }, []);

    // Fetch rooms
    const fetchListRoom = useCallback(async () => {
        try {
            const queryParams = {
                limit: totalRooms,
                page: 1,
            };

            const res = await getAllRooms(queryParams);
            if (res?.data?.data) {
                setRooms(res.data.data);
                setTotalRooms(res.data.total);
            }
        } catch (error) {
            console.error("Error fetching rooms:", error);
            toast.error("Failed to load rooms", { autoClose: 2000 });
        }
    }, [totalRooms]);

    // Fetch room types
    const fetchListRoomTypes = useCallback(async () => {
        try {
            const queryParams = {
                limit: totalRoomTypes,
                page: 1,
            };
            const res = await getAllRoomTypes(queryParams);
            if (res?.data?.data) {
                setRoomTypes(res.data.data);
                setTotalRoomTypes(res.data.total);
            }
        } catch (error) {
            console.error("Error fetching room types:", error);
            toast.error("Failed to load room types", { autoClose: 2000 });
        }
    }, [totalRoomTypes]);

    // Fetch customer list
    const fetchListCustomer = useCallback(async () => {
        try {
            const queryParams = {
                limit: totalCustomers,
                page: 1,
            };
            const res = await getAllCustomer(queryParams);
            if (res?.data?.data) {
                setListCustomer(res.data.data);
                setTotalCustomers(res.data.total);
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
            toast.error("Failed to load customer list", { autoClose: 2000 });
        }
    }, [totalCustomers]);

    // Initial data fetch
    useEffect(() => {
        fetchListRoom();
        fetchListRoomTypes();
        fetchListCustomer();
    }, [fetchListRoom, fetchListRoomTypes, fetchListCustomer]);

    // Handle customer input changes
    const handleInputChange = (index, field, value) => {
        const updatedCustomers = [...customers];
        updatedCustomers[index] = {
            ...updatedCustomers[index],
            [field]: value
        };
        setCustomers(updatedCustomers);
        console.log(`Updated customer ${index}, ${field}:`, value);
    };

    // Handle room type selection
    const handleRoomTypeChange = (event) => {
        const selectedRoomType = event.target.value;
        setRoomType(selectedRoomType);
        setNewBooking(prev => ({ ...prev, roomTypeId: selectedRoomType }));

        const selectedType = roomTypes.find(type => type._id === selectedRoomType);
        if (selectedType) {
            setMaxGuests(selectedType.maxOccupancy);
            setPrice(selectedType.price);
            setRoomAvailable(rooms.filter(room => room.roomTypeId?._id === selectedRoomType));
        }
    };

    // Add new customer form
    const handleAddCustomer = () => {
        if (customers.length >= maxGuests) {
            toast.error(`Maximum number of customers reached (${maxGuests})`, { autoClose: 2000 });
            return;
        }

        setCustomers([
            ...customers,
            {
                id: customers.length + 1,
                fullName: '',
                customerTypeId: customerTypes[0]?.id || '', // Set default customer type if available
                idNumber: '',
                address: '',
                phone: ''
            }
        ]);
    };

    // Remove customer form
    const handleRemoveCustomer = (index) => {
        const updatedCustomers = customers.filter((_, idx) => idx !== index);
        setCustomers(updatedCustomers);
    };

    // Validate customer data
    const validateCustomerData = (customer) => {
        if (!customer.fullName?.trim()) {
            toast.error("Customer name is required", { autoClose: 2000 });
            return false;
        }
        if (!customer.customerTypeId) {
            toast.error("Customer type is required", { autoClose: 2000 });
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        try {
            // Validate booking information
            if (!roomType || !newBooking.roomId) {
                toast.error("Please select room type and room", { autoClose: 2000 });
                return;
            }

            const checkInDate = document.getElementById("checkIn").value;
            const checkOutDate = document.getElementById("checkOut").value;

            if (!checkInDate || !checkOutDate) {
                toast.error("Please select check-in and check-out dates", { autoClose: 2000 });
                return;
            }

            // Validate customers
            if (customers.length === 0) {
                toast.error("Please add at least one customer", { autoClose: 2000 });
                return;
            }

            for (const customer of customers) {
                if (!validateCustomerData(customer)) {
                    return;
                }
            }

            const customerIds = [];

            // Process each customer
            for (const customer of customers) {
                let customerId;

                // Prepare customer data
                const customerData = {
                    fullName: customer.fullName.trim(),
                    customerTypeId: customer.customerTypeId,
                    idNumber: customer.idNumber?.trim() || '',
                    phone: customer.phone?.trim() || '',
                    address: customer.address?.trim() || ''
                };

                try {
                    let response;

                    // Check for existing customer by ID number if provided
                    if (customer.idNumber?.trim()) {
                        // Tìm kiếm trong listCustomer trước
                        const existingCustomer = listCustomer.find(c => c.idNumber === customer.idNumber.trim());

                        if (existingCustomer) {
                            // Customer exists, update them
                            console.log('Updating existing customer:', existingCustomer._id);
                            response = await patchUpdateCustomer(existingCustomer._id, customerData);

                            if (response.success) {
                                console.log('Customer updated successfully:', response.data);
                                customerId = existingCustomer._id;
                            } else {
                                throw new Error(response.error?.error || 'Failed to update customer');
                            }
                        } else {
                            // Try to create new customer
                            console.log('Creating new customer');
                            response = await postAddCustomer(customerData);

                            if (response.success && response.data?.data?._id) {
                                console.log('New customer created:', response.data);
                                customerId = response.data.data._id;
                            } else if (response.error?.error?.includes('already exists')) {
                                // If customer exists in DB but not in our list
                                toast.error('Customer with this ID number already exists. Please try again.', { autoClose: 2000 });
                                return;
                            } else {
                                throw new Error(response.error?.error || 'Failed to create customer');
                            }
                        }
                    } else {
                        // No ID number provided, create new customer
                        response = await postAddCustomer(customerData);

                        if (response.success && response.data?.data?._id) {
                            console.log('New customer created:', response.data);
                            customerId = response.data.data._id;
                        } else {
                            throw new Error(response.error?.error || 'Failed to create customer');
                        }
                    }

                    if (!customerId) {
                        throw new Error(`Could not get ID for customer: ${customerData.fullName}`);
                    }

                    customerIds.push(customerId);

                } catch (error) {
                    console.error('Error processing customer:', error);
                    toast.error(error.message, { autoClose: 2000 });
                    return;
                }
            }

            // Create booking
            const bookingDetails = [{
                roomId: newBooking.roomId,
                checkInDate,
                checkOutDate,
                numberOfGuests: customers.length
            }];

            const payload = { customerIds, bookingDetails };
            console.log('Booking payload:', payload);

            const bookingResponse = await addBooking(payload);

            if (bookingResponse?.data?.success) {
                toast.success("Booking completed successfully!", { autoClose: 2000 });
                // Reset form
                setCustomers([]);
                setNewBooking({});
                setRoomType('');
                setPrice(0);
                setMaxGuests('1');
            } else {
                throw new Error(bookingResponse?.error?.error || "Failed to create booking");
            }
        } catch (error) {
            console.error("Booking error:", error);
            toast.error(error.message || "An error occurred while processing the booking.", { autoClose: 2000 });
        }
    };

    return (
        <div className="pt-16 pb-8 pr-8 mt-2">
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
                                value={roomType}
                                onChange={handleRoomTypeChange}
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
                                value={newBooking.roomId || ''}
                                onChange={(e) => setNewBooking(prev => ({ ...prev, roomId: e.target.value }))}
                                isInvalid={!!errors.roomId}
                            >
                                <option value="">Select room</option>
                                {roomAvailable.map((room) => (
                                    <option key={room._id} value={room._id}>
                                        {room.roomName}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.roomId}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group controlId="maxGuests">
                            <Form.Label>Max of Guests</Form.Label>
                            <FormControl
                                type="number"
                                value={maxGuests}
                                readOnly
                                className="w-full border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <FormControl
                                type="text"
                                value={`${price.toLocaleString("en-US")} VND`}
                                readOnly
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
                                className="text-red-600 ml-2"
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
                                    required
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
