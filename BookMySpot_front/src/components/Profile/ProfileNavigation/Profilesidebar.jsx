import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { MdBookmarkBorder } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineHomeModern } from "react-icons/hi2";

function Profilesidebar({handleRoute, currentRoute}) {
    return (
        <div className='w-full h-96 p-10 border rounded-xl '>
            <ul className='flex flex-col h-full justify-evenly items-start ml-5'>
                <li className='flex gap-2 items-center'>
                    <FaRegUser className={`text-xl ${currentRoute==1?"text-primary":"text-black"}`}/>
                    <button className={`${currentRoute==1?"text-primary":"text-black"}`} onClick={()=>handleRoute(1)}>Profile</button>
                </li>
                <li className='flex gap-2 items-center'>
                    <IoBookOutline className={`text-2xl ${currentRoute==2?"text-primary":"text-black"}`}/>
                    <button className={`${currentRoute==2?"text-primary":"text-black"}`} onClick={()=>handleRoute(2)}>My Bookings</button>
                </li>
                <li className='flex gap-2 items-center'>
                    <HiOutlineHomeModern className={`text-2xl ${currentRoute==3?"text-primary":"text-black"}`}/>
                    <button className={`${currentRoute==3?"text-primary":"text-black"}`} onClick={()=>handleRoute(3)}>My Spot</button>
                </li>
                <li className='flex gap-2 items-center'>
                    <MdBookmarkBorder className={`text-2xl ${currentRoute==4?"text-primary":"text-black"}`}/>
                    <button className={`${currentRoute==4?"text-primary":"text-black"}`} onClick={()=>handleRoute(4)}>Saved</button>
                </li>
                <li className='flex gap-2 items-center'>
                    <IoSettingsOutline className={`text-2xl ${currentRoute==5?"text-primary":"text-black"}`}/>
                    <button className={`${currentRoute==5?"text-primary":"text-black"}`} onClick={()=>handleRoute(5)}>Settings</button>
                </li>
            </ul>
        </div>
    )
}

export default Profilesidebar