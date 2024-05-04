import React, { useState } from 'react'
import { GoSearch } from "react-icons/go";
import { IoReorderThreeOutline } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import NavSearchbar from './NavSearchbar';
import { TbBrandAirbnb } from "react-icons/tb";
import HomeheaderBar from '../Home/HomeheaderBar';
import { useLocation } from 'react-router-dom'
import { useUserstate } from '../../Context/UserContext';

function Sidebar({ isOpen, handlesidebar, isloggedIn }) {
    const navigate = useNavigate()
    const isHomePage = location.pathname === '/';
    const isexplore = location.pathname === '/explore'
    const isProfile = location.pathname === '/profile'
    const isLogin = location.pathname === '/login'
    return (
        <div className={`fixed flex flex-col h-screen w-1/4 bg-white shadow-md transition-all duration-300 ${isOpen ? 'right-0 z-50' : '-right-full z-0'}`}>
            <div className='flex items-start justify-between h-1/4 p-6'>
                <h1 className='text-primary text-2xl font-bold'>BookMySpot</h1>
                <button onClick={handlesidebar}><IoClose className='text-3xl text-slate-600' /></button>
            </div>
            <div className='h-2/4 flex flex-col items-center'>
                <ul className='h-full flex flex-col justify-evenly'>
                    <li className='sidebariconbox'>
                        <IoHomeOutline className={`text-3xl ${isHomePage ? "text-primary": "text-slate-600"}`} />
                        <button onClick={() => {
                            handlesidebar()
                            navigate('/')
                        }} className={`${isHomePage ? "text-primary": "text-slate-600"} text-base`}>Home</button>
                    </li>
                    <li className='sidebariconbox'>
                        <GoSearch className={`text-3xl ${isexplore ? "text-primary": "text-slate-600"}`} />
                        <button onClick={() => {
                            handlesidebar();
                            navigate('/explore')
                        }} className={`text-base ${isexplore ? "text-primary": "text-slate-600"}`}>Explore</button>
                    </li>
                    <li className='sidebariconbox'>
                        <FaUserCircle className={`text-3xl ${isProfile || isLogin ? "text-primary": "text-slate-600"}`} />
                        {isloggedIn ? <button onClick={() => {
                            handlesidebar()
                            navigate('/profile')
                        }} className={`text-base ${isProfile ? "text-primary": "text-slate-600"}`}>Profile</button> :
                            <button onClick={() => {
                                handlesidebar()
                                navigate('/login')
                            }} className={`text-base ${isLogin ? "text-primary": "text-slate-600"}`}>Login</button>}
                    </li>
                </ul>
            </div>
        </div>
    )
}

function Navbar() {
    const { isloggedIn, refreshOtherPages } = useUserstate();
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isexplore = location.pathname === '/explore'
    const isProfile = location.pathname === '/profile'
    const isLogin = location.pathname === '/login'
    const [isOpen, setOpen] = useState(false);
    const handlesidebar = () => {
        setOpen(!isOpen);
    }
    console.log(isloggedIn)
    return (
        <>
            <Sidebar handlesidebar={handlesidebar} isOpen={isOpen} isloggedIn={isloggedIn} />
            <nav className='fixed bg-white w-full md:w-full flex flex-col gap-2 justify-between px-6 py-4 border-t shadow-sm'>
                <div className='flex flex-col justify-between md:flex-row gap-2 md:mt-1'>
                    <div className='basis-1/3 flex items-center gap-row-2'>
                        <TbBrandAirbnb className='text-primary text-xl md:text-3xl' />
                        <button onClick={()=>navigate('/')} className='text-primary text-xl md:text-2xl font-bold'>BookMySpot</button>
                    </div>
                    <NavSearchbar />
                    <div className='hidden w-0 md:flex basis-1/4 justify-between items-center gap-3'>
                        <div className='md:flex items-center justify-center gap-0.5'>
                            <CiGlobe className='text-xl' />
                            <Link to={'/addmyspot'} className='text-base'>Add Mine</Link>
                        </div>
                        <div>
                            <button className='flex w-2/8 p-2 border rounded-3xl gap-1' onClick={() => { handlesidebar() }} >
                                <IoReorderThreeOutline className='text-3xl text-slate-600' />
                                <FaUserCircle className='text-3xl text-slate-600' />
                            </button>
                        </div>
                    </div>
                </div>
                {isHomePage && <div className='flex justify-center'>
                    <HomeheaderBar />
                </div>}
            </nav>
            <div className='pt-40 md:pt-20'>
                <Outlet />
            </div>
            {isHomePage || isexplore || isProfile ? <div className="flex fixed bottom-0 w-screen h-20 bg-white border-t justify-evenly items-center md:hidden">
                <div className='bottomiconbox'>
                    <IoHomeOutline className={`text-2xl ${isHomePage ? "text-primary": "text-slate-600"}`}  />
                    <Link to={'/'} className={`${isHomePage ? "text-primary": "text-slate-600"} text-xs`}>Home</Link>
                </div>
                <div className='bottomiconbox'>
                    <GoSearch className={`text-2xl ${isexplore ? "text-primary": "text-slate-600"}`} />
                    <Link to={'/explore'} className={`text-xs ${isexplore ? "text-primary": "text-slate-600"}`}>Explore</Link>
                </div>
                <div className='bottomiconbox'>
                    <FaUserCircle className={`text-2xl ${isProfile || isLogin ? "text-primary": "text-slate-600"}`} />
                    {isloggedIn ? <Link to={'/profile'} className={`text-xs ${isProfile ? "text-primary": "text-slate-600"}`}>Profile</Link> : 
                    <Link to={'/login'} className={`text-xs ${isLogin ? "text-primary": "text-slate-600"}`}>Login</Link>}
                </div>
            </div> : <></>}
        </>
    )
}

export default Navbar;
