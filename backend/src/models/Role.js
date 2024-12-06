const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Role name is required'],
        unique: true,
        enum: ['admin', 'user'] // Chỉ có 2 role: admin và user
    },
    description: {
        type: String,
        required: false
    },
    permissions: [{
        type: String,
        enum: [
            // Admin permissions
            'manage_users',
            'manage_roles',
            'manage_rooms',
            'manage_room_types',
            'manage_bookings',
            'view_reports',
            // User permissions
            'view_rooms',
            'create_booking',
            'view_own_bookings'
        ]
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Role', roleSchema);