const RoomType = require('../models/RoomType');
const Room = require('../models/Room');
const QueryHelper = require('../utils/QueryHelper')
/**
 * API endpoint example GET http://localhost:4000/api/room-types
 * required Role : admin,manager,receptionist
 * 
 */
exports.getAllRoomTypes = async (req, res) => {
    try {
        const { search } = req.query;
        let roomTypeQuery = RoomType.find().sort('name');

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            roomTypeQuery = roomTypeQuery.or([
                { name: searchRegex },
                { maxOccupancy: searchRegex }
            ]);
        }

<<<<<<< HEAD
        const queryHelper = new QueryHelper(roomTypeQuery, req.query).executeQuery();

        // Thực thi query
        const roomTypes = await queryHelper.query;

        // Đếm tổng số document (không áp dụng điều kiện search)
        const total = await RoomType.countDocuments();

        // Trả về kết quả
        return res.status(200).json({
=======
        const roomTypes = await queryHelper.query
        const total = await RoomType.countDocuments();
  
        res.status(200).json({
>>>>>>> 1039ec24d5fedf1d4ce45cf164683cfc87731b68
            success: true,
            count: roomTypes.length,
            total,
            data: roomTypes
        });

    } catch (error) {
        console.error('Get all room types error:', error);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};


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

/**
 * API endpoint example POST http://localhost:4000/api/room-types
 * require : admin,manager role
 * @param req.body Body of RoomType need to be created
 */
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

/**
 * API Endpoint example PATCH http://localhost:4000/api/room-types/67683730f3bc4088c6b5dd94
 * require : admin,manager role
 * @param req.params.id ID of RoomType need to update
 * @param req.body Body of RoomType need to update
 */
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

/**
 * API endpoint example:  DELETE http://localhost:4000/api/room-types/67683730f3bc4088c6b5dd94
 * required Role : admin,manager
 * @params req.params.id ID of the room need to delete
 */
exports.deleteRoomType = async (req, res) => {
    try {

        const roomType = await RoomType.findByIdAndDelete(req.params.id);

        if (!roomType) {
            0
            return res.status(404).json({
                success: false,
                error: 'Room type not found'
            });
        }

        const hasRooms = await Room.exists({ roomTypeId: req.params.id });
        if (hasRooms) {
            return res.status(400).json({
                success: false,
                error: 'Cannot delete room type that has rooms'
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