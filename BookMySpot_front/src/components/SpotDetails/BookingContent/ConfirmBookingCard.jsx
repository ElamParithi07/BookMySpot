import React from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { IoStarSharp } from "react-icons/io5";

function ConfirmBookingCard({data}) {
    const imageUrl =
        'https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/10d2c21f-84c2-46c5-b20b-b51d1c2c971a.jpeg?im_w=1200';

    return (
        <div className='w-80 md:h-96 md:flex md:w-5/6 justify-center'>
            <div className='w-80 md:w-96 bg-white flex flex-col shadow-md rounded-xl border border-slate-200 p-5 justify-between gap-3'>
                <div className='flex gap-2'>
                    <div>
                        <img className='h-24 w-34 rounded-md' src={imageUrl} />
                    </div>
                    <div>
                        <p className='text-base font-medium'>{data.name}</p>
                        <p className='text-sm text-slate-400'>{data.location}</p>
                        <div className='flex items-center'>
                            <IoStarSharp className='text-sm'/>
                            <p className='text-sm'>4.8 (129 reviews)</p>
                        </div>
                    </div>
                </div>
                <div className='h-px w-full bg-slate-300 rounded'></div>
                <div className='flex flex-col gap-4'>
                    <p className='text-xl font-medium'>Price details</p>
                    <div className='flex justify-between'>
                        <p className=''>₹{data.feeperhour} x 1 hours</p>
                        <p>₹{data.feeperhour}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='underline'>service fee</p>
                        <p>₹0</p>
                    </div>
                </div>
                <div className='h-px w-full bg-slate-300  rounded'></div>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <p className='font-medium'>Total(INR)</p>
                        <p className='font-medium'>₹{data.feeperhour}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmBookingCard