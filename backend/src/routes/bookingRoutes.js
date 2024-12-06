const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const {
    getAllBookings,
    getBooking,
    createBooking,
    updateBookingStatus,
    deleteBooking,
    getBookingsByUser,
    getBookingStats
} = require('../controllers/bookingController');

// Protect all routes
router.use(protect);

// Routes cho staff/receptionist (người dùng đã đăng nhập)
router.post('/', createBooking);
router.get('/my-bookings', getBookingsByUser);
router.get('/:id', getBooking);

// Admin only routes
router.use(authorize('admin'));
router.get('/', getAllBookings);
router.get('/stats/summary', getBookingStats);
router.put('/:id/status', updateBookingStatus);
router.delete('/:id', deleteBooking);  // Xóa booking

module.exports = router;