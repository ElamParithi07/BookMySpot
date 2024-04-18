import React, { useState } from 'react'
import { GoSearch } from "react-icons/go";
import { IoReorderThreeOutline } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { Outlet } from 'react-router-dom';

function Sidebar({ isOpen }) {
    return (
        <div className={`fixed flex flex-col h-screen w-1/4 bg-white shadow-md transition-all duration-300 ${isOpen ? 'left-0' : '-left-full'}`}>
            <div className='h-1/4 p-6'>
                <h1 className='text-primary text-2xl font-bold'>BookMySpot</h1>
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
                        <p className='text-base'>Profile</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

function Navbar() {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <Sidebar isOpen={isOpen} />
            <nav className='w-3/4 md:w-full flex flex-col gap-3 md:flex-row justify-between align-middle p-6 border-t shadow-sm'>
                <div className='basis-1/3'>
                    <h1 className='text-primary text-2xl font-bold'>BookMySpot</h1>
                </div>
                <div className='flex basis-4/6 gap-1'>
                    <input type='text' placeholder='Search your favourite spot now..' className='px-3 w-screen md:w-5/6 border-slate-100 border bg-slate-100 rounded-3xl focus:outline-none ' />
                    <button className='bg-primary h-12 w-12 p-3 rounded-full justify-center items-center'><GoSearch className='text-white font-bold text-2xl' /></button>
                </div>
                <div className='hidden w-0 md:flex basis-1/4 justify-end'>
                    <div>
                        <button className='flex w-2/8 p-2 border rounded-xl gap-1' onClick={() => { setOpen(!isOpen) }} >
                            <IoReorderThreeOutline className='text-3xl text-slate-600' />
                            <FaUserCircle className='text-3xl text-slate-600' />
                        </button>
                    </div>
                </div>
            </nav>
            <div>
                <Outlet />
            </div>
            <div className="flex fixed bottom-0 w-screen h-20 bg-white border-t justify-evenly items-center md:hidden">
                <div className='bottomiconbox'>
                    <IoHomeOutline className='text-3xl text-primary' />
                    <p className='text-primary'>Home</p>
                </div>
                <div className='bottomiconbox'>
                    <GoSearch className='text-3xl text-slate-600' />
                    <p>Experiences</p>
                </div>
                <div className='bottomiconbox'>
                    <FaUserCircle className='text-3xl text-slate-600' />
                    <p>Profile</p>
                </div>
            </div>
        </>
    )
}

export default Navbar;
