import {BrowserRouter, Routes, Route} from 'react-router-dom'
<<<<<<< HEAD
import DashBoard from './page/Dashboard/DashBoard'
=======
import React from 'react'
import DashBoard from './page/dashboard/DashBoard'
>>>>>>> 849a1700f626ef0f4eaee613b4541fef844333d6
import AppLayout from './ui/AppLayout'
import { NavBarItemProvider } from './context/NavBarItemContext'
import Hotel from './page/hotel/Hotel'
import Transaction from './page/transaction/Transaction'
import RoomList from './page/roomBook/RoomList'
import BookingList from './page/roomBook/BookingList'
import RoomCheckout from './page/roomBook/RoomCheckout'
import RoomStatus from './page/roomBook/RoomStatus'
import RoomType from './page/roomSetting/RoomType'
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
