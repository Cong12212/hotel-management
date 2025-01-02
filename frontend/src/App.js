import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import DashBoard from "./page/dashboard/DashBoard";
import AppLayout from "./ui/AppLayout";
import { NavBarItemProvider } from "./context/NavBarItemContext";
import Hotel from "./page/hotel/Hotel";
import Transaction from "./page/transaction/Transaction";
import RoomList from "./page/roomBook/RoomList";
import BookingList from "./page/roomBook/BookingList";
import RoomCheckout from "./page/roomBook/RoomCheckout";
import RoomStatus from "./page/roomBook/RoomStatus";
import RoomType from "./page/roomSetting/RoomType";
import CustomerType from "./page/roomSetting/CustomerType";
import LogIn from "./page/auth/logIn";
import SignUp from "./page/auth/SignUp";
import User from "./page/user/UserManagement";
import RoomBookingForm from "./ui/BookingForm";
import { AuthProvider } from "./hook/useAuth";
import { useAuth } from "./hook/useAuth";
import UserDashboard from "./ui/UserDashboard";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  console.log("Protected Route - Current user:", user);
  if (!user) {
    return <Navigate to="/" />;
  }

  const userRole = user.role || 'user';
  console.log("User role:", userRole);

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={userRole === 'user' ? '/user-dashboard' : '/dashboard'} />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBarItemProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={['admin', 'manager', 'receptionist']}>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/hotels" element={<Hotel />} />
              <Route path="/transactions" element={<Transaction />} />
              <Route path="/rooms" element={<RoomList />} />
              <Route path="/bookings" element={<BookingList />} />
              <Route path="/room-book" element={<RoomBookingForm />} />
              <Route path="/room-checkout" element={<RoomCheckout />} />
              <Route path="/room-status" element={<RoomStatus />} />
              <Route path="/roomtypes" element={<RoomType />} />
              <Route path="/customertypes" element={<CustomerType />} />
              <Route path="/users" element={<User />} />
            </Route>

            {/* User route riêng */}
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </NavBarItemProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;