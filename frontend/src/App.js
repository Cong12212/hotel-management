import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DashBoard from './page/dashboard/DashBoard'
import AppLayout from './ui/AppLayout'
import { NavBarItemProvider } from './context/NavBarItemContext'
import Hotel from './page/hotel/Hotel'
import Transaction from './page/transaction/Transaction'
import BookingList from './page/roomBook/BookingList'
import RoomCheckout from './page/roomBook/RoomCheckout'
import RoomStatus from './page/roomBook/RoomStatus'
import RoomType from './page/roomSetting/RoomType'
import RoomList from './page/roomBook/RoomList'
function App() {

  return (
    <>
      <NavBarItemProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AppLayout />}>
              <Route index element = {<DashBoard/>} />

              <Route path='/hotels' element={<Hotel />} />

              <Route path='/transactions' element={<Transaction />} />

              <Route path='/bookings' element={<BookingList />} />
              <Route path='/room-checkout' element={<RoomCheckout />} />
              <Route path='/room-status' element={<RoomStatus />} />

              <Route path='/roomtypes' element={<RoomType />} />
              <Route path='/rooms' element={<RoomList />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </NavBarItemProvider>

    </>
  )
}

export default App;
