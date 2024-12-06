// routes/customerTypeRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const {
    getAllCustomerTypes,
    getCustomerType,
    createCustomerType,
    updateCustomerType,
    deleteCustomerType
} = require('../controllers/customerTypeController');

// Public routes
router.get('/', getAllCustomerTypes);
router.get('/:id', getCustomerType);

// Admin routes
router.use(protect);
router.use(authorize('admin'));
router.post('/', createCustomerType);
router.put('/:id', updateCustomerType);
router.delete('/:id', deleteCustomerType);

module.exports = router;