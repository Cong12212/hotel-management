const Header = ()=>{
    return (
        <div>
            <div className="flex justify-between items-center py-2 ">
                <div>
                    <a href="/" className="focus:outline-dashed focus:outline-2 focus:outline-blue-500 cursor-pointer font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-violet-800 to-pink-800 mr-4">
                        Hotel Air
                    </a>
                </div>
                <div>

                </div>
                <div tabIndex="1" className="focus:outline-dashed focus:outline-2 focus:outline-blue-500 items-center flex-1 px-4 bg-white text-base flex text-gray-500 py-2 border-gray-300 border rounded-md">
                    <svg class="svg-stroke search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path><path d="M21 21l-6 -6"></path></svg>
                    <input className="w-full outline-none " type="text" placeholder="Search..." />
                </div>
                <div className="px-4">
                    <svg 
                    className="w-8 h-8"
                    class="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path><path d="M9 17v1a3 3 0 0 0 6 0v-1"></path><path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727"></path><path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727"></path></svg>
                </div>
                <div className="flex items-center gap-2 px-4">
                    <div className="w-8 h-8 rounded-full"
                    >
                        <img className="rounded-full" 
                        src="https://hotelair-react.pixelwibes.in/static/media/profile_av.387360c31abf06d6cc50.png" alt="" />
                    </div>
                    <span className="text-gray-700">
                        Michelle
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Header