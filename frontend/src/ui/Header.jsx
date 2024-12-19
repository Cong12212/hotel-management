<<<<<<< HEAD
import { useState, useRef, useEffect } from "react";

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null); // Tạo ref cho dropdown

    // Xử lý click bên ngoài dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false); // Ẩn dropdown khi click bên ngoài
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center py-2">
                {/* Logo */}
                <div>
                    <a
                        href="/"
                        className="focus:outline-dashed focus:outline-2 focus:outline-blue-500 cursor-pointer font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-violet-800 to-pink-800 mr-4"
                    >
                        Hotel Air
                    </a>
                </div>

                {/* Search Box */}
                <div
                    tabIndex="1"
                    className="focus:outline-dashed focus:outline-2 focus:outline-blue-500 items-center flex-1 px-4 bg-white text-base flex text-gray-500 py-2 border-gray-300 border rounded-md"
                >
=======


const Header = ({ toggleNavBar, isNavBarOpen }) => {
    return (
        <div className=" w-full bg-gray-50 z-50 fixed  ">
            <div className=" flex justify-start items-center py-2 ">
                <div>
                    {/* Toggle NavBar Button */}
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
                <div className="">
                    <a href="/" className="focus:outline-dashed focus:outline-2 focus:outline-violet-500 cursor-pointer font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-violet-800 to-pink-800 mr-8">
                        Hotel Air
                    </a>
                </div>
                <div>
                </div>
                <div
                    className={`transition-all duration-300 ease-in-out ${
                        isNavBarOpen ? 'w-1/2' : 'w-2/3'
                    } flex items-center px-4 bg-white text-gray-500 py-2 border border-gray-300 rounded-md`}>
>>>>>>> 849a1700f626ef0f4eaee613b4541fef844333d6
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
<<<<<<< HEAD

                {/* Avatar và Dropdown */}
                <div className="flex items-center gap-2 px-4 relative cursor-pointer" ref={dropdownRef}>
                    <div
                        className="flex items-center gap-2"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <div className="w-8 h-8 rounded-full">
                            <img
                                className="rounded-full"
                                src="https://hotelair-react.pixelwibes.in/static/media/profile_av.387360c31abf06d6cc50.png"
                                alt="Profile Avatar"
                            />
                        </div>
                        <span className="text-gray-700">Michelle</span>
                    </div>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-64 py-4 z-10">
                            <div className="px-4 pb-2 border-b">
                                <h4 className="text-lg font-bold text-gray-700">Michelle Glover</h4>
                                <p className="text-sm text-gray-500">michelle.glover@gmail.com</p>
                                <input
                                    className="w-full mt-2 p-2 border rounded-md text-sm"
                                    placeholder="Update my status"
                                />
                            </div>
                            <ul className="list-none px-4">
                                <li className="py-2 text-gray-700 cursor-pointer hover:text-violet-600">
                                    My Profile
                                </li>
                                <li className="py-2 text-gray-700 cursor-pointer hover:text-violet-600">
                                    Common Settings
                                </li>
                                <li className="py-2 text-gray-700 cursor-pointer hover:text-violet-600">
                                    Settings
                                </li>
                            </ul>
                            <div className="px-4 mt-2">
                                <button className="w-full py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700">
                                    Logout
                                </button>
                            </div>
                            <div className="text-xs text-center text-gray-400 mt-2">
                                <a href="#" className="hover:underline">
                                    Privacy policy
                                </a>{" "}
                                •{" "}
                                <a href="#" className="hover:underline">
                                    Terms
                                </a>{" "}
                                •{" "}
                                <a href="#" className="hover:underline">
                                    Cookies
                                </a>
                            </div>
                        </div>
                    )}
=======
                <div className="flex-1 flex items-center fixed right-0">
                    <div className="px-4">
                        <svg
                            className="w-8 h-8"
                            xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path><path d="M9 17v1a3 3 0 0 0 6 0v-1"></path><path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727"></path><path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727"></path></svg>
                    </div>
                    <div className="flex items-center gap-2 mr-4">
                        <button className="focus:outline-dashed focus:outline-2 focus:outline-violet-500 cursor-pointer px-3 py-2 rounded-md text-white bg-gradient-to-r from-violet-500 to-pink-500 hover:bg-gradient-to-r hover:from-violet-700 hover:to-pink-700 ">
                            LogIn 
                        </button>
                        <div className="w-10 h-10 ">
                            <img className="rounded-full hover:shadow-lg"
                                src="https://hotelair-react.pixelwibes.in/static/media/profile_av.387360c31abf06d6cc50.png" alt="" />
                        </div>
                        <span className="text-gray-600 bg-clip-text hover:bg-gradient-to-r hover:from-violet-800 hover:to-pink-800 hover:text-transparent">
                            Michelle
                        </span>
                    </div>
>>>>>>> 849a1700f626ef0f4eaee613b4541fef844333d6
                </div>
            </div>
        </div>
    );
};

export default Header;
