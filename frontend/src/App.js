
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import DashBoard from "./page/Dashboard/DashBoard";
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
import { AuthProvider } from "./hook/useAuth";
import { ToastContainer } from "react-toastify";
// import SignUp from './page/auth/SignUp';
// import ForgotPass from './page/auth/ForgotPass';

function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
          <NavBarItemProvider>
            <Routes>
              {/* Trang login không có NavBar */}
              <Route path="/" element={<LogIn />} />
              {/* <Route path="/forgot-password" element={<ForgotPass/>} />
          <Route path="/signup" element={<SignUp />} /> */}

              {/* Các route có AppLayout và NavBar */}
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/hotels" element={<Hotel />} />
                <Route path="/transactions" element={<Transaction />} />
                <Route path="/rooms" element={<RoomList />} />
                <Route path="/bookings" element={<BookingList />} />
                <Route path="/room-checkout" element={<RoomCheckout />} />
                <Route path="/room-status" element={<RoomStatus />} />
                <Route path="/roomtypes" element={<RoomType />} />
                <Route path="/customertypes" element={<CustomerType />} />
              </Route>
            </Routes>
          </NavBarItemProvider>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
