import React from 'react'
import { PiPark } from "react-icons/pi";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { BsCupHot } from "react-icons/bs";
import { PiBuildings } from "react-icons/pi";
import { TbUfo } from "react-icons/tb";
import { IoSnowOutline } from "react-icons/io5";
import { GiIsland } from "react-icons/gi";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import PlaceCard from './PlaceCard';

function Home() {
    return (
        <div className='p-0 md:mx-40'>
            <div className='flex py-5  w-full shadow-sm items-center justify-center  '>
                <ul className='flex flex-wrap gap-4 md:w-11/12 items-center justify-evenly lg: w-3/4'>
                    <li className='sidebariconbox'>
                        <PiPark className='homebaricon' />
                        <p className='homebartext'>National Parks</p>
                    </li>
                    <li className='sidebariconbox'>
                        <HiOutlineHomeModern className='homebaricon' />
                        <p className='homebartext'>Lakefront</p>
                    </li>
                    <li className='sidebariconbox'>
                        <BsCupHot className='homebaricon' />
                        <p className='homebartext'>Bed & Breakfast</p>
                    </li>
                    <li className='sidebariconbox'>
                        <PiBuildings className='homebaricon' />
                        <p className='homebartext'>Design</p>
                    </li>
                    <li className='sidebariconbox'>
                        <TbUfo className='homebaricon' />
                        <p className='homebartext'>OMG!</p>
                    </li>
                    <li className='sidebariconbox'>
                        <IoSnowOutline className='homebaricon' />
                        <p className='homebartext'>Arctic</p>
                    </li>
                    <li className='sidebariconbox'>
                        <GiIsland className='homebaricon' />
                        <p className='homebartext'>Island</p>
                    </li>
                    <li className='sidebariconbox'>
                        <MdOutlineLocalFireDepartment className='homebaricon' />
                        <p className='homebartext'>Trending</p>
                    </li>
                </ul>
            </div>
            <div className='w-full flex flex-wrap justify-start py-6 '>
                    <PlaceCard />
                    <PlaceCard />
                    <PlaceCard />
                    <PlaceCard />
                    <PlaceCard />
            </div>
        </div>
    )
}

export default Home