// src/page/hotel/Hotel.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Hotel = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hotel Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          to="/reservation"
          className="bg-white shadow-md rounded-lg p-6 hover:bg-purple-100 hover:scale-105 transition-transform duration-200"
        >
          <h2 className="font-semibold">Booking Book</h2>
          <p>Manage your bookings here</p>
        </Link>
        <Link
          to="/room-list"
          className="bg-white shadow-md rounded-lg p-6 hover:bg-purple-100 hover:scale-105 transition-transform duration-200"
        >
          <h2 className="font-semibold">Room List</h2>
          <p>View and manage your rooms</p>
        </Link>
        <Link
          to="/room-status"
          className="bg-white shadow-md rounded-lg p-6 hover:bg-purple-100 hover:scale-105 transition-transform duration-200"
        >
          <h2 className="font-semibold">Room Status</h2>
          <p>Check the status of rooms</p>
        </Link>
        <Link
          to="/checkout"
          className="bg-white shadow-md rounded-lg p-6 hover:bg-purple-100 hover:scale-105 transition-transform duration-200"
        >
          <h2 className="font-semibold">Room Checkout</h2>
          <p>Process room checkouts</p>
        </Link>
        <Link
          to="/room-types"
          className="bg-white shadow-md rounded-lg p-6 hover:bg-purple-100 hover:scale-105 transition-transform duration-200"
        >
          <h2 className="font-semibold">Room Type</h2>
          <p>Manage room types available</p>
        </Link>
      </div>
    </div>
  );
};

export default Hotel;