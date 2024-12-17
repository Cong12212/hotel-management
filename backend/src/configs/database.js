const mongoose = require('mongoose');
const Role = require('../models/Role');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv')

dotenv.config({path:'../../.env'})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI.replace('<db_password>',process.env.DB_PASSWORD));
        console.log('MongoDB connected successfully');
        await initializeSystem();
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const initializeSystem = async () => {
    try {
        // Admin role với tất cả quyền
        const adminRole = {
            name: 'admin',
            description: 'Administrator with full access',
            permissions: [
                'manage_users',
                'manage_roles',
                'manage_rooms',
                'manage_room_types',
                'manage_bookings',
                'view_reports',
                'view_rooms',
                'create_booking',
                'view_own_bookings'
            ]
        };

        // User role với quyền hạn chế
        const userRole = {
            name: 'user',
            description: 'Regular user with limited access',
            permissions: [
                'view_rooms',
                'create_booking',
                'view_own_bookings'
            ]
        };

        // Tạo hoặc cập nhật admin role
        const adminRoleDoc = await Role.findOneAndUpdate(
            { name: 'admin' },
            adminRole,
            { upsert: true, new: true }
        );

        // Tạo hoặc cập nhật user role
        await Role.findOneAndUpdate(
            { name: 'user' },
            userRole,
            { upsert: true }
        );

        console.log('Default roles created successfully');

        // Khởi tạo tài khoản admin mặc định
        const defaultAdmins = [
            {
                username: 'admin1',
                password: 'admin1@password',
                fullName: 'Admin One'
            },
            {
                username: 'admin2',
                password: 'admin2@password',
                fullName: 'Admin Two'
            }
        ];

        for (const admin of defaultAdmins) {
            const existingAdmin = await User.findOne({ username: admin.username });
            if (!existingAdmin) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(admin.password, salt);

                await User.create({
                    username: admin.username,
                    password: hashedPassword,
                    fullName: admin.fullName,
                    role: adminRoleDoc._id
                });
                console.log(`Created admin account: ${admin.username}`);
            }
        }

    } catch (error) {
        console.error('Error initializing system:', error);
    }
};

module.exports = connectDB;