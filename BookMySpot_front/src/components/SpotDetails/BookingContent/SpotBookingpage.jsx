import React from 'react'
import { MdKeyboardArrowLeft } from "react-icons/md";

function SpotBookingpage() {
    return (
        <div className='mx-5 md:mx-48 md:mt-11 flex flex-col gap-7'>
            <div className='flex gap-4 items-center md:mb-10'>
                <MdKeyboardArrowLeft className='text-2xl' />
                <p className='text-xl md:text-3xl font-medium'>Confirm and Book</p>
            </div>
            <div className='flex flex-col md:w-2/5 md:mx-14 gap-10'>
                <div>
                    <p className='text-xl font-medium'>Your Slot</p>
                </div>
                <div className='flex justify-between'>
                    <div>
                    <p>Date</p>
                    <p>18/04/2004</p>
                    </div>
                    <p className='font-medium underline'>Edit</p>
                </div>
                <div className='flex justify-between'>
                    <div>
                    <p>No. of Hours</p>
                    <p>3</p>
                    </div>
                    <p className='font-medium underline'>Edit</p>
                </div>
            </div>
            <div className='h-px bg-slate-300 my-7 rounded'></div>
        </div>
    )
}

export default SpotBookingpage