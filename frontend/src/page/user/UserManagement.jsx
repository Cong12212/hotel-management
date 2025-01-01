import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Form, Offcanvas, ToastContainer, InputGroup, FormControl } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllUsers, updateUser, deleteUser, signUp } from "../../service/apiServices";

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [formData, setFormData] = useState({ username: "", password: "", role: "" });
    const [showDetails, setShowDetails] = useState(null);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [cfpassword, setCfPassword] = useState('');
    const [showCfPassword, setShowCfPassword] = useState(false);
    const [errors, setErrors] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            console.log(response);
            if (response.success) {
                setUsers(response.data.data);
            } else {
                setErrors(response.error.error);
            }
        } catch (err) {
            console.error(err.message || "Error fetching users", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await deleteUser(id);
                if (response.success) {
                    setUsers(users.filter((user) => user._id !== id));
                    toast.success("User deleted successfully");
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                toast.error(error.message || "Error deleting user");
            }
        }
    };

    const handleEditClick = (user) => {
        setEditData(user);
        setFormData({
            username: user.username,
            password: "", // Reset password for security reasons
            role: user.role && user.role.length > 0 ? user.role[0].name : ""
        });
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setFormData({ username: "", password: "", role: "" });
        setEditData(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editData) {
                const response = await updateUser(editData._id, {
                    username: formData.username,
                    password: formData.password,
                    role: formData.role
                });
                if (response.success) {
                    setUsers(users.map((user) => (user._id === editData._id ? response.data : user)));
                    toast.success("User details updated successfully", { autoClose: 2000 });
                }
            } else {
                const response = await signUp(formData);
                if (response.success) {
                    setUsers([...users, response.data.user]);
                    toast.success("User registered successfully");
                }
            }
            setShowModal(false);
            setFormData({ username: "", password: "", role: "" });
            setEditData(null);
        } catch (error) {
            toast.error(error.message || "Error saving user", { autoClose: 2000 });
        }
    };

    const handleShowDetails = (user) => {
        setShowDetails(user);
    };

    const handleCloseDetails = () => {
        setShowDetails(null);
    };

    return (
        <div className="pt-16 pb-8 pr-8 mt-2">
            <ToastContainer />
            <div className="flex items-center mb-3 justify-between">
                <h2 className="font-bold text-3xl font-sans">User Management</h2>
                <Button variant="dark" onClick={() => setShowModal(true)} className="mb-3">
                    Add User
                </Button>
            </div>
            <div className="bg-white font-dm-sans rounded-md shadow-sm p-3">
                <Table className="text-center align-middle" bordered-y="true" hover>
                    <colgroup>
                        <col style={{ width: '5%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '25%' }} />
                    </colgroup>
                    <thead>
                        <tr>

                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Role</th>
                            <th>Actions</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <>
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.fullName}</td>
                                    <td>
                                        {user.role && user.role.length > 0
                                            ? user.role.map((role) => role.name).join(", ")
                                            : "No roles assigned"}
                                    </td>
                                    <td className="flex justify-center gap-2 p-3">
                                        <button
                                            className="hover:text-blue-800 text-blue-500 text-xl"
                                            onClick={() => handleEditClick(user)}
                                        >
                                            ✎
                                        </button>
                                        <button
                                            className="hover:text-red-800 text-red-500 font-bold text-xl"
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            🗑
                                        </button>
                                    </td>
                                    <td>
                                        <Button
                                            variant="link"
                                            className="p-0 text-decoration-none"
                                            onClick={() => setShowDetails(showDetails === user._id ? null : user._id)}
                                        >
                                            {showDetails === user._id ? "Hide Details" : "Show Details"}
                                        </Button>
                                    </td>
                                </tr>
                                {showDetails === user._id && (

                                    <tr>
                                        <td colSpan="6" className="p-0">
                                            <div className="p-3 bg-white shadow-md">
                                                <Table bordered-y="true" className="text-center align-middle mb-10">
                                                    <colgroup>
                                                        <col style={{ width: '20%' }} />
                                                        <col style={{ width: '30%' }} />
                                                        <col style={{ width: '20%' }} />
                                                        <col style={{ width: '30%' }} />
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th>Username</th>
                                                            <th>Password</th>

                                                            <th>Phone</th>
                                                            <th>Address</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>

                                                            <td>{user.username}</td>
                                                            <td>{user.password}</td>


                                                            <td>{user.phone || "N/A"}</td>

                                                            <td>{user.address || "N/A"}</td>
                                                        </tr>

                                                    </tbody>
                                                </Table>
                                            </div>
                                        </td>
                                    </tr>
                                )}

                            </>
                        ))}
                    </tbody>
                </Table>
              
                <Offcanvas show={showModal} onHide={handleModalClose} placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{editData ? "Edit User" : "Add User"}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form onSubmit={handleSave}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label ">Username <span style={{ color: 'red' }}>*</span></label>
                                <FormControl
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Enter your username"
                                    className="shadow-sm"
                                />
                            </div>

                            {/* Ô nhập Password */}

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label ">Password <span style={{ color: 'red' }}>*</span></label>
                                <InputGroup>
                                    <FormControl
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="shadow-sm "

                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="border border-transparent outline-none hover:bg-gray-100 shadow-sm"
                                    >
                                        <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} ${showPassword ? '' : ''}`}></i>
                                    </Button>
                                </InputGroup>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cfpassword" className="form-label ">Confirm Password <span style={{ color: 'red' }}>*</span></label>
                                <InputGroup>
                                    <FormControl
                                        type={showCfPassword ? 'text' : 'password'}
                                        id="password"
                                        value={cfpassword}
                                        onChange={(e) => setCfPassword(e.target.value)}
                                        placeholder="Enter your password again"
                                        className="shadow-sm"
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowCfPassword((prev) => !prev)}
                                        className="border border-transparent outline-none hover:bg-gray-100 shadow-sm"
                                    >
                                        <i className={`bi ${showCfPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} ${showCfPassword ? '' : ''}`}></i>
                                    </Button>
                                </InputGroup>
                            </div>


                            <div className="mb-3 mt-3">
                                <label htmlFor="fullName" className="form-label ">Full Name <span style={{ color: 'red' }}>*</span></label>
                                <InputGroup>
                                    <FormControl
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Enter your full name"
                                        className="shadow-sm"
                                    />
                                </InputGroup>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label ">Phone</label>
                                <InputGroup>
                                    <FormControl
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Enter your phone"
                                        className="shadow-sm"
                                    />
                                </InputGroup>

                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label ">Address</label>
                                <InputGroup>
                                    <FormControl
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Enter your address"
                                        className="shadow-sm"
                                    />
                                </InputGroup>
                            </div>
                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}

                                >
                                    <option value="">Select role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                    <option value="Moderator">Moderator</option>
                                </Form.Control>

                            </Form.Group>
                            <div className="flex justify-between gap-8 p-3">
                                <Button variant="secondary" onClick={handleModalClose}>
                                    Close
                                </Button>
                                <Button variant="dark" type="submit">
                                    Save
                                </Button>
                            </div>
                        </Form>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
            {errors && <div className="alert alert-danger mt-4">{errors}</div>}
        </div>
    );
}

export default UserManagement;
