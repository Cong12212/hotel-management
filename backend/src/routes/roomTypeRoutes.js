// routes/roomTypeRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const {
    getAllRoomTypes,
    getRoomType,
    createRoomType,
    updateRoomType,
    deleteRoomType
} = require('../controllers/roomTypeController');

// Public routes (không cần đăng nhập)
router.get('/', getAllRoomTypes);  // Cho trang chủ hiển thị các loại phòng
router.get('/:id', getRoomType);   // Xem chi tiết loại phòng

// Admin routes
router.use(protect);
router.use(authorize('admin'));
router.post('/', createRoomType);
router.put('/:id', updateRoomType);
router.delete('/:id', deleteRoomType);

module.exports = router;