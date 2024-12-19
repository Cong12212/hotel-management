import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import DashBoard from './page/dashboard/DashBoard'
import AppLayout from './ui/AppLayout'
import { NavBarItemProvider } from './context/NavBarItemContext'
import Hotel from './page/hotel/Hotel'
import Transaction from './page/transaction/Transaction'
import RoomList from './page/roomBook/RoomList'
import BookingList from './page/roomBook/BookingList'
import RoomCheckout from './page/roomBook/RoomCheckout'
import RoomStatus from './page/roomBook/RoomStatus'
import RoomType from './page/roomSetting/RoomType'
<<<<<<< HEAD
import CustomerType from './page/roomSetting/CustomerType'
const useViewport = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width };
};
function App() {
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 1024;
  if (isMobile) {
    return (
      <>
      <NavBarItemProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AppLayout />}>
              <Route index element = {<DashBoard/>} />

              <Route path='/hotels' element={<Hotel />} />

              <Route path='/transactions' element={<Transaction />} />

              <Route path='/rooms' element={<RoomList />} />
              <Route path='/bookings' element={<BookingList />} />
              <Route path='/room-checkout' element={<RoomCheckout />} />
              <Route path='/room-status' element={<RoomStatus />} />

              <Route path='/roomtypes' element={<RoomType />} />
              <Route path='/customertypes' element={<CustomerType />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </NavBarItemProvider>
      </>
    )
  }
=======
import RoomList from './page/roomSetting/RoomList'
import Login from './page/userManagement/Login'
import Signup from './page/userManagement/SignUp'
import ForgotPassword from './page/userManagement/ForgotPassword'
function App() {
  /*
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="/" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    );
  }
  */
>>>>>>> a92a09f496044cdef064b36f6242be77aadb50f1
  return (
    <>
      <NavBarItemProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AppLayout />}>
              <Route index element = {<DashBoard/>} />

              <Route path='/hotels' element={<Hotel />} />

              <Route path='/transactions' element={<Transaction />} />

              <Route path='/rooms' element={<RoomList />} />
              <Route path='/bookings' element={<BookingList />} />
              <Route path='/room-checkout' element={<RoomCheckout />} />
              <Route path='/room-status' element={<RoomStatus />} />

              <Route path='/roomtypes' element={<RoomType />} />
              <Route path='/customertypes' element={<CustomerType />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </NavBarItemProvider>

    </>
  )
}


export default App;
