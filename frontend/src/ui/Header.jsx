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
                </div>
            </div>
        </div>
    );
};

export default Header;
