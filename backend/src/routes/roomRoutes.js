// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const {
    getAllRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    getAvailableRooms
} = require('../controllers/roomController');

// Public routes (không cần đăng nhập)
router.get('/available', getAvailableRooms); // Cho trang chủ

// Protected routes (yêu cầu đăng nhập)
router.use(protect);
router.get('/:id', getRoom);

// Admin routes
router.use(authorize('admin'));
router.get('/', getAllRooms);
router.post('/', createRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

module.exports = router;