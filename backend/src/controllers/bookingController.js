const Booking = require('../models/Booking');
const BookingDetail = require('../models/BookingDetail');
const Room = require('../models/Room');
const Customer = require('../models/Customer')
const CustomerType = require('../models/CustomerType')
const mongoose = require('mongoose');
const QueryHelper = require('../utils/QueryHelper')

/**
 * Example API endpoint : http://localhost:4000/api/bookings?sort=totalAmount&page=1&limit=2
 * @param possible query params : sort, page, limit
 * Required role : admin, manager, receptionist
 * @return success status, count , total, data
 */
exports.getAllBookings = async (req, res) => {
    try {
        const total = await Booking.countDocuments()
        const bookingQuery = Booking.find()
            .populate('customerIds', 'fullName phone email')
            .populate('userId', 'username')
            .populate({
                path: 'bookingDetails',
                populate: {
                    path: 'roomId',
                    select: 'roomName roomTypeId'
                }
            })

        const queryHelper = new QueryHelper(bookingQuery,req.query).executeQuery()

        const bookings = await queryHelper.query 
        res.status(200).json({
            success: true,
            count: bookings.length,
            total,
            data: bookings
        });
    } catch (error) {
        console.error('Get all bookings error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get single booking
exports.getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('customerIds', 'fullName phone email')
            .populate('userId', 'username')
            .populate({
                path: 'bookingDetails',
                populate: {
                    path: 'roomId',
                    select: 'roomName roomTypeId'
                }
            });

        if (!booking) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        // Check if user is authorized (admin or the user who created the booking)
        if (booking.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to view this booking'
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error('Get booking error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Create new booking
// exports.createBooking = async (req, res) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         const { customerIds, bookingDetails, totalAmount } = req.body;

//         // Validate input
//         if (!customerIds || !Array.isArray(customerIds) || customerIds.length === 0 || !bookingDetails || !totalAmount) {
//             return res.status(400).json({
//                 success: false,
//                 error: 'Please provide all required fields. customerIds must be an array.'
//             });
//         }

//         // Validate dates and room availability
//         for (let detail of bookingDetails) {
//             if (new Date(detail.checkInDate) >= new Date(detail.checkOutDate)) {
//                 throw new Error('Check-out date must be after check-in date');
//             }

//             const isRoomAvailable = await checkRoomAvailability(
//                 detail.roomId,
//                 detail.checkInDate,
//                 detail.checkOutDate
//             );

//             if (!isRoomAvailable) {
//                 throw new Error(`Room ${detail.roomId} is not available for selected dates`);
//             }
//         }

//         // Create booking details
//         const bookingDetailsIds = [];
//         for (let detail of bookingDetails) {
//             const bookingDetail = await BookingDetail.create([detail], { session });
//             bookingDetailsIds.push(bookingDetail[0]._id);

//             await Room.findByIdAndUpdate(
//                 detail.roomId,
//                 { status: 'occupied' },
//                 { session }
//             );
//         }

//         // Create main booking
//         const booking = await Booking.create([{
//             customerIds,
//             userId: req.user.id,
//             bookingDetails: bookingDetailsIds,
//             totalAmount,
//             status: 'confirmed'
//         }], { session });

//         await session.commitTransaction();

//         const populatedBooking = await Booking.findById(booking[0]._id)
//             .populate('customerIds', 'fullName phone email')
//             .populate('userId', 'username')
//             .populate({
//                 path: 'bookingDetails',
//                 populate: {
//                     path: 'roomId',
//                     select: 'roomName roomTypeId'
//                 }
//             });

//         res.status(201).json({
//             success: true,
//             data: populatedBooking
//         });
//     } catch (error) {
//         await session.abortTransaction();
//         console.error('Create booking error:', error);
//         res.status(400).json({
//             success: false,
//             error: error.message
//         });
//     } finally {
//         session.endSession();
//     }
// };

/**
 * 
 * @param customerIds an array of customer id 
 * @param bookingDetails an array of booking details , field included : {roomId, checkInDate, checkOutDate, numberOfGuests}
 * @returns 
 */
exports.createBooking = async (req, res) => {
    try {
        const { customerIds, bookingDetails } = req.body;

        // Validate input
        if (!customerIds || !Array.isArray(customerIds) || customerIds.length === 0 || !bookingDetails ) {
            return res.status(400).json({
                success: false,
                error: 'Please provide all required fields.'
            });
        }


        var totalAmount = 0
        // Create booking details
        const bookingDetailsIds = [];
        for (let detail of bookingDetails) {
            var additionalFees = []
            var price = 0

            // Check room exists
            const room = await Room.findById((detail.roomId)).populate("roomTypeId")
            if(!room) throw new Error(`Room ${detail.roomId} is not exist`);
            if (new Date(detail.checkInDate) >= new Date(detail.checkOutDate)) {
                throw new Error('Check-out date must be after check-in date');
            }
            

            // Check room available 
            const isRoomAvailable = await checkRoomAvailability(
                detail.roomId,
                detail.checkInDate,
                detail.checkOutDate
            );
            if (!isRoomAvailable) {
                throw new Error(`Room ${detail.roomId} is not available for selected dates`);
            }


            price += room.roomTypeId.price
            if(detail.numberOfGuests > room.roomTypeId.maxOccupancy)
            {
                additionalFees.push({amount: room.roomTypeId.price*room.roomTypeId.surchargeRate,description: "Surcharge fee"})
                price+= price*room.roomTypeId.surchargeRate
            }
            const guests = await Customer.find({
                '_id': {$in: customerIds}
            }).populate("customerTypeId")
            
            const hasForeignGuest = guests.some(guest => guest.customerTypeId && guest.customerTypeId.name.toLowerCase() === 'foreign');
            
            if(hasForeignGuest) {
                const foreignCustomerType = await CustomerType.findOne({
                    'name': "Foreign"
                })
                if(foreignCustomerType.coefficient > 1)
                {
                    additionalFees.push({amount: price*(foreignCustomerType.coefficient-1),description: "Foreign customer fee"})
                    price *= foreignCustomerType.coefficient

                }


            }
            
            const bookingDetail = await BookingDetail.create({...detail,additionalFees,totalPrice:price,roomPrice:room.roomTypeId.price});

            
            bookingDetailsIds.push(bookingDetail._id);

            totalAmount += bookingDetail.totalPrice

            // Update room status
            await Room.findByIdAndUpdate(
                detail.roomId,
                { status: 'occupied' }
            );
        }

        // Create main booking
        const booking = await Booking.create({
            customerIds,
            userId: req.user.id,
            bookingDetails: bookingDetailsIds,
            totalAmount : totalAmount,
            status: 'confirmed'
        });

        // Populate booking data
        const populatedBooking = await Booking.findById(booking._id)
            .populate('customerIds', 'fullName phone email')
            .populate('userId', 'username')
            .populate({
                path: 'bookingDetails',
                populate: {
                    path: 'roomId',
                    select: 'roomName roomTypeId'
                }
            });

        res.status(201).json({
            success: true,
            data: populatedBooking
        });
    } catch (error) {
        console.error('Create booking error:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};


// Update booking status
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid status'
            });
        }

        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        booking.status = status;

        // If cancelling, update room status
        if (status === 'cancelled') {
            for (let detailId of booking.bookingDetails) {
                const detail = await BookingDetail.findById(detailId);
                if (detail) {
                    await Room.findByIdAndUpdate(detail.roomId, {
                        status: 'available'
                    });
                }
            }
        }

        await booking.save();

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error('Update booking status error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get user's bookings
exports.getBookingsByUser = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id })
            .populate('customerIds', 'fullName phone email')
            .populate({
                path: 'bookingDetails',
                populate: {
                    path: 'roomId',
                    select: 'roomName roomTypeId'
                }
            })
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        console.error('Get user bookings error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get booking statistics
exports.getBookingStats = async (req, res) => {
    try {
        const stats = await Booking.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$totalAmount' }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Get booking stats error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Delete booking (Admin)
// exports.deleteBooking = async (req, res) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         const booking = await Booking.findById(req.params.id);
//         if (!booking) {
//             return res.status(404).json({
//                 success: false,
//                 error: 'Booking not found'
//             });
//         }

//         // Delete booking details and update room status
//         for (let detailId of booking.bookingDetails) {
//             const detail = await BookingDetail.findById(detailId);
//             if (detail) {
//                 await Room.findByIdAndUpdate(
//                     detail.roomId,
//                     { status: 'available' },
//                     { session }
//                 );
//                 await BookingDetail.findByIdAndDelete(detailId, { session });
//             }
//         }

//         await Booking.findByIdAndDelete(req.params.id, { session });
//         await session.commitTransaction();

//         res.status(200).json({
//             success: true,
//             message: 'Booking deleted successfully'
//         });
//     } catch (error) {
//         await session.abortTransaction();
//         console.error('Delete booking error:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Server Error'
//         });
//     } finally {
//         session.endSession();
//     }
// };

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        // Delete booking details and update room status
        for (let detailId of booking.bookingDetails) {
            const detail = await BookingDetail.findById(detailId);
            if (detail) {
                await Room.findByIdAndUpdate(detail.roomId, { status: 'available' });
                await BookingDetail.findByIdAndDelete(detailId);
            }
        }

        await Booking.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully'
        });
    } catch (error) {
        console.error('Delete booking error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Helper function to check room availability
const checkRoomAvailability = async (roomId, checkIn, checkOut) => {
    const overlappingBookings = await BookingDetail.find({
        roomId,
        $or: [
            {
                checkInDate: { $lte: checkOut },
                checkOutDate: { $gte: checkIn }
            }
        ]
    });

    return overlappingBookings.length === 0;
};