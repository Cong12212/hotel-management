import React from 'react';
import { useAuth } from '../hook/useAuth';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const { user, userLogout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        userLogout();
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-pink-700">
                        Welcome to HotelAir User Portal
                    </h2>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">User Information</h5>
                                    <p><strong>Username:</strong> {user?.username}</p>
                                    <p><strong>Full Name:</strong> {user?.fullName}</p>
                                    <p><strong>Role:</strong> {user?.role}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Quick Actions</h5>
                                    <div className="d-grid gap-2">
                                        <Button variant="primary" className="mb-2">
                                            Book a Room
                                        </Button>
                                        <Button variant="info" className="mb-2">
                                            View My Bookings
                                        </Button>
                                        <Button variant="warning" className="mb-2">
                                            Edit Profile
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <Button
                            variant="danger"
                            onClick={handleLogout}
                            className="px-4"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;