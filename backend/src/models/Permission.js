const Permission = Object.freeze({
    // Manage users
    MANAGE_USERS: 'manage_users',
    MANAGE_ROLES: 'manage_roles',

    // Manage customers
    CREATE_CUSTOMERS: 'create_customers',
    UPDATE_CUSTOMERS: 'update_customers',
    DELETE_CUSTOMERS: 'delete_customers',
    VIEW_CUSTOMERS: 'view_customers',

    // Manage rooms
    CREATE_ROOMS : 'create_rooms',
    UPDATE_ROOMS: 'update_rooms',
    DELETE_ROOMS: 'delete_rooms',
    VIEW_ROOMS: 'view_rooms',

    // Manage room types
    CREATE_ROOMTYPES : 'create_roomtypes',
    UPDATE_ROOMTYPES : 'update_roomtypes',
    DELETE_ROOMTYPES: 'delete_roomtypes',
    VIEW_ROOMTYPES: 'view_roomtypes',

    // Manage bookings
    VIEW_BOOKINGS : 'view_bookings',
    UPDATE_BOOKINGS: 'update_bookings',
    CREATE_BOOKINGS: 'create_bookings',
    DELETE_BOOKINGS: 'delete_bookings',

    // Manage reports
    VIEW_REPORTS: 'view_reports',

});

module.exports = Permission;