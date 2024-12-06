const RoomType = require('../models/RoomType');
const Room = require('../models/Room');

// Get all rooms
exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find()
            .populate('roomTypeId')
            .sort('roomName');

        res.status(200).json({
            success: true,
            count: rooms.length,
            data: rooms
        });
    } catch (error) {
        console.error('Get all rooms error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get single room
exports.getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id).populate('roomTypeId');

        if (!room) {
            return res.status(404).json({
                success: false,
                error: 'Room not found'
            });
        }

        res.status(200).json({
            success: true,
            data: room
        });
    } catch (error) {
        console.error('Get room error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Create room
exports.createRoom = async (req, res) => {
    try {
        const { roomTypeId, roomName, status, notes } = req.body;

        // Verify room type exists
        const roomType = await RoomType.findById(roomTypeId);
        if (!roomType) {
            return res.status(404).json({
                success: false,
                error: 'Room type not found'
            });
        }

        const room = await Room.create({
            roomTypeId,
            roomName,
            status,
            notes
        });

        res.status(201).json({
            success: true,
            data: await room.populate('roomTypeId')
        });
    } catch (error) {
        console.error('Create room error:', error);
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Room name already exists'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Update room
exports.updateRoom = async (req, res) => {
    try {
        const { roomTypeId, roomName, status, notes } = req.body;

        // If roomTypeId is provided, verify it exists
        if (roomTypeId) {
            const roomType = await RoomType.findById(roomTypeId);
            if (!roomType) {
                return res.status(404).json({
                    success: false,
                    error: 'Room type not found'
                });
            }
        }

        const room = await Room.findByIdAndUpdate(
            req.params.id,
            { roomTypeId, roomName, status, notes },
            {
                new: true,
                runValidators: true
            }
        ).populate('roomTypeId');

        if (!room) {
            return res.status(404).json({
                success: false,
                error: 'Room not found'
            });
        }

        res.status(200).json({
            success: true,
            data: room
        });
    } catch (error) {
        console.error('Update room error:', error);
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Room name already exists'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Delete room
exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                success: false,
                error: 'Room not found'
            });
        }

        if (room.status === 'occupied') {
            return res.status(400).json({
                success: false,
                error: 'Cannot delete occupied room'
            });
        }

        await room.remove();

        res.status(200).json({
            success: true,
            message: 'Room deleted successfully'
        });
    } catch (error) {
        console.error('Delete room error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get available rooms
exports.getAvailableRooms = async (req, res) => {
    try {
        const { checkIn, checkOut } = req.query;

        if (!checkIn || !checkOut) {
            const rooms = await Room.find({ status: 'available' })
                .populate('roomTypeId');

            return res.status(200).json({
                success: true,
                count: rooms.length,
                data: rooms
            });
        }

        // Find rooms not booked in the date range
        const bookedRoomIds = await BookingDetail.distinct('roomId', {
            $or: [
                {
                    checkInDate: { $lte: new Date(checkOut) },
                    checkOutDate: { $gte: new Date(checkIn) }
                }
            ]
        });

        const availableRooms = await Room.find({
            _id: { $nin: bookedRoomIds },
            status: 'available'
        }).populate('roomTypeId');

        res.status(200).json({
            success: true,
            count: availableRooms.length,
            data: availableRooms
        });
    } catch (error) {
        console.error('Get available rooms error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};