import React, { useState } from 'react'
import { GoSearch } from "react-icons/go";
import { IoReorderThreeOutline } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { Outlet } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import NavSearchbar from './NavSearchbar';
import { TbBrandAirbnb } from "react-icons/tb";

function Sidebar({ isOpen , handlesidebar }) {
    return (
        <div className={`fixed flex flex-col h-screen w-1/4 bg-white shadow-md transition-all duration-300 ${isOpen ? 'right-0 z-50' : '-right-full z-0'}`}>
            <div className='flex items-start justify-between h-1/4 p-6'>
                <h1 className='text-primary text-2xl font-bold'>BookMySpot</h1>
                <button onClick={handlesidebar}><IoClose className='text-3xl text-slate-600'/></button>
            </div>
            <div className='h-2/4 flex flex-col items-center'>
                <ul className='h-full flex flex-col justify-evenly'>
                    <li className='sidebariconbox'>
                        <IoHomeOutline className='text-3xl text-primary' />
                        <p className='text-primary text-base'>Home</p>
                    </li>
                    <li  className='sidebariconbox'>
                        <GoSearch className='text-3xl text-slate-600' />
                        <p className='text-base'>Experiences</p>
                    </li>
                    <li className='sidebariconbox'>
                        <FaUserCircle className='text-3xl text-slate-600' />
                        <p className='text-base'>Login</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

function Navbar() {
    const [isOpen, setOpen] = useState(false);
    const handlesidebar= ()=>{
        setOpen(!isOpen);
    }
    return (
        <>
            <Sidebar handlesidebar={handlesidebar} isOpen={isOpen}/>
            <nav className='fixed bg-white w-full md:w-full flex flex-col gap-3 md:flex-row justify-between align-middle p-6 border-t shadow-sm'>
                <div className='basis-1/3 flex items-center gap-2'>
                <TbBrandAirbnb className='text-primary text-xl md:text-3xl'/>
                    <h1 className='text-primary text-xl md:text-2xl font-bold'>BookMySpot</h1>
                </div>
                <NavSearchbar/>
                <div className='hidden w-0 md:flex basis-1/4 justify-end'>
                    <div>
                        <button className='flex w-2/8 p-2 border rounded-xl gap-1' onClick={() => { handlesidebar()}} >
                            <IoReorderThreeOutline className='text-3xl text-slate-600' />
                            <FaUserCircle className='text-3xl text-slate-600' />
                        </button>
                    </div>
                </div>
            </nav>
            <div className='pt-40 md:pt-24'>
                <Outlet />
            </div>
            <div className="flex fixed bottom-0 w-screen h-20 bg-white border-t justify-evenly items-center md:hidden">
                <div className='bottomiconbox'>
                    <IoHomeOutline className='text-2xl text-primary' />
                    <p className='text-primary text-xs'>Home</p>
                </div>
                <div className='bottomiconbox'>
                    <GoSearch className='text-2xl text-slate-600' />
                    <p className='text-xs'>Experiences</p>
                </div>
                <div className='bottomiconbox'>
                    <FaUserCircle className='text-2xl text-slate-600' />
                    <p className='text-xs'>Login</p>
                </div>
            </div>
        </>
    )
}

export default Navbar;
