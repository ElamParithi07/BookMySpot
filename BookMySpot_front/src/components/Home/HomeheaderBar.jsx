import React from 'react'
import { PiPark } from "react-icons/pi";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { BsCupHot } from "react-icons/bs";
import { PiBuildings } from "react-icons/pi";
import { TbUfo } from "react-icons/tb";
import { IoSnowOutline } from "react-icons/io5";
import { GiIsland } from "react-icons/gi";
import { MdOutlineLocalFireDepartment } from "react-icons/md";

function HomeheaderBar() {
    return (
        <div className='bg-white flex py-5 md:w-4/5 items-center justify-center'>
            <ul className='flex flex-wrap gap-4 w-full md:w-11/12 items-center justify-evenly'>
                <li className='sidebariconbox'>
                    <MdOutlineLocalFireDepartment className='homebaricon' />
                    <p className='homebartext'>Trending</p>
                </li>
                <li className='sidebariconbox'>
                    <PiPark className='homebaricon' />
                    <p className='homebartext'>Turfs</p>
                </li>
                <li className='sidebariconbox'>
                    <HiOutlineHomeModern className='homebaricon' />
                    <p className='homebartext'>Swimming Pools</p>
                </li>
                {/* <li className='sidebariconbox'>
                    <BsCupHot className='homebaricon' />
                    <p className='homebartext'>Bed & Breakfast</p>
                </li> */}
                <li className='sidebariconbox'>
                    <PiBuildings className='homebaricon' />
                    <p className='homebartext'>Hair Spa</p>
                </li>
                {/* <li className='sidebariconbox'>
                    <TbUfo className='homebaricon' />
                    <p className='homebartext'>OMG!</p>
                </li> */}
                <li className='sidebariconbox'>
                    <IoSnowOutline className='homebaricon' />
                    <p className='homebartext'>Makeup Artist</p>
                </li>
                <li className='sidebariconbox'>
                    <GiIsland className='homebaricon' />
                    <p className='homebartext'>Party Halls</p>
                </li>
            </ul>
        </div>
    )
}

export default HomeheaderBar