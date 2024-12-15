import {Outlet} from 'react-router-dom'
import Header from './Header'
import NavBar from './NavBar'
const AppLayout = ()=>{
    return (
        <div className=" flex gap-12 h-screen font-dm-sans bg-custom-gray  ">
            <NavBar />
            <div className="flex-1 flex flex-col ">
                <Header />
                <div className="  overflow-auto h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
export default AppLayout 