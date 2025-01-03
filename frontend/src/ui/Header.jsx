import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logOut, getAllUsers } from '../service/apiServices';

const Header = ({ toggleNavBar, isNavBarOpen }) => {
    
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [totalUsers, setTotalUsers] = useState(0);   
    const [errors, setErrors] = useState({});
    const { userLogout, user } = useAuth();
    const navigate = useNavigate();
    const [showUserInfo, setShowUserInfo] = useState(false);


    const fetchUsers = async () => {
        try {
            const response = await getAllUsers({
                limit: totalUsers,
                page: 1,
            })
            if (response.success) {
                setUsers(response.data.data);
                if(totalUsers !== response.data.total) {
                    setTotalUsers(response.data.total);
                }
            } else {
                setErrors(response.error.error);
            }
        } catch (err) {
            console.error(err.message || "Error fetching users", err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [totalUsers]);
    
    const handleLogOut = () => {
        logOut()
            .then((res) => {
               
                if (res.data.success) {
                    toast.success('Logged out successfully');
                    userLogout();
                    navigate('/');
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message || 'Failed to logout');
            });
    };

    const handleLogIn = () => {
        navigate('/');
    };

    const toggleUserInfo = () => {
        setShowUserInfo((prev) => !prev);
    };

    return (
        <div className="w-full bg-gray-50 z-50 fixed">
            <ToastContainer />
            <div className="flex justify-start items-center py-2">
                <div>
                    <button
                        onClick={toggleNavBar}
                        className="bg-gradient-to-r from-violet-500 to-pink-500 hover:bg-gradient-to-r hover:from-violet-700 hover:to-pink-700 focus:outline-dashed focus:outline-2 focus:outline-violet-500 cursor-pointer px-2 py-1.5 rounded-md mr-4 ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white feather feather-menu">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div>
                    <a href="/" className="focus:outline-dashed focus:outline-2 focus:outline-violet-500 cursor-pointer font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-violet-800 to-pink-800 mr-8">
                        Hotel Air
                    </a>
                </div>
                <div
                    className={`transition-all duration-300 ease-in-out ${isNavBarOpen ? 'w-1/2' : 'w-2/3'
                        } flex items-center px-4 bg-white text-gray-500 py-2 border border-gray-300 rounded-md`}>
                    <svg
                        className="svg-stroke search-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                        <path d="M21 21l-6 -6"></path>
                    </svg>
                    <input
                        className="w-full outline-none"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
                <div className="flex-1 flex items-center fixed right-0">
                    <div className="flex items-center gap-2 mr-4">
                        {user ? (
                            <button
                                className="px-3 py-2 rounded-md text-white bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-700 hover:to-pink-700"
                                onClick={handleLogOut}>
                                LogOut
                            </button>
                        ) : (
                            <button
                                className="px-3 py-2 rounded-md text-white bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-700 hover:to-pink-700"
                                onClick={handleLogIn}>
                                LogIn
                            </button>
                        )}
                        <div className="w-10 h-10 relative">
                            <button onClick={toggleUserInfo}>
                                <img className="rounded-full hover:shadow-lg"
                                    src="https://hotelair-react.pixelwibes.in/static/media/profile_av.387360c31abf06d6cc50.png" alt="Profile" />
                            </button>
                            {showUserInfo && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md p-2 flex flex-col">
                                    {users.map((userItem) => (
                                        user && user.userInfo && userItem._id === user.userInfo.id && (
                                            <div key={userItem._id}>
                                                <div className="font-bold text-center">{userItem.fullName}</div>
                                                <div className="flex items-center gap-2">
                                                    <label className="font-bold">Roles: </label>
                                                    {userItem.role && userItem.role.length > 0
                                                        ? userItem.role.map((role) => role.name).join(", ")
                                                        : "No roles assigned"}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <label className="font-bold">UserName: </label>
                                                    {userItem.username}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <label className="font-bold">Phone: </label>
                                                    {userItem.phone || "N/A"}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <label className="font-bold">Address: </label>
                                                    {userItem.address || "N/A"}
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                        <span className="text-gray-600 bg-clip-text hover:bg-gradient-to-r hover:from-violet-800 hover:to-pink-800 hover:text-transparent">
                            {user && user.userInfo ? user.userInfo.fullName : 'Guest'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
