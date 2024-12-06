const Customer = require('../models/Customer');
const CustomerType = require('../models/CustomerType');

// Get all customers (Admin)
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find()
            .populate('customerTypeId')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get single customer
exports.getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)
            .populate('customerTypeId');

        if (!customer) {
            return res.status(404).json({
                success: false,
                error: 'Customer not found'
            });
        }

        // Chỉ admin hoặc chính user đó mới xem được thông tin
        if (req.user.role !== 'admin' && customer._id.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized'
            });
        }

        res.status(200).json({
            success: true,
            data: customer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Create customer (Admin)
exports.createCustomer = async (req, res) => {
    try {
        const { customerTypeId } = req.body;

        // Kiểm tra customerType tồn tại
        const customerType = await CustomerType.findById(customerTypeId);
        if (!customerType) {
            return res.status(404).json({
                success: false,
                error: 'Customer type not found'
            });
        }

        const customer = await Customer.create(req.body);

        res.status(201).json({
            success: true,
            data: await customer.populate('customerTypeId')
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'ID number already exists'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Update customer
exports.updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                error: 'Customer not found'
            });
        }

        // Chỉ admin hoặc chính user đó mới update được
        if (req.user.role !== 'admin' && customer._id.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized'
            });
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate('customerTypeId');

        res.status(200).json({
            success: true,
            data: updatedCustomer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Delete customer (Admin)
exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                error: 'Customer not found'
            });
        }

        await customer.remove();

        res.status(200).json({
            success: true,
            message: 'Customer deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};