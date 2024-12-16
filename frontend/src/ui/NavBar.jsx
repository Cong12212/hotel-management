import NavBarItem from '../feature/NavBar/NavBarItem'
import React from 'react'
import { useNavigate } from 'react-router-dom';
const NavBar = () => {

    const navigate = useNavigate()

    const [navState, setNavState] = React.useState([
        {
            title: 'Dashboard',
            icon: '/home.svg',
            redirect : '/',
            subItems: [
            ]
        },
        {
            title: 'Hotel',
            icon: '/hotel.svg',
            redirect: '/hotels',
            subItems: [
                // {
                //     id: 1,
                //     title: 'New Category',
                //     ref: '/categories/add'
                // },
                // {
                //     id: 2,
                //     title: 'Category List',
                //     ref: '/categories'
                // },
            ]
        },
        {
            title: 'Transaction',
            icon: '/transaction.svg',
            redirect: '/transactions',
            subItems: [
            ]
        },
        {
            title: 'Room',
            icon: '/room.svg',
            subItems: [
                {
                    id: 1,
                    title: 'Room List',
                    ref: '/rooms'
                },
                {
                    id: 2,
                    title: 'Booking List',
                    ref: '/bookings'
                },
                {
                    id: 3,
                    title: 'Room Checkout',
                    ref: '/room-checkout'
                },
                {
                    id: 4,
                    title: 'Room Status',
                    ref: '/room-status'
                },
            
            ]
        },
        {
            title: 'Settings',
            icon: '/room-setting.svg',
            subItems: [
               
                {
                    id: 1,
                    title: 'Room Type',
                    ref: '/roomtypes'
                },
                {
                    id: 2,
                    title: 'Customer type',
                    ref: '/customertypes'
                }
            ]
        },

    ]);
    
    const [selectedItem,setSelectedItem] = React.useState(null)

    const handleClick = (index) => {
        if(selectedItem === index) return setSelectedItem(null) 
        setSelectedItem(index)
        if('redirect' in navState[index] ){
            navigate(navState[index].redirect ? navState[index].redirect : '/')
        }
    };
    
    return (
        <div className="p-4  w-1/6 min-w-20  h-screen max-h-screen ">
            <div className="flex flex-col justify-center">
                <div className='flex items-center justify-center gap-4'>
                    <div className='w-16 h-16' >
                        <img 
                        className='rounded-full'
                        src="https://hotelair-react.pixelwibes.in/static/media/profile_av.387360c31abf06d6cc50.png" alt="avatar" />
                    </div>
                    <div className='flex flex-col'>
                        <div class="text-lg text-transparent bg-clip-text bg-gradient-to-r from-violet-800 to-pink-800">
                            Anny Glover
                        </div>                        
                        <span className='text-base text-gray-500'> Super Admin</span>
                    </div>
                </div>
                <hr class="border-t-2 border-gray-300 my-4 " />

                <div className='flex flex-col gap-1'>
                    {
                        navState?.map((item,index)=>{
                            return (
                                <div key={index}
                                onClick={()=>handleClick(index)}>
                                    <NavBarItem 
                                    isOpen={selectedItem === index}
                                    title ={navState[index].title} imgSrc = {navState[index].icon}  subItems= {navState[index].subItems}/>  
                                </div>
                            )
                        })
                    }
                </div>
                

            </div>
        </div>  
    );
};

export default NavBar;