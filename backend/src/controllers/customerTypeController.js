const Customer = require('../models/Customer');
const CustomerType = require('../models/CustomerType');

// Get all customer types
exports.getAllCustomerTypes = async (req, res) => {
    try {
        const customerTypes = await CustomerType.find().sort('name');

        res.status(200).json({
            success: true,
            count: customerTypes.length,
            data: customerTypes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get single customer type
exports.getCustomerType = async (req, res) => {
    try {
        const customerType = await CustomerType.findById(req.params.id);

        if (!customerType) {
            return res.status(404).json({
                success: false,
                error: 'Customer type not found'
            });
        }

        res.status(200).json({
            success: true,
            data: customerType
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Create customer type (Admin)
exports.createCustomerType = async (req, res) => {
    try {
        const customerType = await CustomerType.create(req.body);

        res.status(201).json({
            success: true,
            data: customerType
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Customer type name already exists'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Update customer type (Admin)
exports.updateCustomerType = async (req, res) => {
    try {
        const customerType = await CustomerType.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!customerType) {
            return res.status(404).json({
                success: false,
                error: 'Customer type not found'
            });
        }

        res.status(200).json({
            success: true,
            data: customerType
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Delete customer type (Admin)
exports.deleteCustomerType = async (req, res) => {
    try {
        const customerType = await CustomerType.findById(req.params.id);

        if (!customerType) {
            return res.status(404).json({
                success: false,
                error: 'Customer type not found'
            });
        }

        // Kiểm tra xem có customer nào đang dùng type này không
        const hasCustomers = await Customer.exists({ customerTypeId: req.params.id });
        if (hasCustomers) {
            return res.status(400).json({
                success: false,
                error: 'Cannot delete customer type that has customers'
            });
        }

        await customerType.remove();

        res.status(200).json({
            success: true,
            message: 'Customer type deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};