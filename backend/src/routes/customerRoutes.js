const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const {
    getAllCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerController');

router.use(protect);

router.post('/', createCustomer);
router.get('/:id', getCustomer);

router.use(authorize('admin'));
router.get('/', getAllCustomers);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;