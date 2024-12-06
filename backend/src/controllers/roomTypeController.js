const RoomType = require('../models/RoomType');
const Room = require('../models/Room');

// Get all room types
exports.getAllRoomTypes = async (req, res) => {
    try {
        const roomTypes = await RoomType.find().sort('name');

        res.status(200).json({
            success: true,
            count: roomTypes.length,
            data: roomTypes
        });
    } catch (error) {
        console.error('Get all room types error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get single room type
exports.getRoomType = async (req, res) => {
    try {
        const roomType = await RoomType.findById(req.params.id);

        if (!roomType) {
            return res.status(404).json({
                success: false,
                error: 'Room type not found'
            });
        }

        res.status(200).json({
            success: true,
            data: roomType
        });
    } catch (error) {
        console.error('Get room type error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Create room type
exports.createRoomType = async (req, res) => {
    try {
        const roomType = await RoomType.create(req.body);

        res.status(201).json({
            success: true,
            data: roomType
        });
    } catch (error) {
        console.error('Create room type error:', error);
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Room type name already exists'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Update room type
exports.updateRoomType = async (req, res) => {
    try {
        const roomType = await RoomType.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!roomType) {
            return res.status(404).json({
                success: false,
                error: 'Room type not found'
            });
        }

        res.status(200).json({
            success: true,
            data: roomType
        });
    } catch (error) {
        console.error('Update room type error:', error);
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Room type name already exists'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Delete room type
exports.deleteRoomType = async (req, res) => {
    try {
        // Check if any rooms are using this room type
        const hasRooms = await Room.exists({ roomTypeId: req.params.id });
        if (hasRooms) {
            return res.status(400).json({
                success: false,
                error: 'Cannot delete room type that has rooms'
            });
        }

        const roomType = await RoomType.findByIdAndDelete(req.params.id);

        if (!roomType) {
            return res.status(404).json({
                success: false,
                error: 'Room type not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Room type deleted successfully'
        });
    } catch (error) {
        console.error('Delete room type error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};